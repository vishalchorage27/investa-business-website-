import React from "react";
import { useState } from "react";
import { RiMenu3Fill, RiCloseLargeFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import images from "../assets/Images";
import { top, container } from "../utils/framerVariants/Variants";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const menus = [
        { to: "#home", name: "Home" },
        { to: "#about", name: "About" },
        { to: "#features", name: "Features" }
    ];

    const renderMenuItems = (className) =>
        menus.map((item, id) => (
            <a
                key={id}
                href={item.to}
                className={className}
                onClick={() => setMenuOpen(false)}
            >
                {item.name}
            </a>
        ));

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="z-50 fixed top-0 left-0 w-full flex items-center justify-between bg-[#1E1E1E] px-4 sm:px-6 md:px-10 py-3"
        >
            {/* Logo */}
            <motion.div
                variants={top}
                className="flex items-center gap-2 text-[20px] sm:text-[22px] md:text-[24px] text-white"
            >
                <img
                    src={images.logo}
                    alt="Logo"
                    className="w-7 h-7 sm:w-8 sm:h-8 invert"
                />
                <h1>Investa</h1>
            </motion.div>

            {/* Desktop Menu */}
            <motion.div
                variants={top}
                className="hidden md:flex items-center gap-5 lg:gap-6 text-[#B0B0B0]"
            >
                {renderMenuItems(
                    "hover:text-[#FF6F61] text-sm lg:text-[16px]"
                )}

                <Link
                    className="hover:text-[#FF6F61] text-sm lg:text-[16px]"
                    to="/login"
                >
                    Login
                </Link>
            </motion.div>

            {/* Mobile Button */}
            <motion.button
                variants={top}
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden text-[24px] text-[#B0B0B0] hover:text-[#FF6F61]"
            >
                {menuOpen ? <RiCloseLargeFill /> : <RiMenu3Fill />}
            </motion.button>

            {/* Mobile Menu */}
            {menuOpen && (
                <motion.div
                    variants={top}
                    className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-md text-[#B0B0B0] flex flex-col items-center md:hidden py-4 gap-4"
                >
                    {renderMenuItems(
                        "hover:text-[#FF6F61] text-[16px]"
                    )}

                    <Link
                        className="hover:text-[#FF6F61]"
                        to="/login"
                        onClick={() => setMenuOpen(false)}
                    >
                        Login
                    </Link>
                </motion.div>
            )}
        </motion.div>
    );
};

export default Header;