import { useState, useEffect } from "react";
import "./DesktopSidePanel.scss";
import { MdLink } from "react-icons/md";
import SiteList from "../SiteList/SiteList";
import Search from "../Search/Search";
import Filters from "../Filters/Filters";

const DesktopSidePanel = (props) => {
    const [data, setData] = useState(props.data);
    const [filter, setFilter] = useState({
        open: false,
        "walk-in": false,
        "drive-through": false,
        "all-ages": false,
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
                    <Search
                        data={props.data}
                        map={props.map}
                        filter={filter}
                        onSearch={searchHandler}
                    />
                    <Filters
                        onFilter={filterChangeHandler}
                        data={props.data}
                        map={props.map}
                        searchTerm={searchTerm}
                    />
                </div>
                <div className="testing-site-list">
                    <SiteList map={props.map} data={data} />
                </div>
            </div>
        </div>
    );
};

export default DesktopSidePanel;
