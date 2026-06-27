import { DynamicModule } from '@nestjs/common';
export interface EventBusOptions {
    uri: string;
}
export declare const EVENT_BUS_OPTIONS = "EVENT_BUS_OPTIONS";
export declare class EventBusModule {
    static register(options: EventBusOptions): DynamicModule;
}
