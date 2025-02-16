import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
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

function App() {
  const { user, loading } = useAuthContext();
  // Initialize sidebarOpen: true on desktop (>=768px) and false on mobile.
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };
    // Check initial window size and add resize listener
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Ensure hooks are always called before conditionally returning.
  if (loading) {
    return <div style={{ padding: "20px", textAlign: "center" }}>Loading...</div>;
  }

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

      {!user && <DesktopNavbar />}
      {!user && <Footer />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/stocks"
          element={user ? <Stocks /> : <Navigate to="/login" />}
          onEnter={() => setSidebarOpen(false)}
        />
        <Route
          path="/stocksdetail/:id"
          element={user ? <StocksDetail /> : <Navigate to="/login" />}
          onEnter={() => setSidebarOpen(false)}
        />
        <Route
          path="/portfolio"
          element={user ? <Portfolio /> : <Navigate to="/login" />}
          onEnter={() => setSidebarOpen(false)}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
          onEnter={() => setSidebarOpen(false)}
        />
        <Route path="/rules" element={<Rules />} onEnter={() => setSidebarOpen(false)} />
        <Route path="/ranking" element={<Ranking />} onEnter={() => setSidebarOpen(false)} />
      </Routes>
      <div style={{ display: "flex", flexDirection: "row", flexGrow: 1 }}>
        {user && (
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}
        <div
          style={{
            flexGrow: 1,
            padding: "16px",
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
            <Route path="/" element={<Home />} />
            <Route
              path="/stocks"
             
              element={user ? <Stocks /> : <Navigate to="/login" />}
            />
            <Route
              path="/stocksdetail/:id"
              element={user ? <StocksDetail /> : <Navigate to="/login" />}
            />
            <Route
              path="/portfolio"
              element={user ? <Portfolio /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route path="/rules" element={<Rules />} />
            <Route path="/ranking" element={<Ranking />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
