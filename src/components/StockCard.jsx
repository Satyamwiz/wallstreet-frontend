import React from "react";
import { useState } from "react";

const StockCard = ({ id, name, ticker, current_price, change, color }) => {
  
  return (
    <div className="m-3">
        <div className="card p-1 shadow stockcard">
          <div className="card-body stockcard-body">
            <div className="row">
              <div className="col-6">
                <p className="mb-3 mb-sm-2 stocktitle">{ticker}</p>
                <p className="mb-0 stockname text-nowrap">{name}</p>
              </div>
              <div className="col-6 text-end">
                <p className="mb-3 mb-sm-2 font-weight-bold">{`₹ ${parseFloat(current_price).toFixed(2)}`}</p>
                <p className={`mb-0 ${color} font-weight-bold`}>{`${change}%`}</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default StockCard;
