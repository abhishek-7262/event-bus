"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriberService = void 0;
const common_1 = require("@nestjs/common");
const rabbitmq_service_1 = require("../rabbitmq/rabbitmq.service");
const retry_service_1 = require("./retry.service");
let SubscriberService = class SubscriberService {
    rabbit;
    retry;
    constructor(rabbit, retry) {
        this.rabbit = rabbit;
        this.retry = retry;
    }
    async subscribe(queue, routingKey, exchange, handler) {
        const channel = this.rabbit.getChannel();
        await this.createQueues(queue, routingKey, exchange);
        channel.consume(queue, async (msg) => {
            const event = JSON.parse(msg.content.toString());
            try {
                await handler(event);
                channel.ack(msg);
            }
            catch (err) {
                await this.handleRetry(queue, routingKey, exchange, event);
                channel.ack(msg);
            }
        });
    }
    async createQueues(queue, routingKey, exchange) {
        const channel = this.rabbit.getChannel();
        await channel.assertQueue(queue, { durable: true });
        await channel.bindQueue(queue, exchange, routingKey);
        await channel.assertQueue(this.retry.getDLQ(queue), {
            durable: true,
        });
        await channel.assertQueue(`${queue}.retry.1`, {
            durable: true,
            deadLetterExchange: exchange,
            deadLetterRoutingKey: routingKey,
            messageTtl: 5000,
        });
        await channel.assertQueue(`${queue}.retry.2`, {
            durable: true,
            deadLetterExchange: exchange,
            deadLetterRoutingKey: routingKey,
            messageTtl: 30000,
        });
        await channel.assertQueue(`${queue}.retry.3`, {
            durable: true,
            deadLetterExchange: exchange,
            deadLetterRoutingKey: routingKey,
            messageTtl: 60000,
        });
    }
    async handleRetry(queue, routingKey, exchange, event) {
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
};
exports.SubscriberService = SubscriberService;
exports.SubscriberService = SubscriberService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [rabbitmq_service_1.RabbitMQService,
        retry_service_1.RetryService])
], SubscriberService);
//# sourceMappingURL=subscriber.service.js.map