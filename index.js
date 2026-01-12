import express from "express";
import mongoose from "mongoose";
import config from "./config/config.js";
import postRouter from "./routes/postRoutes.js"

const { MONGO_USER, MONGO_IP, MONGO_PORT, MONGO_PASSWORD } = config;

const app = express();
const port = process.env.PORT || 3000;

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
  mongoose
    .connect(mongoURL)
    .then(() => console.log("Successfully connected to database"))
    .catch((e) => {
      console.log(e);
      setTimeout(connectWithRetry, 5000);
    });
};

app.get("/", (req, res) => {
  return res.send("<h2>Hello World !!!</h2>");
});

app.use("/api/v1" , postRouter);

app.listen(port, () => {
  console.log(`Listening to the port : ${port}`);
});
