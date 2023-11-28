import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

import entities from './entities';
import mainRouter from './router';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/', mainRouter);

export const PostGresDataSource = new DataSource({
  type: 'postgres',
  url: process.env.POSTGRES_URL,
  ssl: true,
  synchronize: true,
  entities: entities,
});

PostGresDataSource.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  });
});
