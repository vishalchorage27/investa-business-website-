const mongoose = require("mongoose");
require("dotenv").config();

const DB_URL = process.env.DB_URL;

const connectDB = async () => {
    try {
        if (!DB_URL) {
            throw new Error("DB_URL is missing in .env file");
        }

        await mongoose.connect(DB_URL);

        console.log("MongoDB connected successfully");

    } catch (error) {
        console.error("Database connection error:", error.message);

        process.exit(1);
    }
};

module.exports = connectDB;