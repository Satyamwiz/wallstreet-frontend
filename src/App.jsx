import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Navbar from "./components/Navbar.jsx";
import DesktopNavbar from "./components/DesktopNavbar.jsx";
import Home from "./pages/Home.jsx"
import Footer from "./components/Footer.jsx";
import Rules from "./pages/Rules.jsx";
import News from "./pages/News.jsx";
import NewsDetail from "./pages/NewsDetail.jsx";
import Stocks from "./pages/Stocks.jsx";
import StocksDetail from "./pages/StocksDetail.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import CommingSoon from "./components/CommingSoon.jsx"
import {useAuthContext} from "./hooks/useAuthContext"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

/**
 * This is the main layout component where all the pages and navbar, sidebar are rendered
 */
function App() {

    const { user } = useAuthContext()
    const css = user ? "col-md-9 col-xl-10 col-12 content" : "col-12 content";
    
    return (
        <div>

            <ToastContainer position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            />

            {/**
             * MOBILE NAVBAR - Only rendered for mobile devices
             */}
            <div className="d-sm-none">
                <Navbar />
            </div>

            {/** 
             * DESKTOP NAVBAR - Rendered only on desktop devices if user is not logged in
             */ }
            <div className="d-none d-sm-block">
                {!user && <DesktopNavbar />}
            </div>

            {!user && <Footer />}

            <div className={`container-fluid`}>
                <div className="row flex-nowrap">

                    {/** 
                     * SIDEBAR - Rendered only on desktop devices if user is logged in
                     */}
                    {user && (
                        <div className="d-none d-sm-block col-0 col-md-3 col-xl-2 px-0 position-fixed">
                            <Sidebar />
                        </div>
                    )}
                    {user && (
                        <div className="d-none d-sm-block col-0 col-md-3 col-xl-2 px-0"></div>
                    )}

                    {/**
                     * All the pages are rendered here
                     */}
                    <div className={css}>
                        <Routes>
                            <Route exact path="/" element={<Home />} />
                            <Route
                                exact
                                path="/news"
                                element={<News />}
                            />
                            <Route
                                exact
                                path="/newsdetail/:id"
                                element={user ? <NewsDetail /> : <Navigate to="/login" />}
                            />
                            <Route
                                exact
                                path="/stocks"
                                element={user ? <Stocks /> : <Navigate to="/login" />}
                            />
                            <Route
                                exact
                                path="/stocksdetail/:id"
                                element={user ? <StocksDetail /> : <Navigate to="/login" />}
                            />
                            <Route
                                exact
                                path="/portfolio"
                                element={user ? <Portfolio/> : <Navigate to="/login" />}
                            />
                            <Route
                                exact
                                path="/login"
                                element={!user ? <Login /> : <Navigate to="/" />}
                            />
                            <Route
                                exact
                                path="/register"
                                element={!user ? <Register /> : <Navigate to="/" />}
                            />
                            <Route exact path="/rules" element={<Rules />} />
                            <Route exact path="/ranking" element={<CommingSoon />} />
                            <Route exact path="/ipo" element={<CommingSoon />} />
                        </Routes>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default App;
