import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const testConnection = async () => {
    const url = process.env.MONGODB_URL;
    console.log("Attempting to connect with connection string length:", url ? url.length : "undefined");
    console.log("Connection string ends with (truncated):", url ? url.slice(-20) : "N/A");

    try {
        await mongoose.connect(url);
        console.log("✅ MongoDB Connection Successful!");
        process.exit(0);
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:");
        console.error("Error Name:", error.name);
        console.error("Error Message:", error.message);
        console.error("Error Code:", error.code);
        console.error("Error CodeName:", error.codeName);
        process.exit(1);
    }
}

testConnection();
