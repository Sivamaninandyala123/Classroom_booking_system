import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className="d-flex justify-content-center my-4" onSubmit={handleSearchSubmit}>
      <input
        type="text"
        className="form-control"
        placeholder="Search cabins..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button type="submit" className="btn btn-primary ms-2">Search</button>
    </form>
  );
}

export default SearchBar;
