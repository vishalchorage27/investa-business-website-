import React from "react";

const InvestorCard = ({ data }) => {
    return (
        <div className="w-full bg-[#1E1E1E] rounded-2xl p-5 shadow-lg border border-[#2A2A2A]">
            {/* Top */}
            <div className="flex justify-between items-center">
                <span className="bg-[#121212] text-[#FF6F61] px-3 py-1 rounded-full text-xs border border-[#333]">
                    Investor
                </span>
            </div>

            {/* Name */}
            <h2 className="text-xl font-semibold mt-4">
                {data.name}
            </h2>

            {/* Email */}
            <p className="text-[#B0B0B0] text-sm mt-2">
                {data.email}
            </p>

            {/* Phone */}
            <p className="text-[#B0B0B0] text-sm mt-1">
                {data.phone}
            </p>

            <div className="border-t border-[#333] my-4"></div>

            {/* Interest */}
            <div className="flex justify-between">
                <div>
                    <p className="text-xs text-[#B0B0B0]">
                        Industry Interest
                    </p>
                    <p className="text-[#FF6F61] font-semibold mt-1">
                        {data.interests}
                    </p>
                </div>

                <div className="text-right">
                    <p className="text-xs text-[#B0B0B0]">
                        Budget Range
                    </p>
                    <p className="text-[#FF6F61] font-semibold mt-1">
                        ₹{data.budgetRange?.min} - ₹{data.budgetRange?.max}
                    </p>
                </div>
            </div>

            {/* Date */}
            <p className="mt-4 text-xs text-[#777]">
                Joined:{" "}
                {new Date(data.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                })}
            </p>
        </div>
    );
};

export default InvestorCard;