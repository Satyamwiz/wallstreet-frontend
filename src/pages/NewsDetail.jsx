import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { newsService } from "../services/apis";

const NewsDetail = () => {
    const { id } = useParams();

    const [news, setNews] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            newsService
                .getNewsDetail(id)
                .then((res) => setNews(res))
                .catch((err) => console.log(""));
        }, 900);
    }, []);

    return (
        <div className="container p-3 px-4 p-sm-5">
            {!news && (
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

            {news && (
                <>
                    <div className="mt-2">
                        <div className="flex align-items-center">
                            <div className="h3 newsdetailheadline">
                                {news.title}
                            </div>
                            <br />
                            <div className="newsbody mt-1 mt-sm-5">
                                {news.description}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default NewsDetail;
