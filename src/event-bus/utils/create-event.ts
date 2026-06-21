import { v4 as uuid } from 'uuid';

export function createEvent(eventType: string, source: string, data: any) {
  return {
    eventId: uuid(),
    eventType,
    source,
    timestamp: new Date().toISOString(),
    retryCount: 0,
    data,
  };
}
