import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const signUp = async (req , res , next)=>{

    const {username , password} = req.body;
    const hashedpassword = await bcrypt.hash(password , 12);

    try {
        const user = await User.create({
            username : username,
            password : hashedpassword
        })
        res.status(201).json({
            status : "Success",
            data : {
                user : user
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status : "Fail"
        })
    }
}