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
import { useAuthContext } from "./hooks/useAuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Ranking from "./pages/Ranking.jsx";

/**
 * This is the main layout component where all the pages and navbar, sidebar are rendered
 */
function App() {
  const { user } = useAuthContext();
  const [sidebarOpen, setSidebarOpen] = useState(false); // ✅ Track sidebar state

  return (
    <div>
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

      {/* MOBILE NAVBAR - Only for small screens */}
      <div className="d-sm-none">
        <Navbar />
      </div>

      {/* DESKTOP NAVBAR - Only when user is not logged in */}
      <div className="d-none d-sm-block">{!user && <DesktopNavbar />}</div>

      {!user && <Footer />}

      <div className="d-flex flex-row flex-grow-1">
        {/* SIDEBAR - Rendered for logged-in users */}
        {user && (
          <div className="d-none d-sm-block">
            <Sidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
          </div>
        )}

        {/* CONTENT AREA - Adjusts dynamically based on sidebar state */}
        <div
          className="flex-grow-1 px-4"
          style={{
            width: user
              ? sidebarOpen
                ? "calc(100% - 230px)"
                : "100%"
              : "100%",
            marginLeft: user ? (sidebarOpen ? "230px" : "0") : "0",
            transition: "width 0.3s ease-in-out, margin-left 0.3s ease-in-out",
          }}
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
