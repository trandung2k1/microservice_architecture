import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createClient } from 'redis';
const client = createClient();
const port: Number = 5000;
const app: Express = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
(async () => {
    const subscriber = client.duplicate();
    subscriber.on('error', (err) => console.error(err));
    await subscriber.connect();
    await subscriber.subscribe('order', (message, channel) => {
        console.log('message', message);
        console.log('channel', channel);
    });
})();
app.listen(port, () => {
    console.log('Service listening on port ' + port);
});
