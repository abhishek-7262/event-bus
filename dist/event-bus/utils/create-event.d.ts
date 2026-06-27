export declare function createEvent(eventType: string, source: string, data: any): {
    eventId: string;
    eventType: string;
    source: string;
    timestamp: string;
    retryCount: number;
    data: any;
};
