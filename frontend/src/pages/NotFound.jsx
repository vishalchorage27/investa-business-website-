import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#121212] flex items-center justify-center px-4">

            <div className="text-center max-w-md">

                {/* Big 404 */}
                <h1 className="text-[80px] sm:text-[100px] font-bold text-[#FF6F61] leading-none">
                    404
                </h1>

                {/* Message */}
                <h2 className="text-xl sm:text-2xl font-semibold text-white mt-2">
                    Page Not Found
                </h2>

                <p className="text-sm sm:text-base text-[#B0B0B0] mt-3">
                    The page you are looking for doesn’t exist or has been moved.
                </p>

                {/* Button */}
                <button
                    onClick={() => navigate("/")}
                    className="mt-6 bg-[#FF6F61] hover:bg-[#e65b50] text-white px-5 py-2 rounded-lg transition active:scale-95"
                >
                    Go Back Home
                </button>

            </div>
        </div>
    );
};

export default NotFound;