import React, { useState, useRef, useEffect } from "react";

const SearchModal = React.forwardRef(({ children, onClose }, ref) => {
  const [searchTerm, setSearchTerm] = useState("");
  const modalRef = ref || useRef(null); // Use forwarded ref if provided, or create a new one

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to handle closing the modal
  const handleClose = () => {
    onClose();
  };

  // Function to handle clicks outside of the modal
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  // Effect to add event listener for clicks outside of the modal
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-gray-800 bg-opacity-50 absolute inset-0"></div>
      <div ref={modalRef} className="bg-white p-8 rounded-lg shadow-lg max-h-[80%] overflow-y-auto relative  max-w-[50%]">
        {/* Search input */}
        {/* <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search exercise names..."
          className="border border-gray-400 rounded py-2 px-4 mb-4"
        /> */}
        {/* Close button */}
        <button
          className="absolute top-2 right-2 p-2 focus:outline-none"
          onClick={handleClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
});

export default SearchModal;
