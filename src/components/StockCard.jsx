import React from "react";
import { useState } from "react";

const StockCard = ({ id, name, ticker, current_price, change, color }) => {
  
  return (
    <div className="m-3">
        <div class="card p-1 shadow stockcard">
          <div class="card-body stockcard-body">
            <div class="row">
              <div class="col-6">
                <p class="mb-3 mb-sm-2 stocktitle">{ticker}</p>
                <p class="mb-0 stockname text-nowrap">{name}</p>
              </div>
              <div class="col-6 text-end">
                <p class="mb-3 mb-sm-2 font-weight-bold">{`₹ ${parseFloat(current_price).toFixed(2)}`}</p>
                <p class={`mb-0 ${color} font-weight-bold`}>{`${change}%`}</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default StockCard;
