import { useState } from "react";
import "./Filters.scss";
import { Chip } from "@mui/material";
import { refreshSelectedListing } from "../Map/Interactivity/Interactivity";
import { searchFeatures } from "../Search/Search";
import { MdTune } from "react-icons/md";

export const filterFeatures = (features, filter, map) => {
    const mapFilters = [];
    if (filter["open now"]) {
        mapFilters.push(["==", ["get", "OPEN_STATUS"], "open"]);
        features = features.filter((feature) => {
            return feature.properties["OPEN_STATUS"] === "open";
        });
    } else {
        mapFilters.push(["has", "OPEN_STATUS"]);
    }
    if (filter["wheelchair-access"]) {
        mapFilters.push(["==", ["get", "WHEELCHAIR"], true]);
        features = features.filter((feature) => {
            return feature.properties["WHEELCHAIR"] === true;
        });
    } else {
        mapFilters.push(["has", "WHEELCHAIR"]);
    }
    if (filter["walk-in"] || filter["drive-through"]) {
        const serviceTypeFilter =
            filter["walk-in"] === filter["drive-through"]
                ? ["walk-in", "drive-through"]
                : filter["walk-in"]
                ? ["walk-in"]
                : ["drive-through"];
        features = features.filter((feature) => {
            return serviceTypeFilter.includes(
                feature.properties["SERVICE_FORMAT"]
            );
        });
        mapFilters.push([
            "any",
            ...serviceTypeFilter.map((acceptedValue) => {
                return ["==", ["get", "SERVICE_FORMAT"], acceptedValue];
            }),
        ]);
    }
    if (filter["all-ages"]) {
        features = features.filter((feature) => {
            return feature.properties["AGE_LIMIT"] === "all ages";
        });
        mapFilters.push(["==", ["get", "AGE_LIMIT"], "all ages"]);
    } else {
        mapFilters.push(["has", "AGE_LIMIT"]);
    }
    map.current.setFilter("all-vic-testing-sites", ["all", ...mapFilters]);
    return features;
};

const Filters = (props) => {
    const [filter, setFilter] = useState({
        "open now": false,
        "walk-in": false,
        "drive-through": false,
        "all-ages": false,
        "wheelchair-access": false,
    });
    const [filterLabelCollapsed, setFilterLabelCollapsed] = useState(false);

    const filterChangeHandler = (event) => {
        refreshSelectedListing();
        const newFilter = {
            ...filter,
            [event.target.innerText]: !filter[event.target.innerText],
        };
        setFilter(newFilter);
        let filteredFeatures = searchFeatures(
            props.data.features,
            props.searchTerm
        );
        filteredFeatures = filterFeatures(
            filteredFeatures,
            newFilter,
            props.map
        );
        props.onFilter({
            filter: newFilter,
            data: { ...props.data, features: filteredFeatures },
        });
    };

    const onFilterScroll = (event) => {
        const scrollLeft = event.currentTarget.scrollLeft;
        if (scrollLeft === 0) {
            setFilterLabelCollapsed(false);
        } else {
            setFilterLabelCollapsed(true);
        }
    };

    return (
        <div className="filters">
            <div className="filters__label">
                <div
                    className={`filters__label-inner ${
                        filterLabelCollapsed ? "collapsed" : ""
                    }`}
                >
                    <div className="filters__label__icon">
                        <MdTune />
                    </div>
                    <div className="filters__label__text">Filters</div>
                </div>
            </div>
            <div className="filters__options" onScrollCapture={onFilterScroll}>
                <Chip
                    label="open now"
                    color={filter.open ? "primary" : "default"}
                    size="small"
                    onClick={filterChangeHandler}
                />
                <Chip
                    label="walk-in"
                    color={filter["walk-in"] ? "primary" : "default"}
                    size="small"
                    onClick={filterChangeHandler}
                />
                <Chip
                    label="drive-through"
                    color={filter["drive-through"] ? "primary" : "default"}
                    size="small"
                    onClick={filterChangeHandler}
                />
                <Chip
                    label="all-ages"
                    color={filter["all-ages"] ? "primary" : "default"}
                    size="small"
                    onClick={filterChangeHandler}
                />
                <Chip
                    label="wheelchair-access"
                    color={filter["wheelchair-access"] ? "primary" : "default"}
                    size="small"
                    onClick={filterChangeHandler}
                />
            </div>
        </div>
    );
};

export default Filters;
