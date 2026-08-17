import express from "express";
import {
  authMiddleware,
  getSession,
  login,
  logout,
  register,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getsession", authMiddleware, getSession);
router.post("/logout", logout);
export default router;
