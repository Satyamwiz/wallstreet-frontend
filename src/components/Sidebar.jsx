import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import image from "../assets/stockwhite.svg";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import {
  FaBook,
  FaNewspaper,
  FaBars,
  FaChartBar,
  FaUserTie,
  FaSignOutAlt,
  FaTrophy,
} from "react-icons/fa";

/**
 * Sidebar with hamburger hover effect and improved UI
 */
const Sidebar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const [isOpen, setIsOpen] = useState(false); // Sidebar visibility state

  const handleLogout = () => {
    logout();
    setIsOpen(false); // Close sidebar on logout
  };

  return (
    <>
      {/* Hamburger Icon (Hover to Open) */}
      <div
        style={{
          position: "fixed",
          top: "10px",
          left: "15px",
          zIndex: 1001,
          cursor: "pointer",
          fontSize: "30px",
          color: "white",
        }}
        onMouseEnter={() => setIsOpen(true)}
      >
        <FaBars />
      </div>

      {/* Sidebar (Hidden by Default, Slides in on Hover) */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: isOpen ? "0" : "-250px",
          width: "230px",
          height: "100vh",
          backgroundColor: "#191924",
          transition: "left 0.3s ease-in-out",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          paddingTop: "15px", // Moves everything up
          borderRadius: "5px",
        }}
        onMouseLeave={() => setIsOpen(false)}
      >
        {/* Logo */}
        <NavLink
          to="/"
          style={{
            textDecoration: "none",
            color: "white",
            marginBottom: "40px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src={image}
            alt="logo"
            style={{
              width: "45px",
              height: "45px",
              marginRight: "12px",
            }}
          />
          <span
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              whiteSpace: "nowrap", // Ensures single-line text
            }}
          >
            Wall Street
          </span>
        </NavLink>

        {/* Navigation Links */}
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            width: "100%",
          }}
        >
          {user && (
            <li style={menuItemStyle}>
              <NavLink to="/stocks" style={navLinkStyle}>
                <FaChartBar style={iconStyle} />
                Stocks
              </NavLink>
            </li>
          )}
          {user && (
            <li style={menuItemStyle}>
              <NavLink to="/portfolio" style={navLinkStyle}>
                <FaUserTie style={iconStyle} /> Portfolio
              </NavLink>
            </li>
          )}
          <li style={menuItemStyle}>
            <NavLink to="/ranking" style={navLinkStyle}>
              <FaTrophy style={iconStyle} /> Ranking
            </NavLink>
          </li>
          <li style={menuItemStyle}>
            <NavLink to="/rules" style={navLinkStyle}>
              <FaBook style={iconStyle} /> Rules
            </NavLink>
          </li>
          <li style={menuItemStyle}>
            <a
              href="https://www.example.com"
              target="_blank"
              rel="noopener noreferrer"
              style={navLinkStyle}
            >
              <FaNewspaper style={iconStyle} /> News
            </a>
          </li>
        </ul>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            background: "white",

            padding: "12px",
            color: "black",
            fontSize: "18px",
            cursor: "pointer",
            borderRadius: "20px",
            marginTop: "auto",
            width: "85%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FaSignOutAlt style={{ marginRight: "12px" }} /> Logout
        </button>
      </div>
    </>
  );
};

// Common Style for Links
const navLinkStyle = {
  display: "flex",
  alignItems: "center",
  padding: "14px",
  color: "white",
  textDecoration: "none",
  fontSize: "25px",
  transition: "0.3s",
};

// Common Style for Menu Items
const menuItemStyle = {
  marginBottom: "12px",
};

// Icon Style
const iconStyle = {
  marginRight: "12px",
  fontSize: "22px",
};

export default Sidebar;
