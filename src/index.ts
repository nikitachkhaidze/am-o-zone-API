import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import {productsRoute} from "../routes/products";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const apiUrl = process.env.API_URL ?? '';
const mongoUrl = process.env.MONGO_URL ?? '';

mongoose.connect(mongoUrl)
    .then(() => console.log('DB connection successful'))
    .catch(console.log);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use(`${apiUrl}/products/`, productsRoute);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
