import React, { useState } from 'react';
import exercisesData from '../../../updated_json_file1.json';

const SearchWorkout = () => {
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [selectedWorkout, setSelectedWorkout] = useState(null); // State for selected workout
  const [defaultWorkout, setDefaultWorkout] = useState(null); // State for default workout

  // Filter exercises based on search term
  const filteredExercises = exercisesData.exercises.filter(exercise =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle search input change
  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
    if (searchTerm === '') {
      setSelectedWorkout(defaultWorkout);
    }
  };

  // Function to handle workout selection
  const handleWorkoutSelect = workout => {
    setSelectedWorkout(workout);
  };

  // Set default workout when component is rendered
  useState(() => {
    const defaultWorkout = exercisesData.exercises.find(exercise => exercise.name === 'Barbell Full Squat');
    setDefaultWorkout(defaultWorkout);
    setSelectedWorkout(defaultWorkout);
  }, []);

  return (
    <div className="container m-auto flex mb-4">
      {/* Left column: List of workouts */}
      <div className="w-[15%] pr-8 fixed ">
        <h2 className="text-2xl font-bold mb-4">Workouts</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search workouts..."
          className="border border-gray-400 rounded py-2 px-4 mb-2 w-[12vw]"
        />
        <div className="overflow-y-auto max-h-96">
          {filteredExercises.map((exercise, index) => (
            <div
              key={index}
              className="cursor-pointer hover:bg-gray-200 rounded p-2 mb-2 "
              onClick={() => handleWorkoutSelect(exercise)}
            >
              {exercise.name}
            </div>
          ))}
          {/* Display total number of workouts */}
        </div>
      </div>
      <div className="mt-[32%] text-gray-500 fixed">Total Workouts: {filteredExercises.length}</div>
      {/* Right column: Workout details */}
      <div className="w-[80%] ml-[30%] mb-2 min-w-96">
        {selectedWorkout && (
          <div className="mb-8 rounded-lg border border-black overflow-visible relative mt-auto flex flex-1 flex-col bg-white">
            <div className={`mx-auto w-full px-6 rounded-t-lg bg-indigo-950 flex justify-between items-center`}>
              <h2 className="text-xl font-bold tracking-tight text-white sm:text-4xl py-2">{selectedWorkout.name}</h2>
            </div>
            <div className="flex flex-row justify-center gap-4 pt-2">
              {/* Render exercise images */}
              {selectedWorkout.image.map((img, imgIndex) => (
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
                {selectedWorkout.instructions.map((instruction, instructionIndex) => (
                  <li key={instructionIndex} className="mb-2">{instruction}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchWorkout;
