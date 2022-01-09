import { useState, useEffect } from "react";
import "./DesktopSidePanel.scss";
import { MdLink } from "react-icons/md";
import SiteList from "../SiteList/SiteList";
import Search from "../Search/Search";

const DesktopSidePanel = (props) => {
    const [data, setData] = useState(props.data);

    const filterChangeHandler = (filteredData) => {
        setData(filteredData);
    };

    useEffect(() => {
        setData(props.data);
    }, [props]);

    return (
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
                    <Search onFilter={filterChangeHandler} data={props.data} />
                </div>
                <div className="testing-site-list">
                    <SiteList map={props.map} data={data} />
                </div>
            </div>
        </div>
    );
};

export default DesktopSidePanel;
