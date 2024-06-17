import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = (event) => {
        setQuery(event.target.value);
        onSearch(event.target.value);
    };

    return (
        <div className="mb-4">
            <input
                type="text"
                className="form-control"
                value={query}
                onChange={handleSearch}
                placeholder="Search recipes..."
            />
        </div>
    );
};

export default SearchBar;
