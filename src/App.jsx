import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Navbar from "./components/Navbar.jsx";
import DesktopNavbar from "./components/DesktopNavbar.jsx";
import Home from "./pages/Home.jsx";
import Footer from "./components/Footer.jsx";
import Rules from "./pages/Rules.jsx";
import Stocks from "./pages/Stocks.jsx";
import StocksDetail from "./pages/StocksDetail.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import Login from "./pages/Login.jsx";
import CommingSoon from "./components/CommingSoon.jsx";
import { useAuthContext } from "./hooks/useAuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Ranking from "./pages/Ranking.jsx";

/**
 * This is the main layout component where all the pages and navbar, sidebar are rendered
 */
function App() {
  const { user } = useAuthContext();

  return (
    <div
      className="d-flex flex-column"
      style={{ width: "100%", minHeight: "100%" }}
    >
      <ToastContainer
        position="top-right"
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

      {/* MOBILE NAVBAR - Only rendered for mobile devices */}
      <div className="d-sm-none">
        <Navbar />
      </div>

      {/* DESKTOP NAVBAR - Rendered only on desktop devices if user is not logged in */}
      <div className="d-none d-sm-block">{!user && <DesktopNavbar />}</div>

      {!user && <Footer />}

      <div className="d-flex flex-row flex-grow-1">
        {/* SIDEBAR - Rendered only on desktop devices if user is logged in */}
        {user && (
          <div className="d-none d-sm-block">
            <Sidebar />
          </div>
        )}

        {/* CONTENT AREA - Takes full width when sidebar is hidden */}
        <div
          className="flex-grow-1 px-4"
          style={{ width: user ? "calc(100% - 210px)" : "100%" }}
        >
          <Routes>
            <Route exact path="/" element={<Home />} />
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
              element={user ? <Portfolio /> : <Navigate to="/login" />}
            />
            <Route
              exact
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route exact path="/rules" element={<Rules />} />
            <Route exact path="/ranking" element={<Ranking />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
