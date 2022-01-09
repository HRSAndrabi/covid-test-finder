import { useState } from "react";
import "./Filters.scss";
import { Chip } from "@mui/material";
import { refreshSelectedListing } from "../Map/Interactivity/Interactivity";

const Filters = (props) => {
    const [filter, setFilter] = useState({
        open: false,
        "walk-in": false,
        "drive-through": false,
        "all-ages": false,
    });

    const filterChangeHandler = (event) => {
        refreshSelectedListing();
        const newFilter = {
            ...filter,
            [event.target.innerText]: !filter[event.target.innerText],
        };
        setFilter(newFilter);
        let filteredFeatures = props.data.features;
        const mapFilters = [];
        if (newFilter.open) {
            mapFilters.push(["==", ["get", "OPEN_STATUS"], "open"]);
            filteredFeatures = filteredFeatures.filter((feature) => {
                return feature.properties["OPEN_STATUS"] === "open";
            });
        } else {
            mapFilters.push(["has", "OPEN_STATUS"]);
        }
        if (newFilter["walk-in"] || newFilter["drive-through"]) {
            const serviceTypeFilter =
                newFilter["walk-in"] === newFilter["drive-through"]
                    ? ["walk-in", "drive-through"]
                    : newFilter["walk-in"]
                    ? ["walk-in"]
                    : ["drive-through"];
            filteredFeatures = filteredFeatures.filter((feature) => {
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
        if (newFilter["all-ages"]) {
            filteredFeatures = filteredFeatures.filter((feature) => {
                return feature.properties["AGE_LIMIT"] === "all ages";
            });
            mapFilters.push(["==", ["get", "AGE_LIMIT"], "all ages"]);
        } else {
            mapFilters.push(["has", "AGE_LIMIT"]);
        }
        props.onFilter({ ...props.data, features: filteredFeatures });
        props.map.current.setFilter("all-vic-testing-sites", [
            "all",
            ...mapFilters,
        ]);
    };
    return (
        <div className="filters">
            <div className="filters__label">Filter:</div>
            <Chip
                label="open"
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
        </div>
    );
};

export default Filters;
