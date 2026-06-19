const userSchema = require("../models/userSchema");
const { generateToken } = require("../jwt");
const bcryptjs = require("bcryptjs");

// Get all users
const getAllUsers = async (req, res) => {
    const response = await userSchema.find();
    if (response.length === 0) {
        return res.status(404).json({ message: "No users found!", response });
    }
    res.status(200).json({ message: "User fetched successfully", response });
};

// Signup
const signup = async (req, res) => {
    if (req.body.role === "Entrepreneur") {
        delete req.body.interests;
        delete req.body.budgetRange;
    }
    const user = await new userSchema(req.body).save();
    res.status(201).json({
        message: "User registered successfully",
        response: user
    });
};

// Login
const login = async (req, res) => {
    const user = await userSchema
        .findOne({ email: req.body.email })
        .select("+password");
    if (!user) return res.status(404).json({ message: "User not found" });
    if (!(await user.comparePassword(req.body.password)))
        return res.status(401).json({ message: "Wrong password" });

    const token = generateToken({
        id: user._id,
        role: user.role,
        name: user.name
    });
    res.status(201).json({
        message: "User logged in successfully",
        response: { id: user._id, role: user.role },
        token
    });
};

// Update
const updateUser = async (req, res) => {
    if (req.body.password) {
        if (req.body.password.length < 6) {
            return res
                .status(400)
                .json({ message: "Password must be 6 characters" });
        }
        if (req.body.password !== req.body.passwordConfirm)
            return res
                .status(400)
                .json({ message: "Confirm password not matched" });
        req.body.password = await bcryptjs.hash(req.body.password, 10);
        req.body.passwordConfirm = undefined;
    }
    const response = await userSchema.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
        runValidators: true
    });
    res.status(201).json({ message: "Data updated", response });
};

//Forgot Password
const forgotPassword = async (req, res) => {
    const { email, password, passwordConfirm } = req.body;

    const user = await userSchema.findOne({ email });

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }


    user.password = password;
user.passwordConfirm = passwordConfirm;

    await user.save();

    res.status(200).json({
        message: "Password reset successfully"
    });
};

// Delete
const deleteUser = async (req, res) => {
    await userSchema.findByIdAndDelete(req.user.id);
    res.status(200).json({ message: "Data deleted" });
};

module.exports = {
    getAllUsers,
    signup,
    login,
    updateUser,
    forgotPassword,
    deleteUser
};
