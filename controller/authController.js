import User from "../models/userModel.js";

export const signUp = async (req , res , next)=>{
    try {
        const user = await User.create(req.body)
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