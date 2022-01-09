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

    useEffect(() => {
        setData(props.data);
        return () => {};
    }, [props.data]);

    const filterChangeHandler = (filteredData) => {
        setData(filteredData);
    };

    return (
        <div className="mobile-drawer" tabIndex={0}>
            <div className="drawer-preview">
                <div className="handle" onClick={drawerOpenHandler}></div>
                <div className="drawer-search">
                    <Search data={props.data} map={props.map} />
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
