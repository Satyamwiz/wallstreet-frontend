import React, { useState } from "react";
import { ArrowUpRight, ArrowDownRight, PieChart, X } from "lucide-react";
// import { stockService } from "../services/stockService";
import { toast } from "react-toastify";
import "./SellModal.css";

const SellModal = ({
  id,
  ticker,
  name,
  current_price,
  price_change,
  shares,
  onClose,
}) => {
  const [qty, setQty] = useState(0);
  const [sellPrice, setSellPrice] = useState(current_price);
  const isPositive = price_change > 0;
  const totalValue = sellPrice * qty;

  const handleSell = (e) => {
    e.preventDefault();
    const tid = toast.loading("Processing your order...");
    stockService
      .sellStock(id, { price: sellPrice, quantity: qty })
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
        {/* Header */}
        <div className="modal-header">
          <h3 className="modal-title">Sell {ticker}</h3>
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <div className="price-info">
            <div className="price-box">
              <p className="price-label">Current Price</p>
              <p className="price-value">{`$${current_price}`}</p>
            </div>
            <div className="price-box">
              <p className="price-label">24h Change</p>
              <p
                className={`price-change ${
                  isPositive ? "positive" : "negative"
                }`}
              >
                {isPositive ? (
                  <ArrowUpRight size={20} />
                ) : (
                  <ArrowDownRight size={20} />
                )}
                {Math.abs(price_change)}%
              </p>
            </div>
          </div>
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
            <div className="summary-value">{`$${totalValue.toFixed(2)}`}</div>
          </div>
        </div>

        {/* Footer / Action */}
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
