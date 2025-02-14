// import React from "react";
// import PropTypes from "prop-types";
// OverviewComponent.propTypes = {
//   stock: PropTypes.shape({
//     current_price: PropTypes.number.isRequired,
//     marketCap: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
//     volume: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
//     peRatio: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
//   }).isRequired,
// };
import { useEffect,useState } from "react";
import socketService from "../services/socket.js";

const OverviewComponent = ({ stock }) => {
  const [prices,Setprices]=useState(0);
  

  useEffect(()=>{
    socketService.connect();

    console.log(stock);
  },[stock]);


  return (
    <div className="overview-component">
      {/* Today's Range */}
      <div className="info-card range-card">
        <h3>Today's Range</h3>
        <div className="range-slider">
          <div className="range-values">
            <span>${Number(stock.current_price - 10).toFixed(2)}</span>
            <span>${Number(stock.current_price + 10).toFixed(2)}</span>
          </div>
          <div className="range-bar">
            <div className="range-progress" style={{ width: "60%" }}></div>
            <div className="range-marker" style={{ left: "60%" }}></div>
          </div>
        </div>
      </div>
      {/* All Time Range */}
      <div className="info-card range-card">
        <h3>All Time Range</h3>
        <div className="range-slider">
          <div className="range-values">
            <span>${Number(stock.current_price - 10).toFixed(2)}</span>
            <span>${Number(stock.current_price + 10).toFixed(2)}</span>
          </div>
          <div className="range-bar">
            <div className="range-progress" style={{ width: "60%" }}></div>
            <div className="range-marker" style={{ left: "60%" }}></div>
          </div>
        </div>
      </div>
      {/* Key Statistics */}
      <div className="info-grid">
        <div className="info-card">
          <strong>Market Cap</strong>
          <span>{stock.marketCap || "NA"}</span>
        </div>
        <div className="info-card">
          <strong>Volume</strong>
          <span>{stock.volume || "NA"}</span>
        </div>
        <div className="info-card">
          <strong>P/E Ratio (TTM)</strong>
          <span>{stock.peRatio || "NA"}</span>
        </div>
      </div>
    </div>
  );
};

export default OverviewComponent;
