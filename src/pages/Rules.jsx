import React from "react";

const Rules = () => {
    return (
        <div className="container rulesPage mb-5">
            <div class="rulesCard card mx-auto text-light border-0 shadow-lg mb-5">
                <div class="card-header rulesCardTitle border-0 text-center">
                    Rules
                </div>
                <div class="card-body text-align-justify fs-6 p-sm-5">
                    <ol>
                        <li className="text-align-justify ">
                            Each participant will be provided with a unique ID
                            and password to log on the Wallstreet website and
                            start playing.He/She is expected to buy stocks and
                            subscribe to IPOs using the cash amount.
                        </li>
                        <br />
                        <li className="text-align-justify ">
                            Each participant will receive initial cash of
                            ₹10,00,000 which can be used to subscribe IPOs and
                            buy stocks.
                        </li>
                        <br />
                        <li>
                            IPOs will be floated every day before start of the
                            actual trading days to which participants can
                            subscribe.
                        </li>
                        <br />

                        <li>
                            IPO allocation will be visible on the first day. So
                            keep an eye on our social media handles for constant
                            updates.
                        </li>
                        <br />

                        <li>
                            As soon as the market opens at 9:00 AM on the first
                            day, participant can see all the stocks along with
                            their listing price.
                        </li>
                        <br />

                        <li>
                            The market will be up from 9:00 AM to 3:00 PM for 2
                            days.This period is defined as 'day' henceforth in
                            the document.
                        </li>
                        <br />

                        <li>
                            Any buy bid or sell ask rounded off must be to
                            current price. ex. If current price is ₹100.78 then
                            but bid or sell ask must be in range ₹100 to ₹101
                        </li>
                        <br />

                        <li>
                            The stock price would be updated every 3 minutes.
                            The stock price change would be calculated w.r.t its
                            value 3 minutes ago.
                        </li>
                        <br />

                        <li>
                            The Ranking of the user is decided using a
                            'Valuation Formula'.Valuation of the user will be
                            60% of his total asset value in Shares acquired
                            (according to current market prices) + 40% of the
                            cash balance in his account.This total will be
                            termed as the valuation amount.
                        </li>
                        <br />

                        <li>
                            Only Integral Bids allowed.Decimal values will be
                            invalid.
                        </li>
                        <br />

                        <li>
                            Participants can be disqualified for MALPRACTICES.
                        </li>
                        <br />

                        <li>
                            News regarding the listed companies would be
                            displayed every half an hour.
                        </li>
                        <br />

                        <li>
                            After final listing price is determined for an IPO,
                            any additional bid amount placed by a user above the
                            final listing price will be returned to the user's
                            account.
                        </li>
                    </ol>
                </div>
            </div>
            <br />
            <br />
        </div>
    );
};

export default Rules;
