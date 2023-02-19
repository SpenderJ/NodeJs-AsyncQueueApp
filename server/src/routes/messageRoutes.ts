import express from 'express';
import cors from 'cors';
import { listMessage, createMessage, approveMessage } from '../controllers/messageController';

const router = express.Router();
router.use(cors());

// Message routes
router.get('/message', listMessage);
router.post('/message', createMessage);
router.post('/approve_message', approveMessage)

export default router;