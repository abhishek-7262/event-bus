export declare class RetryService {
    getRetryQueue(queue: string, retry: number): string;
    getDLQ(queue: string): string;
}
