"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approveMessage = exports.createMessage = exports.listMessage = void 0;
const index_1 = require("../index");
function listMessage(req, res) {
    index_1.messageQueue.dequeue()
        .then(item => {
        console.log('Message found in queue:', item);
        res.status(200).send(item);
    })
        .catch(error => {
        console.error(error);
        res.status(500).send('Error listing message');
    });
}
exports.listMessage = listMessage;
function createMessage(req, res) {
    const { content } = req.body;
    const public_id = index_1.messageQueue.enqueue(content);
    console.log('Message created: ', public_id);
    res.status(200).send(public_id);
}
exports.createMessage = createMessage;
function approveMessage(req, res) {
    const { public_id } = req.body;
    index_1.messageQueue.confirm(public_id)
        .then((approvedMessage) => {
        console.log('Approved message:', approvedMessage);
        res.status(200).send(approvedMessage);
    })
        .catch((error) => {
        console.error('Error approving message:', error);
        res.status(500).send('Error approving message');
    });
}
exports.approveMessage = approveMessage;
//# sourceMappingURL=messageController.js.map