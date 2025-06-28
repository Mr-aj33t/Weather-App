import logo from '../assets/aj.png';
import Search from '../assets/search.png';
import location from '../assets/location.png';
import { useState } from 'react';
import { toast } from 'react-toastify';

const NavBar = ({ onCitySearch, onLocationfetch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onCitySearch(searchQuery);
    } else {
      toast.error("Please enter a city name.");
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          onLocationfetch(latitude, longitude);
        },
        (error) => {
          console.error(error);
          toast.error("Geolocation not supported or access denied.");
        }
      );
    } else {
      toast.error("Geolocation not supported by your browser.");
    }
  };

  return (
    <div className="m-4">
      <div className="flex flex-col items-center justify-between gap-4 lg:flex-row 
                      bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl 
                      rounded-xl p-4">
        {/* Logo */}
        <img src={logo} alt="logo" className='w-20 select-none' />

        {/* Search Bar */}
        <form
          className='relative flex items-center w-full max-w-md bg-white/20 backdrop-blur-sm 
                    rounded-lg shadow-md border border-white/30'
          onSubmit={handleSearchSubmit}
        >
          <img src={Search} alt="search" className='absolute left-3 w-4 h-4 text-gray-400 select-none' />
          <input
            type='text'
            value={searchQuery}
            onChange={handleSearchQuery}
            placeholder='Search for your city'
            className='w-full py-2 pl-10 pr-4 text-sm text-white placeholder-gray-200 bg-transparent 
                      outline-none rounded-lg'
          />
          <button
            type="submit"
            className='bg-[#050e1fde] text-white px-5 py-2 rounded-r-lg hover:bg-[#0d1b2a]'
          >
            Search
          </button>
        </form>

        {/* Current Location Button */}
        <div
          className='flex items-center gap-3 px-4 py-2 text-sm font-medium text-white 
                    bg-green-500/80 hover:bg-green-600 rounded-lg cursor-pointer shadow-md'
          onClick={handleLocationClick}
        >
          <img src={location} alt="location" className="w-6 h-6" />
          <p>Current Location</p>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
