import React, { useState } from 'react';
import exercisesData from '../../../updated_json_file1.json'

const WorkoutDirectory = ({ exercisesData }) => {
  const [filters, setFilters] = useState({
    force: null,
    level: null,
    equipment: null,
  });

  const filterExercises = (force, level, equipment) => {
    // Check if exercisesData is available and is an array
    if (!exercisesData || !Array.isArray(exercisesData)) {
      console.error('Invalid exercises data:', exercisesData);
      return [];
    }

    // Filter the exercises based on the provided criteria
    const filteredExercises = exercisesData.filter(exercise => {
      // Check if the exercise matches the criteria
      const forceMatch = !force || exercise.force === force;
      const levelMatch = !level || exercise.level === level;
      const equipmentMatch = !equipment || exercise.equipment === equipment;

      // Return true if all criteria match, false otherwise
      return forceMatch && levelMatch && equipmentMatch;
    });

    return filteredExercises;
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const filteredExercises = filterExercises(filters.force, filters.level, filters.equipment);

  return (
    <div>
      <section
        aria-labelledby="filter-heading"
        className="grid items-center border-b border border-gray-200 rounded-md"
        data-headlessui-state="open"
      >
        <h2 id="filter-heading" className="sr-only">
          Filters
        </h2>
        {/* Render filter controls here */}
      </section>

      <div>
        {/* Render the filtered exercises here */}
        {filteredExercises.map(exercise => (
          <div key={exercise.name}>
            <h3>{exercise.name}</h3>
            {/* Render other exercise details */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutDirectory;
