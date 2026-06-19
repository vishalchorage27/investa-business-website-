import React from "react";
import { motion } from "framer-motion";
import { top } from "../utils/framerVariants/Variants";

const FeaturesCard = ({ number, title, desc }) => {
    return (
        <motion.div
            variants={top}
            className="bg-[#121212] rounded-lg p-4 md:p-6 relative"
        >
            {/* Number badge */}
            <span className="absolute top-3 right-3 bg-[#FF6F61] text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">
                {number}
            </span>

            {/* Title */}
            <h2 className="text-white font-bold text-lg sm:text-xl md:text-2xl mb-2 pr-8">
                {title}
            </h2>

            {/* Description (FULL restored) */}
            <p className="text-sm sm:text-base text-[#B0B0B0] leading-relaxed">
                {desc}
            </p>
        </motion.div>
    );
};

export default FeaturesCard;