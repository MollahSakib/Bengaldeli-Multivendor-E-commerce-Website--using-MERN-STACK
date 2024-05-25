import React from 'react';

const Search = ({ setParPage, setSearchValue, searchValue }) => {
  return (
    <div className="flex justify-between items-center">
      <select
        onChange={(e) => setParPage(parseInt(e.target.value))}
        className="px-4 py-2 outline-none focus:border-red-500 bg-[#ffffff] border-slate-700 rounded-md text-[#000000] overflow-hidden"
      >
        <option value="5">5</option>
        <option value="15">15</option>
        <option value="25">25</option>
      </select>
      <input
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
        className="px-3 py-2 outline-none border bg-transparent border-slate-700 rounded-md text-[#ffffff]
           focus:border-red-500 overflow-hidden"
        type="text"
        placeholder="search"
      />
      
    </div>
  );
};

export default Search;
