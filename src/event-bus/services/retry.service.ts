import { Injectable } from '@nestjs/common';

@Injectable()
export class RetryService {
  getRetryQueue(queue: string, retry: number) {
    return `${queue}.retry.${retry}`;
  }

  getDLQ(queue: string) {
    return `${queue}.dlq`;
  }
}
