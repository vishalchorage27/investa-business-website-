require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const connectDB = require("./db");

const userRouter = require("./routes/userRoutes");
const businessIdeaRouter = require("./routes/businessIdeaRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
    cors({
        origin: process.env.CLIENT_URL,

    })
);

app.use(helmet());
app.use(express.json());

// Routes
app.use("/api/users", userRouter);
app.use("/api/business", businessIdeaRouter);

// 404 Route Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

// Start Server
const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
};

startServer();
