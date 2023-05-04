import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createClient } from 'redis';
const client = createClient();
const port: Number = 3000;
const app: Express = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.get('/', async (req: Request, res: Response) => {
    const order: { productId: number; price: number }[] = [
        {
            productId: 1,
            price: 1000,
        },
        {
            productId: 2,
            price: 2000,
        },
    ];
    await client.publish('order', JSON.stringify(order));
    return res.status(200).json(order);
});
client.on('ready', () => {
    console.log('Client create successfully!');
});
(async () => {
    await client.connect();
})();
app.listen(port, () => {
    console.log('Service listening on port ' + port);
});
