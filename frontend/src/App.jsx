import React from "react";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";
import Footer from "./components/Footer";

const Landing = lazy(()=>import("./pages/Landing"));
const Signup = lazy(()=>import("./pages/Signup"));
const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(()=>import("./pages/ForgotPassword"));
const EntrepreneurDash = lazy(()=>import("./pages/EntrepreneurDash"));
const InvestorDash = lazy(()=>import("./pages/InvestorDash"));
const Idea = lazy(()=>import("./pages/Idea"));
const InterestedInvestors = lazy(()=>import("./pages/InterestedInvestors"));
const NotFound = lazy(()=>import("./pages/NotFound"));

const App = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/forgotPassword"
                        element={<ForgotPassword />}
                    />

                    <Route
                        path="/entrepreneurDash"
                        element={<EntrepreneurDash />}
                    />
                    <Route path="/investorDash" element={<InvestorDash />} />
                    <Route path="/idea" element={<Idea />} />
                    <Route
                        path="/interestedInvestors"
                        element={<InterestedInvestors />}
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </Suspense>
        </BrowserRouter>
    );
};

export default App;
