import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { RetryService } from './retry.service';
export declare class SubscriberService {
    private rabbit;
    private retry;
    constructor(rabbit: RabbitMQService, retry: RetryService);
    subscribe(queue: string, routingKey: string, exchange: string, handler: (event: any) => Promise<void>): Promise<void>;
    private createQueues;
    private handleRetry;
}
