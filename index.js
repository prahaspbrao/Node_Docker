import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.get("/" , (req , res)=>{
    return res.send("<h2>Hello SKanda Rao P Gwdkbekfvb efkvjb efkvjbekvfb</h2>")
})

app.listen(port , ()=>{
    console.log(`Listening to the port : ${port}`);
})