import { memo } from "react";
import SiteListItem from "./SiteListItem";
import { Skeleton } from "@mui/material";
import "./SiteList.scss";

const SiteList = (props) => {
    const getRandom = (min, max) => {
        return parseInt(Math.random() * (max - min) + min);
    };

    return (
        <ul className="visible-sites-list">
            {props.isLoading ? (
                <div className="loading">
                    {Array.apply(null, Array(15)).map((element, idx) => {
                        return (
                            <div className="loading-skeleton" key={idx}>
                                <Skeleton
                                    variant="text"
                                    animation="wave"
                                    sx={{
                                        width: `${getRandom(30, 50)}%`,
                                        marginTop: "10px",
                                    }}
                                />
                                <Skeleton
                                    variant="text"
                                    animation="wave"
                                    sx={{ width: `${getRandom(75, 100)}%` }}
                                />
                                <Skeleton
                                    variant="text"
                                    animation="wave"
                                    sx={{ width: `${getRandom(50, 70)}%` }}
                                />
                            </div>
                        );
                    })}
                </div>
            ) : props.data.features.length ? (
                props.data.features.map((feature, idx) => {
                    return (
                        <SiteListItem
                            feature={feature}
                            map={props.map}
                            key={idx}
                        />
                    );
                })
            ) : (
                <div className="no-results">
                    <div className="no-results__heading">No results found</div>
                    <div className="no-results__body">
                        Sorry, we found no testing sites matching your search
                        and selected filters.
                    </div>
                </div>
            )}
        </ul>
    );
};

export default memo(SiteList);
