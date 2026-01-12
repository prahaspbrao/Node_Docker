import express from "express";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 3000;

await mongoose.connect("mongodb://prahas:mypassword@172.18.0.2:27017/?authSource=admin")
.then(() => console.log("Successfully connected to database"))
.catch((e) => console.log(e))

app.get("/" , (req , res)=>{
    return res.send("<h2>Hello World !!!</h2>")
})

app.listen(port , ()=>{
    console.log(`Listening to the port : ${port}`);
})