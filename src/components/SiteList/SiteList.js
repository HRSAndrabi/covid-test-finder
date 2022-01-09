import { memo } from "react";
import SiteListItem from "./SiteListItem";
import "./SiteList.scss";

const SiteList = (props) => {
    return (
        <ul className="visible-sites-list">
            {props.data.features.length ? (
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
