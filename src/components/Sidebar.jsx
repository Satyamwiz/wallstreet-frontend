import React from "react";
import { NavLink } from "react-router-dom";
import image from "../assets/stockwhite.svg";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { FaBook, FaNewspaper } from "react-icons/fa";

/**
 * This is the sidebar component which only rendered is user is logged in and on desktop devices
 */
const Sidebar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

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
                to="/stocks"
                className="nav-link align-middle px-0 py-3 bi bi-bar-chart navitems h3 fs-4"
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
                to="/portfolio"
                className="nav-link align-middle px-0 py-3 navitems h3 bi bi-pie-chart fs-4"
              >
                {" "}
                Portfolio
              </NavLink>
            </li>
          )}

          <li className="nav-item">
            <NavLink
              to="/ranking"
              className="nav-link align-middle px-0 py-3 navitems h3 bi bi-box-arrow-left bi bi-people fs-4"
            >
              {" "}
              Ranking
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/rules"
              className="nav-link align-middle px-0 py-3 navitems h3 fs-4"
            >
              <FaBook className="me-2" /> {/* Add icon before text */}
              Rules
            </NavLink>
          </li>

          <li className="nav-item">
            <a
              href="https://www.example.com"
              className="nav-link px-0 py-3 navitems fs-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaNewspaper className="me-2" /> News
            </a>
          </li>
        </ul>

        <button
          className="bi bi-bar-chart h5 bi bi-box-arrow-left align-items-center align-items-sm-start my-4 mt-auto logoutbtn py-2 px-3"
          onClick={handleLogout}
        >
          {" "}
          Logout
        </button>

        <hr />
      </div>
    </div>
  );
};

export default Sidebar;
