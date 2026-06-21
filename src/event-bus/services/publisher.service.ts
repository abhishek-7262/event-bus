import { Injectable } from '@nestjs/common';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';

@Injectable()
export class PublisherService {
  constructor(private rabbit: RabbitMQService) {}

  publish(exchange: string, routingKey: string, event: any) {
    const channel = this.rabbit.getChannel();

    channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(event)), {
      persistent: true,
    });
  }
}
