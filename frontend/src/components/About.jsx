import React from "react";
import { motion } from "framer-motion";
import { motionDefaults } from "../utils/framerVariants/motionDefaults";
import { top, right, left, container } from "../utils/framerVariants/Variants";
import images from "../assets/Images";

const About = () => {
    return (
        <section id="about" className="text-white px-4 md:px-10 py-6 md:py-12">
            <div className="bg-[#1E1E1E] rounded-lg p-4 md:p-10">
                {/* Title */}
                <motion.h1
                    variants={left}
                    {...motionDefaults}
                    className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-5"
                >
                    About
                </motion.h1>

                <motion.p
                    variants={right}
                    {...motionDefaults}
                    className="text-sm sm:text-base text-[#B0B0B0] mt-2"
                >
                    Empowering Innovation, Connecting Visionaries.
                </motion.p>

                {/* Main Content */}
                <div className="flex flex-col md:flex-row gap-6 md:gap-10 mt-6 items-center md:items-start">
                    {/* Image */}
                    <motion.div
                        variants={left}
                        {...motionDefaults}
                        className="w-full md:w-1/2"
                    >
                        <img
                            src={images.about}
                            alt="about_img"
                            className="rounded-lg w-full object-cover"
                        />
                    </motion.div>

                    {/* Text */}
                    <motion.p
                        variants={right}
                        {...motionDefaults}
                        className="w-full md:w-1/2 text-sm sm:text-base text-[#B0B0B0] leading-relaxed text-justify"
                    >
                        <span className="font-bold text-3xl md:text-4xl text-[#FF6F61]">
                            Investa
                        </span>
                        <br />
                        is a platform designed to bridge the gap between ideas
                        and investors. We empower entrepreneurs to showcase
                        their innovative concepts and give investors the
                        opportunity to discover the next big venture.
                    </motion.p>
                </div>

                {/* Bottom */}
                <motion.div
                    variants={container}
                    {...motionDefaults}
                    className="mt-6 bg-[#121212] text-[#B0B0B0] rounded-lg p-4 md:p-5"
                >
                    <motion.h1
                        variants={top}
                        className="text-2xl md:text-4xl text-white font-bold text-center"
                    >
                        YOU CAN
                    </motion.h1>

                    <motion.ul
                        variants={top}
                        className="mt-3 flex flex-wrap justify-center gap-3 text-sm md:text-base"
                    >
                        <li>invest</li>
                        <span>|</span>
                        <li>grow</li>
                        <span>|</span>
                        <li>fund</li>
                        <span>|</span>
                        <li>succeed</li>
                        <span>|</span>
                        <li>profit</li>
                    </motion.ul>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
