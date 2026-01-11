import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const connectDB = async (url) => {
  mongoose.connection.on('connected', () => {
    console.log('MongoDB connected!');
  });
  await mongoose.connect(`${process.env.MONGODB_URL}`);


};

export default connectDB;