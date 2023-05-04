import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
const port: Number = 5000;
const app: Express = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.get('/orders', (req: Request, res: Response) => {
    return res.send('Message from order service');
});
app.get('/orders/me', (req: Request, res: Response) => {
    return res.send('Message from order - Me service');
});
app.listen(port, () => {
    console.log('ORDER service started');
});
