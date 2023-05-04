import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
const port: Number = 4000;
const app: Express = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.get('/products', (req: Request, res: Response) => {
    return res.send('Message from product service');
});
app.listen(port, () => {
    console.log('PRODUCT service started');
});
