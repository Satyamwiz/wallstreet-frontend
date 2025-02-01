import React from "react";
import { NavLink } from "react-router-dom";
import image from "../assets/stockwhite.svg";
import { useAuthContext } from "../hooks/useAuthContext";
import {useLogout} from "../hooks/useLogout"

/**
 * This is the sidebar component which only rendered is user is logged in and on desktop devices
 */
const Sidebar = () => {

    const { user } = useAuthContext();
    const {logout} = useLogout();

    const handleLogout = () => {
        logout();
    };

    return (
        <div>
            <div className="d-flex flex-column align-items-center align-items-sm-center px-3 pt-5 text-white min-vh-100 sidebar">
                <div className="d-flex flex-row">
                    <NavLink
                        to="/"
                        className="d-flex align-items-center mb-md-0 me-md-auto text-decoration-none"
                    >
                        <div>
                            <img src={image} alt="" id="logo" />
                            <span className="desktoptitle">Wall Street </span>
                        </div>
                    </NavLink>
                </div>

                <ul
                    className="nav flex-column mb-0 align-items-center align-items-sm-start my-auto"
                    id="menu"
                >
                    {user && (
                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/stocks"
                                className="nav-link align-middle px-0 py-4 bi bi-bar-chart navitems h3"
                            >
                                {" "}
                                Stocks
                            </NavLink>
                        </li>
                    )}

                   

                    {/* <li className="nav-item">
                        <NavLink
                            exact
                            to="/ipo"
                            className="nav-link align-middle px-0 py-4 navitems h3 bi bi-clipboard-data"
                        >
                            {" "}
                            Ipo
                        </NavLink>
                    </li> */}

                    {user && (
                        <li className="nav-item">
                            <NavLink
                                exact
                                to="/portfolio"
                                className="nav-link align-middle px-0 py-4 navitems h3 bi bi-pie-chart"
                            >
                                {" "}
                                Portfolio
                            </NavLink>
                        </li>
                    )}

                    <li className="nav-item">
                        <NavLink
                            exact
                            to="/ranking"
                            className="nav-link align-middle px-0 py-4 navitems h3 bi bi-box-arrow-left bi bi-people"
                        >
                            {" "}
                            Ranking
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink
                            exact
                            to="/rules"
                            className="nav-link align-middle px-0 py-4 navitems h3 bi bi-box-arrow-left bi bi-people"
                        >
                            {" "}
                            Rules
                        </NavLink>
                    </li>
                </ul>

                <btn
                    className="bi bi-bar-chart h5 bi bi-box-arrow-left align-items-center align-items-sm-start my-4 mt-auto logoutbtn py-2 px-3"
                    onClick={handleLogout}
                >
                    {" "}
                    Logout
                </btn>

                <hr />
            </div>
        </div>
    );
};

export default Sidebar;
