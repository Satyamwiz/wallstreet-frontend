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
                        <li>
                            IPOs will be floated every day before start of the
                            actual trading days to which participants can
                            subscribe.
                        </li>
                        <br />

                        <li>
                            IPO allocation will be visible on the first day of
                            actual trading and will be done on a first come
                            first serve basis. So keep an eye on our social
                            media handles for constant updates.
                        </li>
                        <br />

                        <li>
                            As soon as the market opens at 9:00 AM on the first
                            day, participant can see all the stocks along with
                            their listing price.
                        </li>
                        <br />

                        <li>
                            The market will be up from 9:00 AM to 5:00 PM for 3
                            days.This period is defined as 'day' henceforth in
                            the document.
                        </li>
                        <br />

                        <li>
                            Any buy bid or sell ask can be made within a margin
                            of ±10% of the current share price.For ex,if the
                            current market price of a share is Rs.100/-,a buy or
                            sell bid can be made from any range between Rs. 90-
                            Rs.110/-
                        </li>
                        <br />

                        <li>
                            A transaction fee of 1% of total transaction cost
                            will be charged from both the seller and the buyer
                            for every successful transaction between the two.
                        </li>
                        <br />

                        <li>
                            When a user places a buy bid for the shares of the
                            company A, the amount he's bidding for will be
                            immediately deducted from his account along with the
                            relevant transaction fee of 1%. For ex. if the buyer
                            buys 50 shares for Rs. 106 each share, the cost will
                            be Rs.5300/-. Adding 1% transaction fee the final
                            cost that'll be deducted from the buyer's account
                            will be1.01*5300 = Rs.5353/-. This amount will be
                            immediately deducted, and the user won't be able to
                            access this amount.
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
                    </ol>
                </div>
            </div>
            <br />
            <br />
        </div>
    );
};

export default Rules;
