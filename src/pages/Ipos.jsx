import { React, useState, useEffect } from "react";
import IpoCard from "../components/IpoCard.jsx";
import { ThreeDots } from "react-loader-spinner";
import { ipoService } from "../services/apis";

const Ipos = () => {
    const [ipos, setIpos] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            ipoService
                .getIpos()
                .then((res) => setIpos(res))
                .catch((err) => console.log(err));
        }, 1300);
    }, []);

    return (
        <div className="container p-3 p-sm-5">
            <div className="h3 ipoupcoming mb-3 mb-sm-4 text-center">
                Upcoming IPO's
            </div>

            <br />

            {!ipos && (
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

            <div className="row row-cols-1 g-4 g-sm-3 mx-sm-auto mx-0">
                {ipos && (
                    <>
                        {ipos.map((ipo) => {
                            return <IpoCard key={ipo.id} {...ipo} />;
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

export default Ipos;
