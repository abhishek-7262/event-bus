import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
export declare class PublisherService {
    private rabbit;
    constructor(rabbit: RabbitMQService);
    publish(exchange: string, routingKey: string, event: any): void;
}
