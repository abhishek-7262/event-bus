export interface EventPayload<T = any> {
    eventId: string;
    eventType: string;
    source: string;
    timestamp: string;
    retryCount: number;
    data: T;
}
