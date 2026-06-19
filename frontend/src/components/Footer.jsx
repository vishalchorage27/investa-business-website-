import React from "react";

const Footer = () => {
    return (
        <footer className="bg-[#1E1E1E] text-[#B0B0B0] px-4 md:px-10 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">

                {/* Left */}
                <p className="text-xs sm:text-sm">
                    © {new Date().getFullYear()}{" "}
                    <span className="text-white font-medium">Investa</span>. All rights reserved.
                </p>

                {/* Right (optional small info) */}
                <p className="text-[10px] sm:text-xs text-[#888]">
                    Built for innovators & investors
                </p>

            </div>
        </footer>
    );
};

export default Footer;