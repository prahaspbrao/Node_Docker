import express from "express";
import mongoose from "mongoose";
import config from "./config/config.js";
import postRouter from "./routes/postRoutes.js";
import userRouter from "./routes/userRoutes.js"

const { MONGO_USER, MONGO_IP, MONGO_PORT, MONGO_PASSWORD } = config;

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/blogDB?authSource=admin`;

mongoose.set("bufferCommands", false);

async function startServer() {
  try {
    await mongoose.connect(mongoURL);
    console.log("✅ Successfully connected to database");
    console.log("📦 Connected DB:", mongoose.connection.name);

    app.get("/", (req, res) => {
      res.send("<h2>Hello World !!!</h2>");
    });

    app.use("/api/v1", postRouter);
    app.use("/api/v1" , userRouter);

    app.listen(port, () => {
      console.log(`🚀 Listening to the port : ${port}`);
    });
  } catch (err) {
    console.error("❌ Mongo connection failed", err);
    process.exit(1);
  }
}

startServer();
