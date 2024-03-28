import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { getNewsDetail } from "../Utils/Apis";
import { ThreeDots } from "react-loader-spinner";

const NewsDetail = () => {
    const { id } = useParams();

    //   const [news, setNews] = useState(null);
    const [news, setNews] = useState({
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, eius?",
        description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat maxime soluta eius earum modi consectetur repudiandae, amet esse cumque, cupiditate quae quis explicabo deleniti, eaque accusamus ducimus quia ipsum nisi vel voluptates fugit consequuntur! Rerum corporis, accusantium, esse deserunt fugit similique corrupti omnis officia quo ullam ipsam laudantium! Mollitia ea nemo omnis fuga vitae velit voluptatibus provident minus exercitationem. Consequuntur. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat maxime soluta eius earum modi consectetur repudiandae, amet esse cumque, cupiditate quae quis explicabo deleniti, eaque accusamus ducimus quia ipsum nisi vel voluptates fugit consequuntur! Rerum corporis, accusantium, esse deserunt fugit similique corrupti omnis officia quo ullam ipsam laudantium! Mollitia ea nemo omnis fuga vitae velit voluptatibus provident minus exercitationem. Consequuntur. ",
    });

    //   useEffect(() => {
    //     setTimeout(() => {
    //       getNewsDetail(id)
    //         .then((n) => {
    //           setNews(n.data);
    //         })
    //         .catch((error) => {
    //           console.error(error);
    //         });
    //     }, 1300);
    //   }, []);

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
