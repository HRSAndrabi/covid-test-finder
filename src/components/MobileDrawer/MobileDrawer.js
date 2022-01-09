import React from "react";
import { useState, useEffect } from "react";
import "./MobileDrawer.scss";
import SiteList from "../SiteList/SiteList";
import Search from "../Search/Search";

const MobileDrawer = (props) => {
    const drawerOpenHandler = () => {
        props.drawerOpenHandler(true);
    };
    const [data, setData] = useState(props.data);

    useEffect(() => {
        setData(props.data);
        return () => {};
    }, [props.data]);

    const filterChangeHandler = (filter) => {
        let filteredFeatures = props.data.features;
        if (filter.open) {
            filteredFeatures = filteredFeatures.filter((feature) => {
                return feature.properties["OPEN_STATUS"] === "open";
            });
        }
        if (filter["walk-in"] || filter["drive-through"]) {
            const serviceTypeFilter =
                filter["walk-in"] === filter["drive-through"]
                    ? ["walk-in", "drive-through"]
                    : filter["walk-in"]
                    ? ["walk-in"]
                    : ["drive-through"];
            filteredFeatures = filteredFeatures.filter((feature) => {
                return serviceTypeFilter.includes(
                    feature.properties["SERVICE_FORMAT"]
                );
            });
        }
        if (filter["all-ages"]) {
            filteredFeatures = filteredFeatures.filter((feature) => {
                return feature.properties["AGE_LIMIT"] === "all ages";
            });
        }
        setData({ ...data, features: filteredFeatures });
    };

    return (
        <div className="mobile-drawer" tabIndex={0} onClick={drawerOpenHandler}>
            <div className="drawer-preview">
                <div className="handle"></div>
                <div className="drawer-search">
                    <Search onFilter={filterChangeHandler} />
                </div>
            </div>
            <div className={`drawer-content ${props.drawerOpen ? "open" : ""}`}>
                <div className="drawer-content__inner">
                    <div className="testing-site-list">
                        <SiteList map={props.map} data={data} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileDrawer;
