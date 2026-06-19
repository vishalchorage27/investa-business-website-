const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { jwtAuthMiddleware } = require("../jwt");
const {
    getAllUsers,
    signup,
    login,
    updateUser,
    forgotPassword,
    deleteUser
} = require("../controllers/userController");

router.get("/", jwtAuthMiddleware, asyncHandler(getAllUsers));
router.post("/signup", asyncHandler(signup));
router.post("/login", asyncHandler(login));
router.put("/forgot-password", forgotPassword);
router.put("/", jwtAuthMiddleware, asyncHandler(updateUser));
router.delete("/", jwtAuthMiddleware, asyncHandler(deleteUser));

module.exports = router;
