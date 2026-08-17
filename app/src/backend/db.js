import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("db connected!");
  } catch (err) {
    console.log("failed to connect db!", err);
  }
};

export default connectDB;
