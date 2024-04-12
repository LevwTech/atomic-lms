import "reflect-metadata";
import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { DataSource } from "typeorm";

import entities from "./entities";
import mainRouter from "./router";
import errorHandler from "./errorHandler";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/", mainRouter);

app.use(errorHandler);

export const PostGresDataSource = new DataSource({
  type: "postgres",
  url: process.env.POSTGRES_URL,
  ssl: true,
  synchronize: true,
  entities: entities,
});

PostGresDataSource.initialize().then(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Error while connecting to mongo", error);
  }
});
