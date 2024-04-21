import React from 'react';

const ExerciseList = ({ exercises }) => {
  return (
    <div>
      {exercises.map((exercise, index) => (
        <div key={index} className="border border-gray-200 rounded-md p-4 my-2">
          <h3 className="text-lg font-medium">{exercise.name}</h3>
          <p className="text-gray-600">Force: {exercise.force}</p>
          <p className="text-gray-600">Level: {exercise.level}</p>
          <p className="text-gray-600">Mechanic: {exercise.mechanic}</p>
          <p className="text-gray-600">Equipment: {exercise.equipment}</p>
          <div>
            <p className="font-medium">Primary Muscles:</p>
            <ul>
              {exercise.primaryMuscles.map((muscle, index) => (
                <li key={index}>{muscle}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-medium">Secondary Muscles:</p>
            <ul>
              {exercise.secondaryMuscles.map((muscle, index) => (
                <li key={index}>{muscle}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-medium">Instructions:</p>
            <ol>
              {exercise.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
          <p className="text-gray-600">Category: {exercise.category}</p>
          <div>
            <p className="font-medium">Images:</p>
            <div>
              {exercise.image.map((imageUrl, index) => (
                <img key={index} src={imageUrl} alt={`Exercise ${index + 1}`} className="w-32 h-32 mr-2 mb-2 rounded-md" />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExerciseList;
