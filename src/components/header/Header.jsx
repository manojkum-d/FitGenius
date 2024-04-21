import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react'; // Import the Search icon
import img from '../../assets/HomePageText2.png';
// import SearchComponent from '../search/Search'; // Import the Search component
import SearchModal from '../search/SearchModal'; // Import the SearchModal component
import SearchWorkout from '../search/SearchWorkout'; // Import the SearchWorkout component

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleClickOutsideModal = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideModal);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, []);

  return (
    <header className="bg-white py-1">
      <div className="container mx-auto flex justify-between items-center pr-20">
        <img src={img} alt="Logo" className="h-14 mr-4  pl-7" />
        <div className="relative w-[30%]">
          <input
            type="text"
            name="desktopSearch"
            id="desktopSearch"
            className="block w-full h-10 rounded-md border-0 py-3 pl-10 pr-10 text-gray-900 ring-1 ring-inset ring-mw-blue-500 placeholder:text-mw-blue focus:ring-2 focus:ring-inset focus:ring-mw-blue-600 sm:text-sm sm:leading-6"
            placeholder="Search"
            onClick={toggleModal} // Open modal on input click
          />
          {/* Search icon */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
            <Search />
          </div>
        </div>
      </div>
      {/* Popup modal */}
      {isModalOpen && (
        <SearchModal onClose={toggleModal} ref={modalRef}>
          <SearchWorkout />
        </SearchModal>
      )}
    </header>
  );
};

export default Header;
