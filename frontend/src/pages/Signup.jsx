import React from "react";
import images from "../assets/Images";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { successAlert, errorAlert } from "../utils/swal";
import industries from "../constants/industries";

const Signup = () => {
    const navigate = useNavigate();
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        passwordConfirm: "",
        role: "",
        interests: "",
        budgetRange: {
            min: "",
            max: ""
        }
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleBudgetChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            budgetRange: {
                ...prev.budgetRange,
                [name]: value
            }
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${baseURL}/api/users/signup`,
                formData
            );
            successAlert(res.data.message);
            navigate("/login");
        } catch (err) {
            errorAlert(err.response.data.message);
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-[#121212] px-4">
            <div className="bg-[#1E1E1E] rounded-lg w-full max-w-md p-5 shadow-lg flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    {/* Back Arrow */}
                    <IoMdArrowRoundBack
                        onClick={() => navigate(-1)} // Go back
                        className="bg-[#FF6F61] rounded-full h-10 w-10 p-2 cursor-pointer hover:bg-[#e65b50] transition-colors"
                    />

                    {/* Logo + Signup */}
                    <h2 className="text-2xl flex items-center gap-2 text-white">
                        <img
                            src={images.logo}
                            alt="Logo"
                            className="w-6 h-6 invert"
                        />
                        Signup
                    </h2>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
                    <input
                        className="bg-[#121212] border-b-2 border-[#B0B0B0] text-white placeholder-[#B0B0B0] focus:border-[#FF6F61] py-1.5 px-2 rounded-sm outline-none w-full text-sm"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                    />
                    <input
                        className="bg-[#121212] border-b-2 border-[#B0B0B0] text-white placeholder-[#B0B0B0] focus:border-[#FF6F61] py-1.5 px-2 rounded-sm outline-none w-full text-sm"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                    />
                    <input
                        className="bg-[#121212] border-b-2 border-[#B0B0B0] text-white placeholder-[#B0B0B0] focus:border-[#FF6F61] py-1.5 px-2 rounded-sm outline-none w-full text-sm"
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone"
                    />
                    <input
                        className="bg-[#121212] border-b-2 border-[#B0B0B0] text-white placeholder-[#B0B0B0] focus:border-[#FF6F61] py-1.5 px-2 rounded-sm outline-none w-full text-sm"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                    />
                    <input
                        className="bg-[#121212] border-b-2 border-[#B0B0B0] text-white placeholder-[#B0B0B0] focus:border-[#FF6F61] py-1.5 px-2 rounded-sm outline-none w-full text-sm"
                        type="password"
                        name="passwordConfirm"
                        value={formData.passwordConfirm}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                    />

                    {/* Role */}
                    <div>
                        <h3 className="mb-1 text-white text-sm">Role:</h3>
                        <div className="flex gap-4 text-white text-sm">
                            <label className="flex items-center gap-1 cursor-pointer hover:text-[#FF6F61] transition-colors">
                                <input
                                    type="radio"
                                    name="role"
                                    value="Entrepreneur"
                                    onChange={handleChange}
                                    className="accent-[#FF6F61]"
                                />
                                Entrepreneur
                            </label>
                            <label className="flex items-center gap-1 cursor-pointer hover:text-[#FF6F61] transition-colors">
                                <input
                                    type="radio"
                                    name="role"
                                    value="Investor"
                                    onChange={handleChange}
                                    className="accent-[#FF6F61]"
                                />
                                Investor
                            </label>
                        </div>
                    </div>

                    {/* Category & Budget */}
                    {formData.role === "Investor" && (
                        <div className="flex flex-col gap-1.5">
                            <select
                                name="interests"
                                value={formData.interests}
                                onChange={handleChange}
                                className="bg-[#121212] border-b-2 border-[#B0B0B0] text-[#B0B0B0] focus:border-[#FF6F61] py-2 px-2 rounded-sm outline-none w-full text-sm sm:text-base"
                            >
                                {industries.map((interests, index) => (
                                    <option key={index} value={interests}>
                                        {interests}
                                    </option>
                                ))}
                            </select>

                            <input
                                className="bg-[#121212] border-b-2 border-[#B0B0B0] text-white placeholder-[#B0B0B0] focus:border-[#FF6F61] py-1.5 px-2 rounded-sm outline-none w-full text-sm"
                                type="number"
                                name="min"
                                value={formData.budgetRange.min}
                                onChange={handleBudgetChange}
                                placeholder="Enter your minimum budget range"
                            />
                            <input
                                name="max"
                                value={formData.budgetRange.max}
                                onChange={handleBudgetChange}
                                className="bg-[#121212] border-b-2 border-[#B0B0B0] text-white placeholder-[#B0B0B0] focus:border-[#FF6F61] py-1.5 px-2 rounded-sm outline-none w-full text-sm"
                                type="number"
                                placeholder="Enter your maximum budget range"
                            />
                        </div>
                    )}

                    {/* Signup Button */}
                    <button
                        type="submit"
                        className="bg-[#FF6F61] text-white w-full py-2 rounded-sm mt-3 hover:bg-[#e65b50] transition-colors text-sm cursor-pointer"
                    >
                        Signup
                    </button>

                    {/* Navigate to Login */}
                    <small className="mt-4 text-center text-[#B0B0B0] border-t border-[#333] pt-3 text-sm">
                        Already have an account?{" "}
                        <span
                            onClick={() => navigate("/login")}
                            className="text-[#FF6F61] hover:underline cursor-pointer"
                        >
                            Login
                        </span>
                    </small>
                </form>
            </div>
        </section>
    );
};

export default Signup;
