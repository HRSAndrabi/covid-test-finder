import { memo } from "react";
import SiteListItem from "./SiteListItem";
import "./SiteList.scss";

const SiteList = (props) => {
    return (
        <ul className="visible-sites-list">
            {props.data.features.length &&
                props.data.features.map((feature, idx) => {
                    return (
                        <SiteListItem
                            feature={feature}
                            map={props.map}
                            key={idx}
                        />
                    );
                })}
        </ul>
    );
};

export default memo(SiteList);
