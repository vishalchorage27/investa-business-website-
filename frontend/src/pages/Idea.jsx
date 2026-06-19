import React from "react";
import { useState } from "react";
import axios from "axios";
import { successAlert, errorAlert } from "../utils/swal";
import images from "../assets/Images";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import industries from "../constants/industries";

const Idea = () => {
    const navigate = useNavigate();
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        fundingRequired: "",
        industry: ""
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
        const token = localStorage.getItem("token");
        try {
            const res = await axios.post(
                `${baseURL}/api/business/idea`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            successAlert(res.data.message);
            navigate("/entrepreneurDash");
        } catch (err) {
            errorAlert(err.response.data.message);
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-[#121212] px-4 py-6">
            <div className="bg-[#1E1E1E] rounded-lg w-full max-w-md md:max-w-lg p-4 sm:p-5 md:p-6 shadow-lg flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                    {/* Back Arrow */}
                    <IoMdArrowRoundBack
                        onClick={() => navigate(-1)}
                        className="bg-[#FF6F61] rounded-full h-9 w-9 sm:h-10 sm:w-10 p-2 cursor-pointer hover:bg-[#e65b50] transition-colors text-white"
                    />

                    {/* Title */}
                    <h2 className="text-lg sm:text-xl md:text-2xl flex items-center gap-2 text-white">
                        <img
                            src={images.logo}
                            alt="Logo"
                            className="w-5 h-5 sm:w-6 sm:h-6 invert"
                        />
                        Startup Idea
                    </h2>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3 sm:gap-4"
                >
                    {/* Business Title */}
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter business title"
                        className="bg-[#121212] border-b-2 border-[#B0B0B0] text-white placeholder-[#B0B0B0] focus:border-[#FF6F61] py-2 px-2 rounded-sm outline-none w-full text-sm sm:text-base"
                    />

                    {/* Description */}
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Describe your startup idea"
                        className="bg-[#121212] border-b-2 border-[#B0B0B0] text-white placeholder-[#B0B0B0] focus:border-[#FF6F61] py-2 px-2 rounded-sm outline-none w-full text-sm sm:text-base resize-none"
                    ></textarea>

                    {/* Funding */}
                    <input
                        type="number"
                        name="fundingRequired"
                        value={formData.fundingRequired}
                        onChange={handleChange}
                        placeholder="Funding required"
                        className="bg-[#121212] border-b-2 border-[#B0B0B0] text-white placeholder-[#B0B0B0] focus:border-[#FF6F61] py-2 px-2 rounded-sm outline-none w-full text-sm sm:text-base"
                    />

                    {/* Industry */}
                    <select
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        className="bg-[#121212] border-b-2 border-[#B0B0B0] text-[#B0B0B0] focus:border-[#FF6F61] py-2 px-2 rounded-sm outline-none w-full text-sm sm:text-base"
                    >
                        {industries.map((industry, index) => (
                            <option key={index} value={industry}>
                                {industry}
                            </option>
                        ))}
                    </select>

                    {/* Button */}
                    <button
                        type="submit"
                        className="bg-[#FF6F61] text-white w-full py-2.5 rounded-sm mt-4 hover:bg-[#e65b50] transition-colors text-sm sm:text-base cursor-pointer"
                    >
                        Submit Idea
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Idea;
