import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { stockService,wishlistService } from "../services/apis.js"; // Your API service
import socketService from "../services/socket.js"; // Your socket service
import "./Wishlist.css"; // Your CSS file
import { toast } from "react-toastify";

const MyWishlist = () => {
  const [wishlist, setWishlist] = useState([]); // Wishlist stocks
  const [livePrices, setLivePrices] = useState({}); // Live price updates
  const [notification, setNotification] = useState(""); // Notification state

  // Fetch Wishlist Data from API
  useEffect(() => {
    wishlistService
      . getWishlist() // Assuming `getWishlist()` fetches user's wishlist stocks
      .then((res) => {
        console.log(res);
        if (res.length === 0) {
          
          setWishlist([]); // No wishlist data
        } else {
          setWishlist(res);
        }
      })
      .catch((err) => {
        toast.error(err);
        setWishlist([]); // Handle error and set empty wishlist
      });
  }, []);

  // Setup socket for live stock price updates
  useEffect(() => {
    
    if (wishlist.length === 0) return;

    socketService.connect();

    wishlist.forEach((stock) => {
      socketService.subscribeToCompany(stock.companyName);
    });

    // Market update handler
    const handleMarketUpdate = (data) => {
      let payload = data;
      console.log("Received live update:", payload);

      if (typeof payload === "string") {
        try {
          payload = JSON.parse(payload);
        } catch (err) {
          console.error("Error parsing payload:", err);
          return;
        }
      }

      setLivePrices((prev) => ({
        ...prev,
        [payload.company]: Number(payload.price).toFixed(2),
      }));
    };

    socketService.onMarketUpdate(handleMarketUpdate);

    return () => {
      socketService.removeListeners();
      socketService.disconnect();
    };
  }, [wishlist]);

  // Handle adding stock to the wishlist
  const handleAddStock = (stock) => {
    stockService
      .addToWishlist(stock) // Assuming `addToWishlist()` adds stock to the wishlist
      .then(() => {
        setWishlist((prev) => [...prev, stock]);
        setNotification("Stock added to wishlist!");
        setTimeout(() => setNotification(""), 3000);
      })
      .catch((err) => {
        console.error("Error adding stock to wishlist", err);
      });
  };

  

  return (
    <div className="wishlist-container">
      <h2 className="wishlist-heading">My Wishlist</h2>
      <p className="wishlist-subheading">Stocks you are tracking</p>

      {/* Notification Message */}
      {notification && <div className="notification">{notification}</div>}

      {/* Loader */}
      {wishlist.length === 0 ? (
        <div >
          
          <div className="add-stock-message">
            <p>No stocks in your wishlist yet.</p>
            <Link to="/stocks" className="btn-add-stock">
              Add Stocks
            </Link>
          </div>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((stock, index) => {
            const currentPrice =
              livePrices[stock.companyName] !== undefined
                ? livePrices[stock.companyName]
                : stock.price;
            const displayPrice =
              currentPrice !== undefined ? `$${currentPrice}` : "N/A";

            return (
              <Link
                to={`/stocksdetail/${stock.companyName}`} // Link to stock detail page
                state={{ stock }} // Pass stock data as state to the details page
                key={stock.companyName} // Unique key for each stock
                className="wishlist-card" // Add a class for styling
              >
                <div className="wishlist-card-header">
                  <div className="wishlist-rank">{index + 1}</div>
                  <div className="wishlist-logo">{stock.symbol}</div>
                </div>
                <div className="wishlist-info">
                  <h3>{stock.companyName}</h3>
                  <div className="wishlist-price">{displayPrice}</div>
                </div>

              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyWishlist;
