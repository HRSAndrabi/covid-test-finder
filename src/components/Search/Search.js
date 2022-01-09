import { MdSearch } from "react-icons/md";
import { refreshSelectedListing } from "../Map/Interactivity/Interactivity";
import { filterFeatures } from "../Filters/Filters";
import "./Search.scss";

export const searchFeatures = (features, query) => {
    if (!query) {
        return features;
    }
    const normalise = (value) => {
        return value.toString().trim().toLowerCase();
    };
    query = normalise(query);
    const filteredFeatures = features.filter((feature) => {
        const siteName = feature.properties["SITE_NAME"];
        const suburb = feature.properties["SUBURB"];
        const address = feature.properties["ADDRESS"];
        const postcode = feature.properties["POSTCODE"];
        return (
            (siteName && normalise(siteName).includes(query)) ||
            (suburb && normalise(suburb).includes(query)) ||
            (address && normalise(address).includes(query)) ||
            (postcode && normalise(postcode).includes(query))
        );
    });
    return filteredFeatures;
};

const Search = (props) => {
    const inputFieldId = Math.floor(Math.random() * 10000);

    const searchHandler = (event) => {
        refreshSelectedListing();
        const query = event.target.value;
        let filteredFeatures = filterFeatures(
            props.data.features,
            props.filter,
            props.map
        );
        if (query.length === 0) {
            props.onSearch(filteredFeatures);
        }
        filteredFeatures = searchFeatures(filteredFeatures, query);
        props.onSearch({
            searchTerm: query,
            data: { ...props.data, features: filteredFeatures },
        });
    };

    return (
        <div className="search">
            <MdSearch className="search__icon" />
            <input
                id="search__input"
                className="search__input"
                type="text"
                name={inputFieldId}
                placeholder="Search testing sites"
                onChange={searchHandler}
            />
        </div>
    );
};

export default Search;
