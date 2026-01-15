import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import { RedisStore } from "connect-redis";
import { createClient } from "redis";
import cors from "cors";

import config from "./config/config.js";
import postRouter from "./routes/postRoutes.js";
import userRouter from "./routes/userRoutes.js";

const {
  MONGO_USER,
  MONGO_IP,
  MONGO_PORT,
  MONGO_PASSWORD,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET,
} = config;

const app = express();
const port = process.env.PORT || 3000;

/* =========================
   BODY PARSERS
========================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   MONGODB
========================= */
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/blogDB?authSource=admin`;

mongoose.set("bufferCommands", false);

/* =========================
   REDIS CLIENT (CORRECT)
========================= */
const redisClient = createClient({
  url: `redis://${REDIS_URL}:${REDIS_PORT}`,
});

redisClient.on("error", (err) => {
  console.error("❌ Redis error:", err);
});

/* =========================
   SERVER START
========================= */
async function startServer() {
  try {
    // MongoDB
    await mongoose.connect(mongoURL);
    console.log("✅ Connected to MongoDB");
    console.log("📦 DB:", mongoose.connection.name);

    // Redis
    await redisClient.connect();
    console.log("✅ Connected to Redis");

    // Redis session store
    const redisStore = new RedisStore({
      client: redisClient,
      prefix: "sess:",
    });

    app.enable("trust proxy");
    app.use(cors({}));

    // Session middleware (BEFORE ROUTES)
    app.use(
      session({
        name: "sid",
        store: redisStore,
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          secure: false, // true only with HTTPS
          maxAge: 30 * 1000,
        },
      })
    );

 

    app.use("/api/v1", userRouter);
    app.use("/api/v1", postRouter);

    // Test session
    app.get("/test-session", (req, res) => {
      req.session.views = (req.session.views || 0) + 1;
      res.json({
        message: "Session working",
        views: req.session.views,
      });
    });

    // Start server
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (err) {
    console.error("❌ Startup failed:", err);
    process.exit(1);
  }
}

startServer();
