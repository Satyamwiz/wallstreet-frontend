import React, { useState, useEffect } from "react";
import { ArrowUpRight, ArrowDownRight, PieChart, X } from "lucide-react";
import { stockService } from "../services/apis"; // API service for placing sell orders
import { toast } from "react-toastify";
import socketService from "../services/socket.js"; // WebSocket service for live market updates
import "./SellModal.css";

const SellModal = ({ id, name, current_price, price_change, shares, onClose }) => {
  // Initialize sellPrice state with the baseline current_price received as a prop
  const [sellPrice, setSellPrice] = useState(current_price);
  // Quantity of shares user wants to sell
  const [qty, setQty] = useState(0);

  // Calculate the dynamic price change:
  // This determines the percentage change from the initial current_price to the updated sellPrice.
  const dynamicPriceChange = ((sellPrice - current_price) / current_price) * 100;
  // isPositive flag to determine if the price change is upward or downward.
  const isPositive = dynamicPriceChange >= 0;
  // Calculate the total value of the sell order.
  const totalValue = sellPrice * qty;

  // useEffect to handle WebSocket connection and subscription for live market updates
  useEffect(() => {
    // Connect to the WebSocket server
    socketService.connect();
    // Subscribe to market updates for the specific name/company
    socketService.subscribeToCompany(name);

    // Callback to handle incoming market update events.
    // data.price contains the latest market price.
    const handleMarketUpdate = (data) => {
      setSellPrice(Number(data.price));
    };

    // Register the market update handler
    socketService.onMarketUpdate(handleMarketUpdate);

    // Cleanup: Remove listeners and disconnect when component unmounts
    return () => {
      socketService.removeListeners();
      socketService.disconnect();
    };
  }, [name]);

  // Function to handle the sell order submission
  const handleSell = (e) => {
    e.preventDefault();
    const tid = toast.loading("Processing your order...");
    const sellOrderData = { price: sellPrice, quantity: qty };

    stockService
      .sellStock(id, sellOrderData)
      .then(() => {

        toast.update(tid, {
          render: "Sell order placed successfully! 💰",
          type: "success",
          isLoading: false,
          autoClose: 2300,
        });
        onClose();
      })
      .catch((err) => {
        toast.update(tid, {
          render: err.data?.detail || "Failed to place order",
          type: "error",
          isLoading: false,
          autoClose: 2300,
        });
      });
  };

  return (
    <div className="sell-modal-overlay" onClick={onClose}>
      <div className="sell-modal" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <h3 className="modal-title">Sell {name}</h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <div className="price-info">
            {/* Price Box: Displays the updated sellPrice from market updates */}
            <div className="price-box">
              <p className="price-label">Current Price</p>
              <p className="price-value">{`$${Number(sellPrice).toFixed(2)}`}</p>
            </div>
            {/* Price Box: Displays the dynamic 24h price change */}
            <div className="price-box">
              <p className="price-label">24h Change</p>
              <p className={`price-change ${isPositive ? "positive" : "negative"}`}>
                {isPositive ? (
                  <ArrowUpRight size={20} />
                ) : (
                  <ArrowDownRight size={20} />
                )}
                {Math.abs(dynamicPriceChange).toFixed(2)}%
              </p>
            </div>
          </div>

          {/* Order Form: Allows user to set sell price and quantity */}
          <div className="order-form">
            <div className="form-group">
              <label>Sell Price ($)</label>
              <input
                type="number"
                value={sellPrice}
                onChange={(e) => setSellPrice(Number(e.target.value))}
                step="0.01"
              />
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                value={qty}
                onChange={(e) => setQty(parseInt(e.target.value, 10) || 0)}
                min="1"
                step="1"
              />
            </div>
          </div>
        </div>

        {/* Holdings Summary */}
        <div className="modal-summary">
          <div className="summary-row">
            <div className="summary-label">
              <PieChart size={20} />
              <span>Current Holdings</span>
            </div>
            <div className="summary-value">{`${shares} shares`}</div>
          </div>
          <div className="summary-row">
            <div className="summary-label">Total Value</div>
            <div className="summary-value">{`$${Number(totalValue).toFixed(2)}`}</div>
          </div>
        </div>

        {/* Modal Footer / Action Button */}
        <div className="modal-footer">
          <button
            onClick={handleSell}
            disabled={qty > shares || qty <= 0}
            className="action-button"
          >
            {qty > shares ? "Insufficient Shares" : "Place Sell Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellModal;
