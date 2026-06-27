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

// import { Injectable, Inject, OnModuleInit, Logger } from '@nestjs/common';
// import * as amqp from 'amqplib';

// import { EVENT_BUS_OPTIONS, EventBusOptions } from '../event-bus.module';

// @Injectable()
// export class RabbitMQService implements OnModuleInit {
//   private connection!: amqp.Connection;
//   private channel!: amqp.Channel;

//   private readonly logger = new Logger(RabbitMQService.name);

//   constructor(
//     @Inject(EVENT_BUS_OPTIONS)
//     private readonly options: EventBusOptions,
//   ) {}

//   async onModuleInit() {
//     await this.connect();
//   }

//   private async connect() {
//     try {
//       this.connection = await amqp.connect(this.options.uri);
//       this.channel = await this.connection.createChannel();

//       this.logger.log('RabbitMQ connected successfully');

//       // optional: handle reconnect
//       this.connection.on('close', () => {
//         this.logger.error('RabbitMQ connection closed');
//       });
//     } catch (err) {
//       this.logger.error('RabbitMQ connection failed', err);
//       setTimeout(() => this.connect(), 5000); // simple retry
//     }
//   }

//   getChannel(): amqp.Channel {
//     if (!this.channel) {
//       throw new Error('RabbitMQ channel not initialized yet');
//     }
//     return this.channel;
//   }
// }
