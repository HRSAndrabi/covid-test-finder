import { MdSearch } from "react-icons/md";
import "./Search.scss";

const Search = (props) => {
    const inputFieldId = Math.floor(Math.random() * 10000);

    return (
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
    );
};

export default Search;
