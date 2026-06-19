import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Features from "../components/Features";

const Landing = () => {
    return (
        <div className="min-h-screen overflow-hidden">
            <Header />
            <Hero />
            <About />
            <Features />
        </div>
    );
};

export default Landing;
