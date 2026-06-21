import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { successAlert } from "../utils/swal";

const IdeaCard = ({ data, user, onDelete }) => {
    const navigate = useNavigate();
    const [idea, setIdea] = useState(data);
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const handleDeleteIdea = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await axios.delete(
                `${baseURL}/api/business/${data._id}/idea`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            onDelete(data._id);
        } catch (err) {
            console.error("Error:", err);
        }
    };

    const handleInterest = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await axios.post(
                `${baseURL}/api/business/${data._id}/interest`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setIdea(res.data.data);
            successAlert("Interest added successfully");
        } catch (err) {
            console.error("Error:", err);
        }
    };

    const handleInterestedInvestors = () => {
        navigate("/interestedInvestors", {
            state: {
                interestedInvestorsIds: idea.interestedInvestors
            }
        });
    };

    return (
        <div className="w-full h-full bg-[#1E1E1E] rounded-2xl p-4 sm:p-5 md:p-6 shadow-lg border border-[#2A2A2A] flex flex-col justify-between">
            {/* Top */}
            <div className="flex justify-between items-start gap-2">
                <span className="text-[10px] sm:text-xs bg-[#121212] text-[#FF6F61] px-2 sm:px-3 py-1 rounded-full border border-[#333] whitespace-nowrap">
                    {idea.industry}
                </span>


            </div>

            {/* Title */}
            <h2 className="text-base sm:text-lg md:text-xl font-semibold mt-3 sm:mt-4">
                {idea.title}
            </h2>

            {/* Description */}
            <p className="text-[#B0B0B0] text-xs sm:text-sm mt-2 leading-5 sm:leading-6">
                {idea.description}{" "}
            </p>

            {/* Divider */}
            <div className="border-t border-[#333] my-3 sm:my-4"></div>

            {/* Info */}
            <div className="flex justify-between">
                <div>
                    <p className="text-[10px] sm:text-xs text-[#B0B0B0]">
                        Funding
                    </p>
                    <p className="text-[#FF6F61] font-semibold text-sm sm:text-base mt-1">
                        ₹{idea.fundingRequired}
                    </p>
                </div>

                <div className="text-right">
                    <p className="text-[10px] sm:text-xs text-[#B0B0B0]">
                        Interested
                    </p>
                    <p className="text-[#FF6F61] font-semibold text-sm sm:text-base mt-1">
                        {idea.interestedInvestors.length}
                    </p>
                </div>
            </div>

            {/* Date */}
            <p className="mt-3 sm:mt-4 text-[10px] sm:text-xs text-[#777]">
                {idea?.createdAt
                    ? new Date(idea.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric"
                      })
                    : "N/A"}
            </p>

            {/* Buttons */}
            <div className="mt-4 sm:mt-5 flex flex-col gap-2">
                {user?.role === "Entrepreneur" && (
                    <>
                        <button
                            onClick={handleInterestedInvestors}
                            className="w-full bg-[#FF6F61] hover:bg-[#e65b50] text-white py-2.5 rounded-md text-xs sm:text-sm transition"
                        >
                            View Interested
                        </button>

                        <button
                            onClick={handleDeleteIdea}
                            className="w-full bg-[#121212] border border-red-500 text-red-500 hover:bg-red-500 hover:text-white py-2.5 rounded-md text-xs sm:text-sm transition"
                        >
                            Delete Idea
                        </button>
                    </>
                )}

                {user?.role === "Investor" && (
                    <button
                        onClick={handleInterest}
                        className="w-full bg-[#FF6F61] hover:bg-[#e65a50] text-white py-2.5 rounded-md text-xs sm:text-sm transition"
                    >
                        Show Interest
                    </button>
                )}
            </div>
        </div>
    );
};

export default IdeaCard;
