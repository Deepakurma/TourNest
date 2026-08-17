import bcrypt from "bcrypt";
import { User } from "../model/Users.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({
      message: "Registration failed",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "Login successful",
      user,
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const authMiddleware = async (req, res, next) => {
  const cookie = req.headers.cookie;
  if (!cookie) {
    console.log("no cookie!");
    return res.status(401).json({ message: `Authentication failed!` });
  }

  try {
    const token = cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return res.status(401).json({ message: `Authentication failed!` });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Something went wrong!` });
  }
};

export const getSession = async (req, res) => {
  try {
    const user = req.user.id;

    if (!user) {
      res.status(401).json({ message: "Please login to continue!" });
    }

    console.log("session status:", res.status);
    return res.status(200).json({
      message: "Authenticated",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Something went wrong!` });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
    });

    return res.status(200).json({ message: "Logged out!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Something went wrong!`, err: err });
  }
};
