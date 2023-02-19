import router from './routes/messageRoutes';
import { ConfirmationQueue } from './utils/queue';
import swaggerUi from 'swagger-ui-express';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());
app.use(router);

export const messageQueue = new ConfirmationQueue(10000);
const yaml = require('js-yaml');
const fs = require('fs');

const swaggerYaml = fs.readFileSync('./src/doc/messageControllerDoc.yaml', 'utf8')
const swaggerSpec = yaml.load(swaggerYaml);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});