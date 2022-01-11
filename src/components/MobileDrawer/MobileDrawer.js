import React from "react";
import { useState, useEffect } from "react";
import "./MobileDrawer.scss";
import SiteList from "../SiteList/SiteList";
import Search from "../Search/Search";
import Filters from "../Filters/Filters";
// import StatusBar from "../StatusBar/StatusBar";

const MobileDrawer = (props) => {
    const drawerOpenHandler = () => {
        props.drawerOpenHandler();
    };
    const [data, setData] = useState(props.data);
    const [filter, setFilter] = useState({
        open: false,
        "walk-in": false,
        "drive-through": false,
        "all-ages": false,
        "weelchair-access": false,
    });
    const [searchTerm, setSearchTerm] = useState(null);

    const filterChangeHandler = (filteredData) => {
        setData(filteredData.data);
        setFilter(filteredData.filter);
    };

    const searchHandler = (filteredData) => {
        setData(filteredData.data);
        setSearchTerm(filteredData.searchTerm);
    };

    // const refreshHandler = () => {
    //     props.onRefresh();
    // };

    useEffect(() => {
        setData(props.data);
    }, [props]);

    return (
        <div className="mobile-drawer" tabIndex={0}>
            <div className="drawer-preview">
                <div className="handle-container" onClick={drawerOpenHandler}>
                    <div className="handle"></div>
                </div>
                <div
                    className="drawer-search"
                    onClick={!props.drawerOpen ? drawerOpenHandler : null}
                >
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
                        searchTerm={searchTerm}
                        onFilter={filterChangeHandler}
                    />
                </div>
                {/* <div className="drawer-status-bar">
                    <StatusBar
                        data={props.data}
                        onRefresh={refreshHandler}
                        lastUpdated={props.lastUpdated}
                    />
                </div> */}
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
