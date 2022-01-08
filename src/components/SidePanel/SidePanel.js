import { useState, useEffect } from "react";
import "./SidePanel.scss";
import { MdSearch } from "react-icons/md";
import _uniqueId from "lodash/uniqueId";
import { MdLink } from "react-icons/md";
import { Chip } from "@mui/material";

const SidePanel = (props) => {
    const [drawerOpen, setDrawerOpen] = useState(props.drawerOpen);
    const [filter, setFilter] = useState({
        open: false,
        "walk-in": false,
        "drive-through": false,
        "all-ages": false,
    });

    const drawerOpenHandler = () => {
        props.drawerOpenHandler(true);
    };

    const drawerCloseHandler = () => {
        setDrawerOpen(false);
    };

    const filterChangeHandler = (event) => {
        setFilter({
            ...filter,
            [event.target.innerText]: !filter[event.target.innerText],
        });
    };

    useEffect(() => {
        setDrawerOpen(props.drawerOpen);
        return () => {};
    }, [props]);

    const inputFieldId = Math.floor(Math.random() * 10000);
    return (
        <>
            <div className="desktop-drawer">
                <div className="drawer-inner">
                    <div className="drawer-hero">
                        <div className="drawer-hero__header">
                            COVID-19 test finder
                        </div>
                        <div className="drawer-hero__links">
                            <MdLink /> covidtestnearme.app
                        </div>
                    </div>
                    <div className="drawer-search">
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
                        <div className="search-filters">
                            <div className="search-filters__label">Filter:</div>
                            <Chip
                                label="open"
                                color={filter.open ? "primary" : "default"}
                                size="small"
                                onClick={filterChangeHandler}
                            />
                            <Chip
                                label="walk-in"
                                color={
                                    filter["walk-in"] ? "primary" : "default"
                                }
                                size="small"
                                onClick={filterChangeHandler}
                            />
                            <Chip
                                label="drive-through"
                                color={
                                    filter["drive-through"]
                                        ? "primary"
                                        : "default"
                                }
                                size="small"
                                onClick={filterChangeHandler}
                            />
                            <Chip
                                label="all ages"
                                color={
                                    filter["all-ages"] ? "primary" : "default"
                                }
                                size="small"
                                onClick={filterChangeHandler}
                            />
                        </div>
                    </div>
                    <div className="testing-site-list">
                        {props.renderedFeatures}
                    </div>
                </div>
            </div>
            <div
                className="mobile-drawer"
                tabIndex={0}
                onClick={drawerOpenHandler}
                // onBlur={drawerCloseHandler}
            >
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
                        {props.renderedFeatures}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SidePanel;
