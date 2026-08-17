import express from "express";
import {
  bookTour,
  cancelBookings,
  usersBookings,
} from "../controllers/userController.js";
import { authMiddleware } from "../controllers/authController.js";

const router = express.Router();

router.post("/booktour", authMiddleware, bookTour);
router.get("/bookings", authMiddleware, usersBookings);
router.delete("/bookings/cancel", authMiddleware, cancelBookings);
export default router;
