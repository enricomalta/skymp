"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBus = void 0;
class EventBus {
    static events = new Map();
    static on(event, listener) {
        if (!this.events.has(event)) {
            this.events.set(event, new Set());
        }
        this.events
            .get(event)
            .add(listener);
    }
    static once(event, listener) {
        const wrapper = async (...args) => {
            this.off(event, wrapper);
            await listener(...args);
        };
        this.on(event, wrapper);
    }
    static async emit(event, ...args) {
        const listeners = this.events.get(event);
        if (!listeners) {
            return;
        }
        for (const listener of listeners) {
            await listener(...args);
        }
    }
    static off(event, listener) {
        this.events
            .get(event)
            ?.delete(listener);
    }
    static removeAll() {
        this.events.clear();
    }
}
exports.EventBus = EventBus;
