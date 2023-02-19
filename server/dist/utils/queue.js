"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmationQueue = void 0;
const uuid_1 = require("uuid");
class ConfirmationQueue {
    constructor(confirmationTimeoutMs) {
        this.queue = [];
        this.confirmationMap = new Map();
        this.confirmationTimeoutMs = confirmationTimeoutMs;
    }
    enqueue(content) {
        const public_id = (0, uuid_1.v4)();
        this.queue.push({ public_id: public_id, content: content, createdAt: String(new Date()) });
        return public_id;
    }
    dequeue() {
        const queuedItem = this.queue.shift();
        if (queuedItem) {
            const { public_id, content, createdAt } = queuedItem;
            const confirmationTimeout = setTimeout(() => {
                this.confirmationMap.delete(public_id);
                this.queue.push(queuedItem);
            }, this.confirmationTimeoutMs);
            this.confirmationMap.set(public_id, confirmationTimeout);
            return Promise.resolve(queuedItem);
        }
        else {
            throw new Error('No elements are available in the queue.');
        }
    }
    confirm(public_id) {
        return new Promise(resolve => {
            const confirmationTimeout = this.confirmationMap.get(public_id);
            if (confirmationTimeout) {
                clearTimeout(confirmationTimeout);
                this.confirmationMap.delete(public_id);
                resolve(true);
            }
            else {
                resolve(false);
            }
        });
    }
}
exports.ConfirmationQueue = ConfirmationQueue;
//# sourceMappingURL=queue.js.map