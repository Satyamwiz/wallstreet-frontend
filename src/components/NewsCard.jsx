import React from "react";
import { Link } from "react-router-dom";

const NewsCard = ({ id, title, short_description, published_at}) => {
    return (
        <div className="container">
            <div className="d-flex">
                <div
                    class="card m-3 border-0 shadow-lg"
                    style={{ backgroundColor: "#3d3d4d", borderRadius: "10px" }}
                >
                    <div class="card-body">
                        <h5
                            class="card-title mb-3 text-truncate"
                            style={{ color: "#5eb5f8" }}
                        >
                            {title}
                        </h5>
                        <p className="text-muted mb-3">
                        {published_at.slice(11, 16)} &nbsp; {published_at.slice(0, 10)}
                        </p>
                        <p class="card-text mb-3" style={{ color: "#fefdff" }}>
                            {short_description.slice(0, 185)} ...
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
