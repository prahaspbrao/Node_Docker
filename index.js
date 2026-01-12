import express from "express";
import mongoose from "mongoose";
import {MONGO_USER , MONGO_IP , MNGO_PORT} from "./config/config.js"

const app = express();
const port = process.env.PORT || 3000;

await mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MNGO_PORT}/?authSource=admin`)
.then(() => console.log("Successfully connected to database"))
.catch((e) => console.log(e))

app.get("/" , (req , res)=>{
    return res.send("<h2>Hello World !!!</h2>")
})

app.listen(port , ()=>{
    console.log(`Listening to the port : ${port}`);
})