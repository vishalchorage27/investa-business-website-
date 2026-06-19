import React from "react";
import images from "../assets/Images";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { successAlert, errorAlert } from "../utils/swal";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        passwordConfirm: ""
    });
    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.put(
                `${baseURL}/api/users/forgot-password`,
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
                <div className="flex justify-between items-center mb-4">
                    {/* Back Arrow */}
                    <IoMdArrowRoundBack
                        onClick={() => navigate(-1)}
                        className="bg-[#FF6F61] rounded-full h-10 w-10 p-2 cursor-pointer hover:bg-[#e65b50] transition-colors"
                    />

                    {/* Logo + Login */}
                    <h2 className="text-2xl flex items-center gap-2 text-white">
                        <img
                            src={images.logo}
                            alt="Logo"
                            className="w-6 h-6 invert"
                        />
                        Reset Password
                    </h2>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
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
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your new password"
                    />
                    <input
                        className="bg-[#121212] border-b-2 border-[#B0B0B0] text-white placeholder-[#B0B0B0] focus:border-[#FF6F61] py-1.5 px-2 rounded-sm outline-none w-full text-sm"
                        type="password"
                        name="passwordConfirm"
                        value={formData.passwordConfirm}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                    />

                    <button className="bg-[#FF6F61] text-white w-full py-2 rounded-sm mt-4 hover:bg-[#e65b50] transition-colors text-sm cursor-pointer">
                        Login
                    </button>
                </form>
            </div>
        </section>
    );
};

export default ForgotPassword;
