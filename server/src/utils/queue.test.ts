import { ConfirmationQueue } from './queue';

describe('ConfirmationQueue', () => {
    let queue: ConfirmationQueue;

    beforeEach(() => {
        queue = new ConfirmationQueue(5000);
    });

    describe('enqueue', () => {
        it('should add a new item to the queue and return the public_id', () => {
            const public_id = queue.enqueue('test content');
            expect(queue['queue'].length).toBe(1);
            expect(public_id).toBeDefined();
        });
    });

    describe('dequeue', () => {
        it('should remove the first item from the queue and return it', async () => {
            queue.enqueue('test content 1');
            queue.enqueue('test content 2');
            const item = await queue.dequeue();
            expect(queue['queue'].length).toBe(1);
            expect(item.content).toBe('test content 1');
        });
    });

    describe('acknowledge', () => {
        it('should resolve to false if the public_id is not found', async () => {
            const result = await queue.acknowledge('invalid_public_id');
            expect(result).toBe(false);
        });
    });
});
