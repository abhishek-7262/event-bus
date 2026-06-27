import { PublisherService } from './publisher.service';
import { SubscriberService } from './subscriber.service';
export declare class EventBusService {
    private publisher;
    private subscriber;
    constructor(publisher: PublisherService, subscriber: SubscriberService);
    publish(exchange: string, routingKey: string, event: any): void;
    subscribe(queue: string, routingKey: string, exchange: string, handler: any): Promise<void>;
}
