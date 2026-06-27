"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEvent = createEvent;
const uuid_1 = require("uuid");
function createEvent(eventType, source, data) {
    return {
        eventId: (0, uuid_1.v4)(),
        eventType,
        source,
        timestamp: new Date().toISOString(),
        retryCount: 0,
        data,
    };
}
//# sourceMappingURL=create-event.js.map