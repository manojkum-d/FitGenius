import React from 'react';

const SearchedWorkout = ({ selectedExercise }) => {
  return (
    <div className="container mx-auto py-4 px-8">
      {selectedExercise && (
        <>
          <img src={selectedExercise.image[0]} alt="Exercise" className="mb-4" />
          <h2 className="text-xl font-bold mb-2">{selectedExercise.name}</h2>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Description:</h3>
            <ul className="list-disc pl-4">
              {selectedExercise.instructions.map((instruction, index) => (
                <li key={index} className="mb-2">{instruction}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchedWorkout;
