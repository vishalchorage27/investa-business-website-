import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import images from "../assets/Images";
import IdeaCard from "../components/IdeaCard";
import { successAlert, errorAlert } from "../utils/swal";
import { useNavigate } from "react-router-dom";

const EntrepreneurDash = () => {
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
            if (res?.data?.user?.role !== "Entrepreneur")
                return errorAlert("Entrepreneur is not logged in");
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

    const handleDeleteIdea = id => {
        setData(prev => ({
            ...prev,
            response: prev.response.filter(element => element._id !== id)
        }));
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
                    Entrepreneur Dashboard
                </h2>

                <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold px-3 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-full transition"
                >
                    Logout
                </button>
            </div>

            {/* Welcome Section */}
            <div className="flex flex-col items-center gap-4 px-4 sm:px-6 md:px-10 py-6 sm:py-10 text-center">
                <h1 className="text-xl sm:text-2xl md:text-4xl font-bold leading-snug">
                    Welcome, {data?.user?.name || "User"}
                </h1>

                <button
                    onClick={() => navigate("/idea")}
                    className="bg-[#FF6F61] hover:bg-[#e65a50] text-white text-xs sm:text-sm font-semibold px-5 sm:px-7 py-2.5 rounded-full transition"
                >
                    Submit New Idea
                </button>
            </div>

            {/* Ideas Section */}
            <div className="px-4 sm:px-6 md:px-10 pb-10">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-5">
                    My Ideas
                </h2>

                {/* GRID FIXED */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                    {data?.response ? (
                        data.response
                            .filter(
                                element =>
                                    element.entrepreneurId === data.user?.id
                            )
                            .map(element => (
                                <IdeaCard
                                    key={element._id}
                                    data={element}
                                    user={data.user}
                                    onDelete={handleDeleteIdea}
                                />
                            ))
                    ) : (
                        <p className="text-[#B0B0B0] col-span-full">
                            Loading...
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default EntrepreneurDash;
