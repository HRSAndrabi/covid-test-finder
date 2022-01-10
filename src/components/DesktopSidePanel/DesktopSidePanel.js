import { useState, useEffect } from "react";
import "./DesktopSidePanel.scss";
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
                <div className="drawer-attribution">
                    {" "}
                    Visualized by{" "}
                    <a
                        href="https://twitter.com/hrs_andrabi"
                        target="_blank"
                        rel="noreferrer"
                    >
                        @hrs_andrabi
                    </a>
                    . Data from{" "}
                    <a
                        href="https://www.dhhs.vic.gov.au/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        dhhs.vic.gov.au
                    </a>
                    ,{" "}
                    <a
                        href="https://data.gov.au/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        data.gov.au
                    </a>
                    . Mapping{" "}
                    <a
                        href="https://www.mapbox.com/about/maps/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        © Mapbox
                    </a>{" "}
                    <a
                        href="https://www.openstreetmap.org/copyright"
                        target="_blank"
                        rel="noreferrer"
                    >
                        © OpenStreetMap
                    </a>
                    . Buy me a coffee ☕
                </div>
            </div>
        </div>
    );
};

export default DesktopSidePanel;
