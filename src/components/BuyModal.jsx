import React from "react";
import { useState } from "react";
import { stockService } from "../services/apis";
import { toast } from "react-toastify";

const BuyModal = ({ id, ticker, name, cash, current_price, price_change }) => {
    const [qty, setQty] = useState(0);
    const [bidPrice, setbidPrice] = useState(0);
    const sign = price_change > 0 ? "+" : "";
    const color = price_change >= 0 ? "text-success" : "text-danger";

    const handleBuy = (e) => {
        e.preventDefault();
        const tid = toast.loading("Please wait...");
        const buyOrderData = {
            price: bidPrice,
            quantity: qty,
        };
        stockService
            .buyStock(id, buyOrderData)
            .then((res) => {
                toast.update(tid, {
                    render: "Buy order placed successfully !",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                });
            })
            .catch((err) => {
                toast.update(tid, {
                    render: err.data.detail,
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });
            });
    };

    return (
        <div>
            <div
                className="modal fade"
                id={`modal${id}`}
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog align-item-center" role="document">
                    <div className="buyModal modal-content p-0">
                        <div className="modal-header mt-3 border-0">
                            <h3
                                className="modaltitle text-center"
                                id="exampleModalLabel"
                            >
                                {ticker} - {name}
                            </h3>

                            <div
                                type="button"
                                className="modalclosebtn close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span
                                    className="closeModal fw-bold text-light"
                                    aria-hidden="true"
                                >
                                    <h4>&times;</h4>
                                </span>
                            </div>
                        </div>

                        <div className="modal-body justify-content-center">
                            <div className="details mx-3 my-0 mt-0 ">
                                <div className="row">
                                    <div className="col-6">
                                        <p className="mb-0 ipodetailtitle mt-3">
                                            Current Price
                                        </p>
                                        <div
                                            className="text-light"
                                            style={{ fontSize: "19px" }}
                                        >
                                            {`₹ ${current_price}`}
                                        </div>
                                    </div>

                                    <div className="col-6 text-end ">
                                        <p className="mb-0 ipodetailtitle mt-3">
                                            % Change
                                        </p>
                                        <div
                                            className={color}
                                            style={{ fontSize: "19px" }}
                                        >
                                            {`${sign}${price_change}%`}
                                        </div>
                                    </div>
                                </div>

                                <div className="row mt-2">
                                    <div className="col-6">
                                        <p className="mb-0 ipodetailtitle mt-3">
                                            Bid Price
                                        </p>
                                        <div>
                                            <input
                                                className="stockquantity mt-1"
                                                type="number"
                                                onChange={(e) =>
                                                    setbidPrice(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="col-6 text-end ">
                                        <p className="mb-0 ipodetailtitle mt-3">
                                            Quantity
                                        </p>
                                        <div>
                                            <input
                                                className="stockquantity mt-1"
                                                type="number"
                                                onChange={(e) =>
                                                    setQty(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="text-light mb-3 mt-3 px-1 bi bi-wallet"
                            style={{ fontSize: "18px" }}
                        >{` Wallet : ₹ ${cash}`}</div>
                        <div
                            className="text-warning mb-2 px-1"
                            style={{ fontSize: "18px" }}
                        >{`[Total transaction value will be ₹ ${
                            bidPrice * qty
                        }]`}</div>
                        <div className="modal-footer border-0 align-items-center">
                            <button
                                type="button"
                                className="btn btn-success mx-3 mb-3"
                                onClick={handleBuy}
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                Buy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyModal;
