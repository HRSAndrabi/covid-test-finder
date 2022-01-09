import { useState } from "react";
import { MdSearch } from "react-icons/md";
import { Chip } from "@mui/material";

const Search = (props) => {
    const [filter, setFilter] = useState({
        open: false,
        "walk-in": false,
        "drive-through": false,
        "all-ages": false,
    });

    const filterChangeHandler = (event) => {
        const newFilter = {
            ...filter,
            [event.target.innerText]: !filter[event.target.innerText],
        };
        setFilter(newFilter);
        props.onFilter(newFilter);
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
