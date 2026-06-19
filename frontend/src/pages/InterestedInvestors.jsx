import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import images from "../assets/Images";
import InvestorCard from "../components/InvestorCard";
import { IoMdArrowRoundBack } from "react-icons/io";

const InterestedInvestors = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const interestedInvestorIds = location.state?.interestedInvestorsIds || [];
    return (
        <section className="min-h-screen bg-[#121212] text-white flex flex-col">
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between bg-[#1E1E1E] px-3 sm:px-4 md:px-6 py-3 shadow-md">
                <IoMdArrowRoundBack
                    onClick={() => navigate(-1)}
                    className="bg-[#FF6F61] rounded-full h-9 w-9 sm:h-10 sm:w-10 p-2 cursor-pointer active:scale-95 hover:bg-[#e65b50] transition"
                />

                <h2 className="flex items-center gap-2 text-sm sm:text-lg md:text-xl font-semibold truncate">
                    <img
                        src={images.logo}
                        alt="Logo"
                        className="w-5 h-5 sm:w-6 sm:h-6 invert"
                    />
                    <span className="truncate">Interested Investors</span>
                </h2>

                {/* spacer for perfect centering */}
                <div className="w-9 sm:w-10" />
            </div>

            {/* Content */}
            <div
                className="
        grid m-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        2xl:grid-cols-5
    "
            >
                {interestedInvestorIds.length > 0 ? (
                    interestedInvestorIds.map(element => (
                        <InvestorCard key={element._id} data={element} />
                    ))
                ) : (
                    <p className="col-span-full text-center text-[#B0B0B0] text-lg sm:text-xl mt-10">
                        No investors have shown interest yet.
                    </p>
                )}
            </div>
        </section>
    );
};

export default InterestedInvestors;
