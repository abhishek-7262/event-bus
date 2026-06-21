import { Injectable } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { SubscriberService } from './subscriber.service';

@Injectable()
export class EventBusService {
  constructor(
    private publisher: PublisherService,
    private subscriber: SubscriberService,
  ) {}

  publish(exchange: string, routingKey: string, event: any) {
    return this.publisher.publish(exchange, routingKey, event);
  }

  subscribe(queue: string, routingKey: string, exchange: string, handler: any) {
    return this.subscriber.subscribe(queue, routingKey, exchange, handler);
  }
}
