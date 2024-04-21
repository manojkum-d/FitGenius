// Search.jsx
import React, { useRef, useEffect, useState } from "react";
// import SearchModal from "./SearchModal";
import SearchWorkout from "./SearchWorkout";

const Search = () => {
  const inputRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
        <input
            ref={inputRef}
            type="text"
            name="desktopSearch"
            id="desktopSearch"
            className="block w-full h-10 rounded-md border-0 py-3 pl-10 pr-10 text-gray-900 ring-1 ring-inset ring-mw-blue-500 placeholder:text-mw-blue focus:ring-2 focus:ring-inset focus:ring-mw-blue-600 sm:text-sm sm:leading-6"
            placeholder="Search"
            onClick={toggleModal}
        />
      {isModalOpen && (
        // <SearchModal onClose={toggleModal}>
          <SearchWorkout />
        // </SearchModal>
      )}
    </>
  );
};

export default Search;
