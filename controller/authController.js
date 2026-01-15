import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({
        status: "Fail",
        message: "Username already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      username,
      password: hashedPassword,
    });

    return res.status(201).json({
      status: "Success",
      data: {
        user,
      },
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "Fail",
      message: "Server error",
    });
  }
};


export const login = async (req, res) => {
  try {
    const username = req.body?.username;
    const password = req.body?.password;

    console.log("LOGIN BODY:", req.body);


    if (!username || !password) {
      return res.status(400).json({
        status: "Fail",
        message: "Username and password are required",
      });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        status: "Fail",
        message: "User does not exist",
      });
    }

    const isCorrect = await bcrypt.compare(password, user.password);

    if (!isCorrect) {
      return res.status(400).json({
        status: "Fail",
        message: "Incorrect password",
      });
    }

    return res.status(200).json({
      status: "Success",
      message: "Successfully logged in",
      data: {
        user: {
          _id: user._id,
          username: user.username,
        },
      },
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({
      status: "Fail",
      message: "Internal server error",
    });
  }
};


