import React from "react";
import { useState, useEffect } from "react";
import NewsCard from "../components/NewsCard.jsx";
import { ThreeDots } from "react-loader-spinner";
import { newsService } from "../services/apis.js";

const News = () => {
    const [news, setNews] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            newsService
                .getNews()
                .then((res) => setNews(res))
                .catch((err) => console.log(""));
        }, 900);
    }, []);

    return (
        <div className="container p-0 p-sm-5">
            <div className="h3 upcoming mb-4 text-center">Latest News</div>

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

            <div className="row row-cols-1 row-cols-xl-3 g-2 g-sm-1">
                {news && (
                    <>
                        {news.map((n) => (
                            <div className="col">
                                <NewsCard key={n.id} {...n} />
                            </div>
                        ))}
                    </>
                )}
            </div>

            <br />
            <br />
            <br />
        </div>
    );
};

export default News;
