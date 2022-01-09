import { useState, useEffect } from "react";
import "./DesktopSidePanel.scss";
import { MdLink } from "react-icons/md";
import SiteList from "../SiteList/SiteList";
import Search from "../Search/Search";

const DesktopSidePanel = (props) => {
    const [data, setData] = useState(props.data);

    const filterChangeHandler = (filter) => {
        let filteredFeatures = props.data.features;
        if (filter.open) {
            filteredFeatures = filteredFeatures.filter((feature) => {
                return feature.properties["OPEN_STATUS"] === "open";
            });
        }
        if (filter["walk-in"] || filter["drive-through"]) {
            const serviceTypeFilter =
                filter["walk-in"] === filter["drive-through"]
                    ? ["walk-in", "drive-through"]
                    : filter["walk-in"]
                    ? ["walk-in"]
                    : ["drive-through"];
            filteredFeatures = filteredFeatures.filter((feature) => {
                return serviceTypeFilter.includes(
                    feature.properties["SERVICE_FORMAT"]
                );
            });
        }
        if (filter["all-ages"]) {
            filteredFeatures = filteredFeatures.filter((feature) => {
                return feature.properties["AGE_LIMIT"] === "all ages";
            });
        }
        setData({ ...data, features: filteredFeatures });
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
                    <Search onFilter={filterChangeHandler} />
                </div>
                <div className="testing-site-list">
                    <SiteList map={props.map} data={data} />
                </div>
            </div>
        </div>
    );
};

export default DesktopSidePanel;
