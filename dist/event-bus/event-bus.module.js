"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var EventBusModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBusModule = exports.EVENT_BUS_OPTIONS = void 0;
const common_1 = require("@nestjs/common");
const rabbitmq_service_1 = require("./rabbitmq/rabbitmq.service");
const publisher_service_1 = require("./services/publisher.service");
const subscriber_service_1 = require("./services/subscriber.service");
const retry_service_1 = require("./services/retry.service");
const event_bus_service_1 = require("./services/event-bus.service");
exports.EVENT_BUS_OPTIONS = 'EVENT_BUS_OPTIONS';
let EventBusModule = EventBusModule_1 = class EventBusModule {
    static register(options) {
        return {
            module: EventBusModule_1,
            providers: [
                {
                    provide: exports.EVENT_BUS_OPTIONS,
                    useValue: options,
                },
                rabbitmq_service_1.RabbitMQService,
                publisher_service_1.PublisherService,
                subscriber_service_1.SubscriberService,
                retry_service_1.RetryService,
                event_bus_service_1.EventBusService,
            ],
            exports: [event_bus_service_1.EventBusService],
        };
    }
};
exports.EventBusModule = EventBusModule;
exports.EventBusModule = EventBusModule = EventBusModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], EventBusModule);
//# sourceMappingURL=event-bus.module.js.map