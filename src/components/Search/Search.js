import { useState } from "react";
import { MdSearch } from "react-icons/md";
import { Chip } from "@mui/material";
import { refreshSelectedListing } from "../Map/Interactivity/Interactivity";
import "./Search.scss";

const Search = (props) => {
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

    const inputFieldId = Math.floor(Math.random() * 10000);

    return (
        <>
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
        </>
    );
};

export default Search;
