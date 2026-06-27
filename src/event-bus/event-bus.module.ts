import { Module, Global } from '@nestjs/common';
//import { RabbitMQService } from 'src/event-bus/rabbitmq/rabbitmq.service';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';
import { PublisherService } from './services/publisher.service';
import { SubscriberService } from './services/subscriber.service';
import { RetryService } from './services/retry.service';
import { EventBusService } from './services/event-bus.service';

@Global()
@Module({
  providers: [
    RabbitMQService,
    PublisherService,
    SubscriberService,
    RetryService,
    EventBusService,
  ],
  exports: [EventBusService],
})
export class EventBusModule {}
