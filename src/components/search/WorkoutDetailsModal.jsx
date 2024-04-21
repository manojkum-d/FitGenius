import React from 'react';

const WorkoutDetailsModal = ({ workout, onClose }) => {
  // Ensure workout data is available before rendering
  if (!workout) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-gray-800 bg-opacity-50 absolute inset-0"></div>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
        <button className="absolute top-2 right-2 p-2 focus:outline-none" onClick={onClose}>
          Close
        </button>
        <h2 className="text-xl font-bold mb-4">{workout.name}</h2>
        <div>
          {/* Render workout details here */}
          <img src={workout.image} alt={workout.name} className="w-full mb-4" />
          <p>{workout.description}</p>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetailsModal;
