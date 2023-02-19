"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const messageController_1 = require("../controllers/messageController");
const router = express_1.default.Router();
router.use((0, cors_1.default)());
// Message routes
router.get('/message', messageController_1.listMessage);
router.post('/message', messageController_1.createMessage);
router.post('/approve_message', messageController_1.approveMessage);
exports.default = router;
//# sourceMappingURL=messageRoutes.js.map