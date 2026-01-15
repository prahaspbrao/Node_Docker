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
    // app.use(
    //   cors({
    //     origin: "http://localhost:5173", // frontend URL
    //     credentials: true, // allow cookies
    //   })
    // );

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
          secure: false, // HTTP
          sameSite: "lax", // ✅ works for same-origin
          maxAge: 1000 * 60 * 60 * 24,
        },
      })
    );

    app.use("/api/v1", userRouter);
    app.use("/api/v1", postRouter);

    app.get("/api/v1/me", (req, res) => {
      if (!req.session.user) {
        return res.status(401).json({ message: "Not logged in" });
      }
      res.json(req.session.user);
    });

    app.post("/api/v1/logout", (req, res) => {
      req.session.destroy(() => {
        res.clearCookie("sid"); // ✅ MUST MATCH session name
        res.json({ message: "Logged out" });
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
