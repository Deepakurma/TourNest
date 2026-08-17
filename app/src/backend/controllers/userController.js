import { Bookings } from "../model/Users.js";

export const bookTour = async (req, res) => {
  try {
    const { tour } = req.body;

    const booking = await Bookings.create({
      user: req.user.id,
      tour,
    });

    res.status(201).json({
      message: "Booking created!",
      booking,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Booking failed",
    });
  }
};

export const usersBookings = async (req, res) => {
  try {
    const bookings = await Bookings.find({ user: req.user.id });
    res.json({ bookings });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Booking failed",
    });
  }
};

export const cancelBookings = async (req, res) => {
  try {
    const { tour } = req.body;
    const booking = await Bookings.findOneAndDelete({
      _id: tour,
      user: req.user.id,
    });
    res.json({ booking });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Booking delection failed",
    });
  }
};
