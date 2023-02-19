import { Request, Response } from 'express';
import { messageQueue } from '../index';


function listMessage(req: Request, res: Response) {
    messageQueue.dequeue()
        .then(item => {
            console.log('Message found in queue:', item);
            res.status(200).send(item);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Error listing message');
        });
}

function createMessage(req: Request, res: Response) {
    const { content } = req.body;
    const public_id = messageQueue.enqueue(content)
    console.log('Message created: ', public_id);
    res.status(200).send(public_id);
}

function approveMessage(req: Request, res: Response) {
    const { public_id } = req.body;
    messageQueue.confirm(public_id)
        .then((approvedMessage) => {
            console.log('Approved message:', approvedMessage);
            res.status(200).send(approvedMessage);
        })
        .catch((error) => {
            console.error('Error approving message:', error);
            res.status(500).send('Error approving message');
        });
}

export { listMessage, createMessage, approveMessage };