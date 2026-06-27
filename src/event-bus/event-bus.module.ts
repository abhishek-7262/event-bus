// import { Module, Global, DynamicModule } from '@nestjs/common';
// //import { RabbitMQService } from 'src/event-bus/rabbitmq/rabbitmq.service';
// import { RabbitMQService } from './rabbitmq/rabbitmq.service';
// import { PublisherService } from './services/publisher.service';
// import { SubscriberService } from './services/subscriber.service';
// import { RetryService } from './services/retry.service';
// import { EventBusService } from './services/event-bus.service';

// @Global()
// @Module({
//   providers: [
//     RabbitMQService,
//     PublisherService,
//     SubscriberService,
//     RetryService,
//     EventBusService,
//   ],
//   exports: [EventBusService],
// })
// export class EventBusModule {}

import { Global, Module, DynamicModule } from '@nestjs/common';

import { RabbitMQService } from './rabbitmq/rabbitmq.service';
import { PublisherService } from './services/publisher.service';
import { SubscriberService } from './services/subscriber.service';
import { RetryService } from './services/retry.service';
import { EventBusService } from './services/event-bus.service';

export interface EventBusOptions {
  uri: string;
}

export const EVENT_BUS_OPTIONS = 'EVENT_BUS_OPTIONS';

@Global()
@Module({})
export class EventBusModule {
  static register(options: EventBusOptions): DynamicModule {
    return {
      module: EventBusModule,
      providers: [
        {
          provide: EVENT_BUS_OPTIONS,
          useValue: options,
        },

        RabbitMQService,
        PublisherService,
        SubscriberService,
        RetryService,
        EventBusService,
      ],
      exports: [EventBusService],
    };
  }
}
