import router from './routes/messageRoutes';
import { ConfirmationQueue } from './utils/queue';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());
app.use(router);

export const messageQueue = new ConfirmationQueue(10000);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});