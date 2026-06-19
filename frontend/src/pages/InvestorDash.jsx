import React from "react";
import { useState, useEffect } from "react";
import images from "../assets/Images";
import IdeaCard from "../components/IdeaCard";
import axios from "axios";
import { successAlert, errorAlert } from "../utils/swal";
import { useNavigate } from "react-router-dom";

const InvestorDash = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
const baseURL = import.meta.env.VITE_API_BASE_URL;
 
    const getBusiness = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${baseURL}/api/business/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res?.data?.user?.role !== "Investor")
                return errorAlert("Investor is not logged in");
            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getBusiness();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        successAlert("You have logged out successfully");
        navigate("/");
    };

    return (
        <section className="min-h-screen bg-[#121212] text-white">
            {/* Header */}
            <div className="flex items-center justify-between bg-[#1E1E1E] px-4 sm:px-6 md:px-10 py-3">
                <h2 className="text-sm sm:text-lg md:text-2xl flex items-center gap-2 font-semibold">
                    <img
                        src={images.logo}
                        alt="Logo"
                        className="w-5 h-5 sm:w-6 sm:h-6 invert"
                    />
                    Investor Dashboard
                </h2>

                <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold px-3 sm:px-5 md:px-6 py-2 rounded-full transition"
                >
                    Logout
                </button>
            </div>

            {/* Welcome Section */}
            <div className="text-center px-4 sm:px-6 md:px-10 py-6 sm:py-10">
                <h1 className="text-xl sm:text-2xl md:text-4xl font-bold leading-snug">
                    Welcome, {data?.user?.name || "User"}
                </h1>

                <p className="text-[#B0B0B0] text-xs sm:text-sm mt-2">
                    Explore innovative business ideas and invest in the future
                </p>
            </div>

            {/* Grid Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                {data?.response ? (
                    data.response.map((element, index) => (
                        <IdeaCard key={index} data={element} user={data.user} />
                    ))
                ) : (
                    <p className="text-[#B0B0B0] col-span-full">Loading...</p>
                )}
            </div>
        </section>
    );
};

export default InvestorDash;
