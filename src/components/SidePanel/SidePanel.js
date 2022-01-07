import { useState, useEffect } from "react";
import "./SidePanel.scss";
import { MdSearch } from "react-icons/md";
import _uniqueId from "lodash/uniqueId";

const SidePanel = (props) => {
    const [drawerOpen, setDrawerOpen] = useState(props.drawerOpen);
    const [id, setID] = useState(_uniqueId("form-"));

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

    return (
        <>
            <div className="desktop-drawer">
                <div className="drawer-inner">{props.renderedFeatures}</div>
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
                            name={id}
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
