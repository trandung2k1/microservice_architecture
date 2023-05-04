import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createProxyMiddleware } from 'http-proxy-middleware';
const port: Number = 8080;
const app: Express = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
interface IRoutes {
    [key: string]: string;
}
const routes: IRoutes = {
    '/users': 'http://localhost:3000',
    '/products': 'http://localhost:4000',
    '/orders': 'http://localhost:5000',
};
for (const route in routes) {
    const target: string = routes[route];
    app.use(route, createProxyMiddleware({ target }));
}
app.listen(port, () => {
    console.log('API GATEWAY started');
});
