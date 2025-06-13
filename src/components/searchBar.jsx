import React from "react";

const SearchBar = ({ searchInput, onChange, onSearch, onClear }) => (
    <div className="search-bar">
        <input type="text" placeholder="Search movies..." value={searchInput}
            onChange={onChange}
            onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        />
        <button onClick={onSearch}>Search</button>
        <button onClick={onClear} className="clear-button">Clear</button>
    </div>
);

export default SearchBar;