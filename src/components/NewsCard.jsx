import React from "react";
import { Link } from "react-router-dom";

const NewsCard = ({ id, title, description }) => {
    return (
        <div className="container">
            <div className="d-flex">
                <div
                    class="card m-3 border-0 shadow-lg"
                    style={{ backgroundColor: "#3d3d4d", borderRadius: "10px" }}
                >
                    <div class="card-body">
                        <h5
                            class="card-title mb-4 text-truncate"
                            style={{ color: "#5eb5f8" }}
                        >
                            {title}
                        </h5>
                        <p class="card-text  mb-4" style={{ color: "#fefdff" }}>
                            {description.slice(0, 200)} ...
                        </p>
                        <Link
                            to={`/newsdetail/${id}`}
                            class="card-link text-muted"
                        >
                            <u>Read more</u>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsCard;
