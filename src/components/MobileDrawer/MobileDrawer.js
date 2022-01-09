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

    const filterChangeHandler = (filteredData) => {
        setData(filteredData);
    };

    return (
        <div className="mobile-drawer" tabIndex={0} onClick={drawerOpenHandler}>
            <div className="drawer-preview">
                <div className="handle"></div>
                <div className="drawer-search">
                    <Search onFilter={filterChangeHandler} data={props.data} />
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
