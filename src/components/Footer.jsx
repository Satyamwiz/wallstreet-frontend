import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
    return (
        <div>
            <footer className="fixed-bottom footer">
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
    );
};

export default Footer;
