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
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // 🔥 THIS CREATES THE SESSION + COOKIE
    req.session.userId = user._id;
    req.session.username = user.username;

    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        username: user.username,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
};



