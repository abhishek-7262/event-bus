import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService {
  private connection: any;
  private channel: any;

  async connect(rabbitUrl: string, exchange: string) {
    this.connection = await amqp.connect(rabbitUrl);
    this.channel = await this.connection.createChannel();

    await this.channel.assertExchange(exchange, 'topic', {
      durable: true,
    });
  }

  getChannel() {
    return this.channel;
  }
}
