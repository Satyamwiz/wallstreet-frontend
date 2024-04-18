import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import StockCard from "../components/StockCard.jsx";
import { Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { stockService, portfolioService } from "../services/apis";

const Stocks = () => {
    const [stocks, setStocks] = useState(null);
    const [cash, setCash] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            stockService
                .getStocks()
                .then((res) => setStocks(res))
                .catch((err) => console.log(""));
            portfolioService
                .getCash()
                .then((res) => setCash(res.cash))
                .catch((err) => console.log(""));
        }, 1300);
    }, []);

    return (
        <div className="container p-1 p-sm-5">
            {/* Searchbar */}
            <div className="mt-1 mb-4">
                <div className="d-flex flex-row justify-content-between">
                    <div className="form-outline mobilesearchbar">
                        <input
                            type="search"
                            id="form1"
                            className="searchbar ms-0 ms-sm-3 form-control shadow-lg py-2"
                            placeholder="Search stocks by symbol"
                            aria-label="Search"
                            autocomplete="off"
                        />
                    </div>
                    <div className="btnbalance px-3 me-3 text-center p-2 shadow bi bi-wallet d-none d-sm-block ">
                        {" "}
                        {`₹ ${cash}`}
                    </div>
                </div>
            </div>

            {!stocks && (
                <ThreeDots
                    height="55"
                    width="55"
                    color="#5eb5f8"
                    ariaLabel="line-wave"
                    wrapperClass="loader"
                    visible={true}
                    firstLineColor=""
                    middleLineColor=""
                    lastLineColor=""
                />
            )}

            {/* Columns */}
            <div className="row row-cols-1 row-cols-xl-3 row-cols-md-2 g-2 mt-5">
                {stocks && (
                    <>
                        {stocks.map((stock) => {
                            const change = parseFloat(
                                stock.price_change
                            ).toFixed(2);
                            const color =
                                change >= 0 ? "text-success" : "text-danger";
                            return (
                                <Link to={`/stocksdetail/${stock.id}`}>
                                    <div className="col">
                                        <StockCard
                                            key={stock.id}
                                            {...stock}
                                            change={change}
                                            color={color}
                                        />
                                    </div>
                                </Link>
                            );
                        })}
                    </>
                )}
            </div>
            <br />
            <br />
            <br />
        </div>
    );
};

export default Stocks;
