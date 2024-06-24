import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productsRoute from "./routes/products";
import authRoute from './routes/auth';
import userRoute from './routes/user';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const apiUrl = process.env.API_URL ?? '';
const mongoUrl = process.env.MONGO_URL ?? '';

mongoose.connect(mongoUrl)
    .then(() => console.log('DB connection successful'))
    .catch(console.log);

app.use(express.json());
app.use(`${apiUrl}/products/`, productsRoute);
app.use(`${apiUrl}/auth/`, authRoute);
app.use(`${apiUrl}/user/`, userRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
