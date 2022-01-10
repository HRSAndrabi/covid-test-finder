import { useState, useEffect } from "react";
import "./DesktopSidePanel.scss";
import SiteList from "../SiteList/SiteList";
import Search from "../Search/Search";
import Filters from "../Filters/Filters";
// import { ReactComponent as Logo } from "../../logo.svg";
import { MdRefresh, MdPlace } from "react-icons/md";
import moment from "moment";

const DesktopSidePanel = (props) => {
    const [data, setData] = useState(props.data);
    const [filter, setFilter] = useState({
        open: false,
        "walk-in": false,
        "drive-through": false,
        "all-ages": false,
    });
    const [searchTerm, setSearchTerm] = useState(null);
    const [timeSinceUpdate, setTimeSinceUpdate] = useState(
        moment.duration(moment().diff(props.lastUpdated)).seconds()
    );

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
        const updateTimeStamp = setInterval(() => {
            const newTimeSinceUpdate = moment.duration(
                props.lastUpdated.diff(moment())
            );
            if (moment.duration(newTimeSinceUpdate.asHours() < -2)) {
                props.refreshData();
            }
            setTimeSinceUpdate(newTimeSinceUpdate);
        }, 60 * 1000);
        return () => {
            clearInterval(updateTimeStamp);
        };
    }, [props]);

    return (
        <div className="desktop-drawer">
            <div className="drawer-inner">
                <div className="drawer-meta">
                    {/* <div className="drawer-meta-item">COVID-19 test finder</div> */}
                    <div className="drawer-meta-item">
                        <MdPlace /> Found {props.data.features.length} testing
                        sites
                    </div>
                    <div className="drawer-meta-item">
                        <MdRefresh /> Last updated:{" "}
                        {moment.duration(timeSinceUpdate).asSeconds() > -60
                            ? "a few seconds ago"
                            : moment.duration(timeSinceUpdate).asMinutes() > -60
                            ? moment
                                  .duration(timeSinceUpdate, "minutes")
                                  .humanize(true)
                            : moment
                                  .duration(timeSinceUpdate, "hours")
                                  .humanize(true)}
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
                    .{" "}
                    <a
                        href="https://www.buymeacoffee.com/hrsandrabi"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Buy me a coffee ☕
                    </a>
                </div>
            </div>
        </div>
    );
};

export default DesktopSidePanel;
