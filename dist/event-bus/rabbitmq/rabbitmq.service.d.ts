export declare class RabbitMQService {
    private connection;
    private channel;
    connect(rabbitUrl: string, exchange: string): Promise<void>;
    getChannel(): any;
}
