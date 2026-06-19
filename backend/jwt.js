const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const EXPIRE = process.env.EXPIRE;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables!");
}

if (!EXPIRE) {
    throw new Error("EXPIRE is not defined in environment variables!");
}

const generateToken = payload => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: EXPIRE
    });
};

const jwtAuthMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res
            .status(401)
            .json({ message: "Authorization header missing" });
    }

    const [scheme, token] = authHeader.split(" ");

    // Case-insensitive Bearer check
    if (!scheme || !token || scheme.toLowerCase() !== "bearer") {
        return res
            .status(401)
            .json({ message: "Token missing or invalid format" });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token!"
        });
    }
};

module.exports = { generateToken, jwtAuthMiddleware };
