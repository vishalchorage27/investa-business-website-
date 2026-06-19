import React from "react";
import { motion } from "framer-motion";
import images from "../assets/Images";
import { left, right } from "../utils/framerVariants/Variants";
import { useNavigate } from "react-router-dom";

const Hero = () => {
    const navigate = useNavigate();
    return (
        <section
            id="home"
            className="relative h-screen w-screen overflow-hidden"
        >
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center scale-105"
                style={{ backgroundImage: `url(${images.hero})` }}
            ></div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Content */}
            <motion.div
                initial="hidden"
                animate="visible"
                transition={{
                    staggerChildren: 0.4,
                    delayChildren: 0.5
                }}
                className="relative h-full flex items-center justify-center px-5 md:px-12"
            >
                <div className="max-w-5xl text-center">
                    {/* Heading */}
                    <motion.h1
                        variants={left}
                        className="text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-tight"
                    >
                        Where Innovation
                        <span className="block text-[#FF6F61]">
                            Meets Investment
                        </span>
                    </motion.h1>

                    {/* Paragraph */}
                    <motion.p
                        variants={right}
                        className="mt-6 text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto"
                    >
                        <span className="text-white font-semibold">
                            Investa
                        </span>{" "}
                        connects founders and investors on a single platform.
                        Discover ideas, support innovation, and grow together in
                        a smarter way.
                    </motion.p>

                    {/* CTA Button */}
                    <motion.div variants={left} className="mt-8">
                        <button onClick={()=>navigate("/login")} className="bg-[#FF6F61] hover:bg-[#e65a50] transition text-white px-7 py-3 rounded-full font-medium">
                            Get Started
                        </button>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
