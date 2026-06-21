import { Module, Global } from '@nestjs/common';
import { RabbitMQService } from 'src/event-bus/rabbitmq/rabbitmq.service';
import { PublisherService } from 'src/event-bus/services/publisher.service';
import { SubscriberService } from 'src/event-bus/services/subscriber.service';
import { RetryService } from 'src/event-bus/services/retry.service';
import { EventBusService } from 'src/event-bus/services/event-bus.service';

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
