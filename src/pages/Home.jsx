import {React, useEffect} from "react";
import Lottie from "lottie-react";
import animationData from "../lottie/114986-ultimate-trading-experience.json";
// import { UseAuthContext } from "../Hooks/UseAuthContext";
import { NavLink } from "react-router-dom";
import Footer from "../components/Footer.jsx";

const Home = () => {
    //   const { user } = UseAuthContext();
    const user = true;

    const css = user ? "homepageLogin" : "homepage";

    return (
        <div className={css}>
            <div>
                <section id="intro">
                    <div className="container-lg">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-md-5 text-center text-md-start order-2 order-md-1 text-light">
                                <h2 className="mb-1">
                                    Interested in learning about the stock
                                    market and improving your investment skills?
                                    Well you are in luck, as we bring you, 'Wall
                                    Street'
                                    <br />
                                </h2>
                                <h4 className="fw-lighter mt-5 text-secondary">
                                    The stock market is a device for
                                    transferring money from the impatient to the
                                    patient
                                </h4>
                                <h4 className="fw-lighter mb-5 text-secondary">
                                    - Warren Buffett
                                </h4>

                                {!user && (
                                    <NavLink
                                        exact
                                        to="/login"
                                        className="text-decoration-none"
                                    >
                                        <btn className=" h5 align-items-center align-items-sm-start mt-5 mt-auto logoutbtn py-2 px-3">
                                            {" "}
                                            Get Started
                                        </btn>
                                    </NavLink>
                                )}

                                {user && (
                                    <NavLink
                                        exact
                                        to="/rules"
                                        className="text-decoration-none"
                                    >
                                        <btn className=" h5 align-items-center align-items-sm-start mt-5 mt-auto logoutbtn py-2 px-3">
                                            {" "}
                                            See Rules
                                        </btn>
                                    </NavLink>
                                )}
                            </div>

                            <div className="col-md-5 text-center order-1 order-md-2 ms-md-5 mb-5 illustration">
                                <Lottie
                                    animationData={animationData}
                                    loop={true}
                                    autoplay={true}
                                    speed={1}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <div className="d-block d-sm-none">
                <br />
                <br />
            </div>

            {user && (
                <div>
                    <footer className="fixed-bottom footerhome">
                        <div className="container text-center d-flex justify-content-center">
                            <p
                                className="mb-0 text-light"
                                style={{ marginRight: "5px" }}
                            >
                                Designed & developed by -
                            </p>
                            <NavLink className="text-decoration-none" to="">
                                <p className="mb-0 text-light">
                                    {" "}
                                    <u> Web Team</u>{" "}
                                </p>
                            </NavLink>
                        </div>
                    </footer>
                </div>
            )}
        </div>
    );
};

export default Home;
