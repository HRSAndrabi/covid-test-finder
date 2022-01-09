import React from "react";
import { useState, useEffect } from "react";
import "./MobileDrawer.scss";
import SiteList from "../SiteList/SiteList";
import Search from "../Search/Search";
import Filters from "../Filters/Filters";

const MobileDrawer = (props) => {
    const drawerOpenHandler = () => {
        props.drawerOpenHandler(true);
    };
    const [data, setData] = useState(props.data);
    const [filter, setFilter] = useState({
        open: false,
        "walk-in": false,
        "drive-through": false,
        "all-ages": false,
    });
    const [searchTerm, setSearchTerm] = useState(null);

    useEffect(() => {
        setData(props.data);
        return () => {};
    }, [props.data]);

    const filterChangeHandler = (filteredData) => {
        setData(filteredData.data);
        setFilter(filteredData.filter);
    };

    const searchHandler = (filteredData) => {
        setData(filteredData.data);
        setSearchTerm(filteredData.searchTerm);
    };

    return (
        <div className="mobile-drawer" tabIndex={0}>
            <div className="drawer-preview">
                <div className="handle-container" onClick={drawerOpenHandler}>
                    <div className="handle"></div>
                </div>
                <div className="drawer-search" onClick={drawerOpenHandler}>
                    <Search
                        data={props.data}
                        map={props.map}
                        filter={filter}
                        onSearch={searchHandler}
                        onClick={drawerOpenHandler}
                    />
                </div>
                <div className="drawer-filters">
                    <Filters
                        data={props.data}
                        map={props.map}
                        onFilter={filterChangeHandler}
                    />
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
