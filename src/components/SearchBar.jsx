import React from 'react';
import '.Test.jsx'

export default function SearchBar() {

    



  return (
    <>
      <form className="search-bar">
        <input type="text" placeholder="Search for a city..." />
        <button type="submit">Search</button>
      </form>
    </>
  );
}