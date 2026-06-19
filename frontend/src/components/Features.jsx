import React from "react";
import { motion } from "framer-motion";
import { motionDefaults } from "../utils/framerVariants/motionDefaults";
import FeaturesCard from "./FeaturesCard";
import { left, container } from "../utils/framerVariants/Variants";

const Features = () => {
    const items = [
        {
            title: "Empowering Entrepreneurs",
            desc: "Investa allows entrepreneurs to showcase their innovative ideas to a wide network of potential investors. It provides a platform where creative concepts can gain visibility and the support needed to grow."
        },
        {
            title: "Connecting Investors",
            desc: "The platform gives investors the opportunity to discover promising ventures early on. By bridging the gap between ideas and funding, it makes it easier to find the next big opportunity."
        },
        {
            title: "Transparent Ecosystem",
            desc: "Investa fosters a growth-focused community where ideas can evolve into successful businesses. It emphasizes transparency and collaboration, ensuring trust and productive partnerships between entrepreneurs and investors."
        },
        {
            title: "Turning Ideas into Impact",
            desc: "Investa is a dynamic platform that connects innovative entrepreneurs with visionary investors. We provide a space where groundbreaking ideas can be showcased, potential recognized, and opportunities for growth transformed into successful ventures."
        }
    ];

    return (
        <section
            id="features"
            className="text-white px-4 md:px-10 py-6 md:py-12"
        >
            <div className="bg-[#1E1E1E] rounded-lg p-4 md:p-10">
                {/* Title */}
                <motion.h1
                    variants={left}
                    {...motionDefaults}
                    className="text-3xl md:text-5xl font-extrabold mb-5 mt-5"
                >
                    Features
                </motion.h1>

                {/* Grid */}
                <motion.div
                    variants={container}
                    {...motionDefaults}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8"
                >
                    {items.map((e, i) => (
                        <FeaturesCard
                            key={i}
                            number={i + 1}
                            title={e.title}
                            desc={e.desc}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Features;
