import {v4 as uuidv4} from 'uuid';

export class ConfirmationQueue<T> {
    private queue: { public_id: string, content: string, createdAt: string }[] = [];
    private confirmationMap: Map<string, NodeJS.Timeout> = new Map();
    private confirmationTimeoutMs: number;

    constructor(confirmationTimeoutMs: number) {
        this.confirmationTimeoutMs = confirmationTimeoutMs;
    }

    enqueue(content: string): string {
        const public_id = uuidv4();
        this.queue.push({ public_id: public_id, content: content , createdAt: String(new Date())});
        return public_id;
    }

    dequeue(): Promise<object> {
        const queuedItem = this.queue.shift();
        if (queuedItem) {
            const { public_id, content, createdAt } = queuedItem;
            const confirmationTimeout = setTimeout(() => {
                this.confirmationMap.delete(public_id);
                this.queue.push(queuedItem);
            }, this.confirmationTimeoutMs);

            this.confirmationMap.set(public_id, confirmationTimeout);

            return Promise.resolve(queuedItem);
        } else {
            throw new Error('No elements are available in the queue.');
        }
    }

    confirm(public_id: string): Promise<boolean> {
        return new Promise(resolve => {
            const confirmationTimeout = this.confirmationMap.get(public_id);
            if (confirmationTimeout) {
                clearTimeout(confirmationTimeout);
                this.confirmationMap.delete(public_id);
                resolve(true);
            } else {
                resolve(false);
            }
        });
    }
}