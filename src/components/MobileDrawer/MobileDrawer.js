import React from "react";
import { useState, useEffect } from "react";
import "./MobileDrawer.scss";
import { MdSearch } from "react-icons/md";
import SiteList from "../SiteList/SiteList";

const MobileDrawer = (props) => {
    const [drawerOpen, setDrawerOpen] = useState(props.drawerOpen);
    const drawerOpenHandler = () => {
        props.drawerOpenHandler(true);
    };

    const drawerCloseHandler = () => {
        setDrawerOpen(false);
    };

    useEffect(() => {
        setDrawerOpen(props.drawerOpen);
        return () => {};
    }, [props]);

    const inputFieldId = Math.floor(Math.random() * 10000);

    return (
        <div className="mobile-drawer" tabIndex={0} onClick={drawerOpenHandler}>
            <div className="drawer-preview">
                <div className="handle"></div>
                <div className="search">
                    <MdSearch className="search__icon" />
                    <input
                        id="search__input"
                        className="search__input"
                        type="text"
                        name={inputFieldId}
                        placeholder="Search testing sites"
                    />
                </div>
            </div>
            <div className={`drawer-content ${drawerOpen ? "open" : ""}`}>
                <div className="drawer-content__inner">
                    <div className="testing-site-list">
                        <SiteList map={props.map} data={props.data} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileDrawer;
