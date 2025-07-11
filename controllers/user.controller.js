import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already existed, Please login" });
    }
    const user = new User({
      name,
      email,
      phone,
      password,
      role,
    });
    await user.save();
    return res
      .status(201)
      .json({ message: "user registered successfully", user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "User not existed in database, please register" });
    }

    const comparePassword = bcrypt.compare(password, existingUser.password);

    if (!comparePassword) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    const tokenData = {
      userId: existingUser._id,
    };

    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    const user = {
      _id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "Strict",
      })
      .json({ message: `Login successfully !!Welcome ${user._id}`, user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.id;
    console.log(userId);
    const user = await User.findById(userId);
    return res.status(200).json({
      userData: user,
    });
  } catch (err) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const userlogout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const removeUser = async (req, res) => {
  try {
    const adminId = req.id;
    const { _id } = req.params;

    const personToRemove = await User.findById(_id);
    if (!personToRemove) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(_id);

    return res
      .status(200)
      .json({ message: "User removed from database successfully!!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const adminId = req.id;
    const admin = await User.findById(adminId);

    const allUsers = await User.find({ role: "user" });
    if (allUsers.length == 0) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json({ message: "All users fetched", allUsers });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
