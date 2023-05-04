import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
const port: Number = 3000;
const app: Express = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.get('/users', (req: Request, res: Response) => {
    return res.send('Message from user service');
});
app.listen(port, () => {
    console.log('USER service started');
});
