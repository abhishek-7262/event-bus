import { Injectable } from '@nestjs/common';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { RetryService } from './retry.service';

@Injectable()
export class SubscriberService {
  constructor(
    private rabbit: RabbitMQService,
    private retry: RetryService,
  ) {}

  async subscribe(
    queue: string,
    routingKey: string,
    exchange: string,
    handler: (event: any) => Promise<void>,
  ) {
    const channel = this.rabbit.getChannel();

    await this.createQueues(queue, routingKey, exchange);

    channel.consume(queue, async (msg) => {
      const event = JSON.parse(msg.content.toString());

      try {
        await handler(event);
        channel.ack(msg);
      } catch (err) {
        await this.handleRetry(queue, routingKey, exchange, event);
        channel.ack(msg);
      }
    });
  }

  private async createQueues(
    queue: string,
    routingKey: string,
    exchange: string,
  ) {
    const channel = this.rabbit.getChannel();

    await channel.assertQueue(queue, { durable: true });

    await channel.bindQueue(queue, exchange, routingKey);

    // DLQ
    await channel.assertQueue(this.retry.getDLQ(queue), {
      durable: true,
    });

    // Retry 1 (5 sec)
    await channel.assertQueue(`${queue}.retry.1`, {
      durable: true,
      deadLetterExchange: exchange,
      deadLetterRoutingKey: routingKey,
      messageTtl: 5000,
    });

    // Retry 2 (30 sec)
    await channel.assertQueue(`${queue}.retry.2`, {
      durable: true,
      deadLetterExchange: exchange,
      deadLetterRoutingKey: routingKey,
      messageTtl: 30000,
    });

    // Retry 3 (60 sec)
    await channel.assertQueue(`${queue}.retry.3`, {
      durable: true,
      deadLetterExchange: exchange,
      deadLetterRoutingKey: routingKey,
      messageTtl: 60000,
    });
  }

  private async handleRetry(
    queue: string,
    routingKey: string,
    exchange: string,
    event: any,
  ) {
    event.retryCount = event.retryCount || 0;
    event.retryCount += 1;

    const channel = this.rabbit.getChannel();

    if (event.retryCount > 3) {
      const dlq = this.retry.getDLQ(queue);

      channel.sendToQueue(dlq, Buffer.from(JSON.stringify(event)));

      return;
    }

    const retryQueue = this.retry.getRetryQueue(queue, event.retryCount);

    channel.sendToQueue(retryQueue, Buffer.from(JSON.stringify(event)));
  }
}
