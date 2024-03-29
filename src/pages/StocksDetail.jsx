import { React, useState, useEffect } from "react";
import BuyModal from "../components/BuyModal";
import SellModal from "../components/SellModal";
import { useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { stockService, portfolioService } from "../services/apis";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import LineChart from "../components/LineChart";

Chart.register(CategoryScale);

const StocksDetail = () => {
    const { id } = useParams();

    const [stock, setStock] = useState(null);
    const [cash, setCash] = useState(0);
    const [availableShares, setAvailableShares] = useState(0);
    const [chartData, setChartData] = useState(null);

    const [isMarketOpen, setIsMarketOpen] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            stockService
                .getStockDetail(id)
                .then((res) => {
                    setStock(res);
                    setChartData({
                        labels: res.price_history.map((data, index) =>
                            data.datetime.slice(0, 10)
                        ),
                        datasets: [
                            {
                                label: "",
                                data: res.price_history.map(
                                    (data) => data.price
                                ),
                                backgroundColor: [
                                    "rgba(75,192,192,1)",
                                    "#ecf0f1",
                                    "#f0331a",
                                    "#f3ba2f",
                                    "#2a71d0",
                                ],
                                borderColor: "#5eb5f8",
                                borderWidth: 2,
                            },
                        ],
                    });
                })
                .catch((err) => console.log(err));
            portfolioService
                .getCash()
                .then((res) => setCash(res.cash))
                .catch((err) => console.log(err));
            stockService
                .getQuantity(id)
                .then((res) => setAvailableShares(res.available_quantity))
                .catch((err) => console.log(err));
        }, 1300);
    }, []);

    return (
        <div className="container p-3 p-sm-5">
            {!stock && (
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

            {stock && (
                <>
                    <div className="row mt-5 mt-sm-3 ps-2">
                        <div className="d-flex align-items-center justify-content-center">
                            <div className="h3 stockdetailtitle pe-2">
                                {stock.ticker}
                            </div>
                            <div className="h3 stockdetailname">
                                {" "}
                                - {stock.name}
                            </div>
                        </div>
                    </div>

                    {/* Chart */}
                    {chartData && (
                        <div className="row mt-5 w-100">
                            <div
                                className="col"
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <LineChart chartData={chartData} />
                            </div>
                        </div>
                    )}

                    {/* Buy/Sell  */}

                    {isMarketOpen && (
                        <div className="row">
                            <div className="col-6 text-end px-4">
                                <button
                                    className="btn btnbuysell btn-success fs-5 py-1 bold-text"
                                    data-toggle="modal"
                                    data-target={`#modal${id}`}
                                >
                                    Buy
                                </button>
                                <BuyModal
                                    id={stock.id}
                                    ticker={stock.ticker}
                                    name={stock.name}
                                    current_price={stock.current_price}
                                    price_change={parseFloat(
                                        stock.price_change
                                    ).toFixed(2)}
                                    cash={cash}
                                />
                            </div>
                            <div className="col-6 text-start px-4">
                                <button
                                    className="btn btnbuysell btn-danger fs-5 py-1"
                                    data-toggle="modal"
                                    data-target={`#sellmodal${id}`}
                                >
                                    Sell
                                </button>
                                <SellModal
                                    id={stock.id}
                                    ticker={stock.ticker}
                                    name={stock.name}
                                    current_price={stock.current_price}
                                    price_change={parseFloat(
                                        stock.price_change
                                    ).toFixed(2)}
                                    shares={availableShares}
                                />
                            </div>
                        </div>
                    )}

                    {!isMarketOpen && (
                        <div className="text-warning mb-5 fs-5 text-center">
                            [Note : Due to technical difficulties, the market is
                            currently closed. Trading will be resumed soon.]
                        </div>
                    )}

                    {!isMarketOpen && (
                        <div className="row">
                            <div className="col-6 text-end px-4">
                                <button
                                    className="btn btnbuysell btn-success fs-5 py-1 bold-text"
                                    data-toggle="modal"
                                    data-target={`#modal${id}`}
                                    disabled
                                >
                                    Buy
                                </button>
                                <BuyModal
                                    id={stock.id}
                                    ticker={stock.short_name}
                                    name={stock.company_name}
                                    current_price={stock.last_traded_price}
                                    price_change={parseFloat(
                                        stock.price_change
                                    ).toFixed(2)}
                                    cash={cash}
                                />
                            </div>
                            <div className="col-6 text-start px-4">
                                <button
                                    className="btn btnbuysell btn-danger fs-5 py-1"
                                    data-toggle="modal"
                                    data-target={`#sellmodal${id}`}
                                    disabled
                                >
                                    Sell
                                </button>
                                <SellModal
                                    id={stock.id}
                                    ticker={stock.short_name}
                                    name={stock.company_name}
                                    current_price={stock.last_traded_price}
                                    price_change={parseFloat(
                                        stock.price_change
                                    ).toFixed(2)}
                                    shares={availableShares}
                                />
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default StocksDetail;
