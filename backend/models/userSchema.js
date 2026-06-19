const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            maxlength: [20, "Name must be 20 characters or less"]
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            validate: [validator.isEmail, "Please use a valid email address"]
        },
        phone: {
            type: String,
            unique: true,
            trim: true,
            required: [true, "Phone is required"],
            validate: {
                validator: function (v) {
                    return /^[0-9]{10}$/.test(v);
                },
                message: "Please enter valid phone number"
            }
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be 6 characters"],
            select: false
        },
        passwordConfirm: {
            type: String,
            required: [true, "Password confirm is required"],
            validate: {
                validator: function (el) {
                    return el === this.password;
                },
                message: "Passwords confirm do not match!"
            }
        },
        role: {
            type: String,
            required: [true, "Role is required"],
            enum: ["Entrepreneur", "Investor"]
        },

        //Investor-specific fields
        interests: {
            type: String,
            required: function () {
                return this.role === "Investor";
            }
        },
        budgetRange: {
            min: {
                type: Number,
                required: function () {
                    return this.role === "Investor";
                }
            },
            max: {
                type: Number,
                required: function () {
                    return this.role === "Investor";
                }
            }
        }
    },
    {
        timestamps: true
    }
);

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcryptjs.hash(this.password, 10);
    this.passwordConfirm = undefined;
});

userSchema.methods.comparePassword = function (candidatePassword) {
    return bcryptjs.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
