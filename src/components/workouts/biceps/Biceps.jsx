import React, { useState } from 'react';
import exercisesData from '../../../../updated_json_file1.json';
// import Biceps from '../biceps/Biceps';

const Biceps = () => {
  const perPage = 4; // Number of exercises per page
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [selectedLevel, setSelectedLevel] = useState(''); // State for selected level
  const [selectedEquipment, setSelectedEquipment] = useState(''); // State for selected equipment
  const [selectedCategory, setSelectedCategory] = useState(''); // State for selected category

  // Filter exercises that belong to the chest category
  const chestExercises = exercisesData.exercises.filter(
    exercise => exercise.primaryMuscles.includes('biceps')
  );  
  

  

  // Filter exercises based on search term
  const filteredExercises = chestExercises.filter(exercise =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter exercises based on selected level
  const levelFilteredExercises = selectedLevel
    ? filteredExercises.filter(exercise => exercise.level === selectedLevel)
    : filteredExercises;

  // Filter exercises based on selected equipment
  const equipmentFilteredExercises = selectedEquipment
    ? levelFilteredExercises.filter(exercise => exercise.equipment === selectedEquipment)
    : levelFilteredExercises;

  // Filter exercises based on selected category
  const categoryFilteredExercises = selectedCategory
    ? equipmentFilteredExercises.filter(exercise => exercise.category === selectedCategory)
    : equipmentFilteredExercises;

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  // Get exercises for the current page
  const currentExercises = categoryFilteredExercises.slice(startIndex, endIndex);

  // Calculate total number of pages
  const totalPages = Math.ceil(categoryFilteredExercises.length / perPage);

  // Function to handle next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to handle previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to handle search input change
  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset current page when search term changes
  };

  // Function to handle level selection change
  const handleLevelChange = event => {
    setSelectedLevel(event.target.value);
    setCurrentPage(1); // Reset current page when level selection changes
  };

  // Function to handle equipment selection change
  const handleEquipmentChange = event => {
    setSelectedEquipment(event.target.value);
    setCurrentPage(1); // Reset current page when equipment selection changes
  };

  // Function to handle category selection change
  const handleCategoryChange = event => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1); // Reset current page when category selection changes
  };

  return (
    <div className="container mx-auto py-10 px-8">
      <h2 className="text-2xl font-bold mb-4">Biceps</h2>
      <div className="mb-4">
        {/* Search input */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search exercises..."
          className="border border-gray-400 rounded py-2 px-4 mb-2 mr-2"
        />
        {/* Level selection */}
        <select
          value={selectedLevel}
          onChange={handleLevelChange}
          className="border border-gray-400 rounded py-2 px-4 mb-2 mr-2"
        >
          <option value="">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="expert">Expert</option>
        </select>
        {/* Equipment selection */}
        <select
          value={selectedEquipment}
          onChange={handleEquipmentChange}
          className="border border-gray-400 rounded py-2 px-4 mb-2 mr-2"
        >
          <option value="">All Equipment</option>
          <option value="other">Other</option>
          <option value="machine">Machine</option>
          <option value="kettlebells">Kettlebells</option>
          <option value="exercise ball">Exercise Ball</option>
          <option value="bands">Bands</option>
          <option value="barbell">Barbell</option>
          <option value="foam roll">Foam Roll</option>
          <option value="cable">Cable</option>
          <option value="medicine ball">Medicine Ball</option>
          <option value="dumbbell">Dumbbell</option>
          <option value="body only">Body Only</option>
          <option value="e-z curl bar">E-Z Curl Bar</option>
        </select>
        {/* Category selection */}
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border border-gray-400 rounded py-2 px-4 mb-2"
        >
          <option value="">All Categories</option>
          <option value="strongman">Strongman</option>
          <option value="cardio">Cardio</option>
          <option value="olympic weightlifting">Olympic Weightlifting</option>
          <option value="powerlifting">Powerlifting</option>
          <option value="plyometrics">Plyometrics</option>
          <option value="stretching">Stretching</option>
          <option value="strength">Strength</option>
        </select>
      </div>
      {currentExercises.map((exercise, index) => (
        <div key={index} className="mb-8 rounded-lg border border-black overflow-visible relative mt-auto flex flex-1 flex-col bg-white">
          <div className={`mx-auto w-full px-6 rounded-t-lg bg-indigo-950 flex justify-between items-center`}>
            <h2 className="text-xl font-bold tracking-tight text-white sm:text-4xl py-2">{exercise.name}</h2>
          </div>
          <div className="absolute top-20 -mx-3 ltr:-left-2 rtl:-right-2 z-10 rounded-full  px-2.5 py-1 text-xs font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mw-blue-900 bg-gradient-to-l  from-mw-green to-mw-green-900 ring-mw-green-800" style={{ backgroundColor: getColorByLevel(exercise.level) }}>
            {exercise.level.charAt(0).toUpperCase() + exercise.level.slice(1)}
          </div>
          <div className="flex flex-row  justify-center gap-4 pt-2">
            {/* Render exercise images */}
            {exercise.image.map((img, imgIndex) => (
              <img
                key={imgIndex}
                src={img}
                alt={`Image ${imgIndex + 1}`}
                className="w-2/5 h-auto mb-2 rounded-lg"
              />
            ))}
          </div>
          <div className='px-6'>
            <h4 className="text-lg font-semibold mb-2">Description:</h4>
            <ul className="list-disc pl-4">
              {/* Render exercise instructions as list items */}
              {exercise.instructions.map((instruction, instructionIndex) => (
                <li key={instructionIndex} className="mb-2">{instruction}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
      <div className="flex justify-between mt-8 py-11">
        {/* Previous page button */}
        <button
          onClick={prevPage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        {/* Next page button */}
        <button
          onClick={nextPage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const getColorByLevel = (level) => {
  switch (level) {
    case 'beginner':
      return 'green';
    case 'intermediate':
      return 'indigo';
    case 'expert':
      return 'red';
    default:
      return 'gray'; // default color if level is not provided
  }
};

export default Biceps;
