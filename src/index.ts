import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors, { CorsOptions } from 'cors';
import { Knex, knex as initKnex } from 'knex';
import productsRoute from './routes/products';
import { getDBConfig } from './db/db-config';
import authRoute from './routes/auth';
import userRoute from './routes/user';
import cartRoute from './routes/cart';

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;
const apiUrl = process.env.API_URL ?? '';
const corsOptions: CorsOptions = {
  origin: process.env.CORS_WHITELIST ?? '',
};
export const knex: Knex = initKnex(getDBConfig());

app.use(express.json());
app.use(cors(corsOptions));
app.use(`${apiUrl}/products/`, productsRoute);
app.use(`${apiUrl}/auth/`, authRoute);
app.use(`${apiUrl}/user/`, userRoute);
app.use(`${apiUrl}/cart/`, cartRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

process.on('SIGINT', async () => {
  await knex.destroy();
  console.log('pool closed');
  process.exit(0);
});
