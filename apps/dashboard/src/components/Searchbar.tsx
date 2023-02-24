import React, { useState } from 'react';
import { useAuth } from '@src/context/AuthProvider';
import Login from '@src/pages/login';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const auth = useAuth();

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="flex items-center">
      {auth ? (
        <>
          <div className="flex">
            <input
              type="text"
              className="block w-full rounded-md border bg-white px-4 py-2 text-indigo-500 focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-40"
              placeholder="Search for exercises"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className='font["Poppins",San-serif] cursor-pointer rounded bg-indigo-500 px-2 py-1 text-xl font-bold text-white hover:bg-indigo-600'
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default SearchBar;
