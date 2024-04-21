import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import exercisesData from '../../../updated_json_file1.json';

const CardioWorkouts = () => {
  const [userAge, setUserAge] = useState('');
  const [userWeight, setUserWeight] = useState('');
  const [userHeight, setUserHeight] = useState('');
  const [userGender, setUserGender] = useState('');
  const [userBloodPressure, setUserBloodPressure] = useState('');
  const [userPulseRate, setUserPulseRate] = useState('');
  const [userInjury, setUserInjury] = useState('');
  const [recommendedExercises, setRecommendedExercises] = useState([]);
  const [bmiResult, setBmiResult] = useState('');
  const [bmiCategory, setBmiCategory] = useState('');

  const calculateBMI = (cm, kg) => {
    if (!cm || !kg || cm <= 0 || kg <= 0) {
      toast.error('Please enter valid height and weight.');
      return;
    }

    const meter = cm / 100;
    const bmi = kg / (meter * meter);
    setBmiResult(bmi.toFixed(1));

    if (bmi < 18.5) {
      setBmiCategory('Underweight');
      toast("You are Underweight");
      <ToastContainer/>
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      setBmiCategory('Normal Weight');
      toast("You are Normal Weight");
      <ToastContainer/>
    } else if (bmi >= 25 && bmi <= 29.9) {
      setBmiCategory('Overweight');
      toast("You are Overweight");
      <ToastContainer/>
    } else if (bmi >= 30) {
      setBmiCategory('Obesity');
      toast("You are Obese");
      <ToastContainer/>
    }
  };

  const recommendExercises = () => {
    if (!userHeight || !userWeight || !userBloodPressure || !userPulseRate) {
      toast.error('Please fill out all required fields.');
      return;
    }

    const recommended = [];
    const bmi = calculateBMI(userHeight, userWeight);
    const avoidCardio = parseFloat(userBloodPressure) > 120 || parseFloat(userPulseRate) > 100;

    let filteredExercises = exercisesData.exercises;

    if (userInjury) {
      filteredExercises = filteredExercises.filter(exercise => {
        return (
          !exercise.primaryMuscles.includes(userInjury) &&
          !exercise.secondaryMuscles.includes(userInjury)
        );
      });
    }

    while (recommended.length < 5) {
      const randomIndex = Math.floor(Math.random() * filteredExercises.length);
      const selectedExercise = filteredExercises[randomIndex];

      const isValidExercise =
        (!avoidCardio || selectedExercise.category !== 'cardio') &&
        selectedExercise.level === 'beginner';

      if (isValidExercise) {
        recommended.push(selectedExercise);
      }
    }
    setRecommendedExercises(recommended);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    recommendExercises();
  };

  return (
    <div className="container mx-auto py-10 px-8">
      <h2 className="text-2xl font-bold mb-4">Exercise Recommendation System</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="age" className="block mb-2">Age:</label>
            <input
              type="number"
              id="age"
              value={userAge}
              onChange={(e) => setUserAge(e.target.value)}
              className="border border-gray-400 rounded py-2 px-4 mb-2"
            />
          </div>
          <div>
            <label htmlFor="weight" className="block mb-2">Weight (kg):</label>
            <input
              type="number"
              id="weight"
              value={userWeight}
              onChange={(e) => setUserWeight(e.target.value)}
              className="border border-gray-400 rounded py-2 px-4 mb-2"
            />
          </div>
          <div>
            <label htmlFor="height" className="block mb-2">Height (cm):</label>
            <input
              type="number"
              id="height"
              value={userHeight}
              onChange={(e) => setUserHeight(e.target.value)}
              className="border border-gray-400 rounded py-2 px-4 mb-2"
            />
          </div>
          <div>
            <label htmlFor="gender" className="block mb-2">Gender:</label>
            <select
              id="gender"
              value={userGender}
              onChange={(e) => setUserGender(e.target.value)}
              className="border border-gray-400 rounded py-2 px-4 mb-2"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label htmlFor="bloodPressure" className="block mb-2">Blood Pressure:</label>
            <input
              type="number"
              id="bloodPressure"
              value={userBloodPressure}
              onChange={(e) => setUserBloodPressure(e.target.value)}
              className="border border-gray-400 rounded py-2 px-4 mb-2"
            />
          </div>
          <div>
            <label htmlFor="pulseRate" className="block mb-2">Pulse Rate:</label>
            <input
              type="number"
              id="pulseRate"
              value={userPulseRate}
              onChange={(e) => setUserPulseRate(e.target.value)}
              className="border border-gray-400 rounded py-2 px-4 mb-2"
            />
          </div>
          <div>
            <label htmlFor="injury" className="block mb-2">Injury:</label>
            <select
              id="injury"
              value={userInjury}
              onChange={(e) => setUserInjury(e.target.value)}
              className="border border-gray-400 rounded py-2 px-4 mb-2"
            >
              <option value="">None</option>
              <option value="leg">Leg</option>
              <option value="arm">Arm</option>
              <option value="back">Back</option>
              <option value="chest">Chest</option>
              {/* Add more options as needed */}
            </select>
          </div>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Recommend Exercises</button>
      </form>
      <div className="grid grid-cols-1 gap-4">
        {recommendedExercises.map((exercise, index) => (
          <div key={index} className="mb-8 rounded-lg border border-black overflow-visible relative mt-auto flex flex-1 flex-col bg-white">
            <div className={`mx-auto w-full px-6 rounded-t-lg bg-indigo-950 flex justify-between items-center`}>
              <h2 className="text-xl font-bold tracking-tight text-white sm:text-4xl py-2">{exercise.name}</h2>
            </div>
            <div className="absolute top-20 -mx-3 ltr:-left-2 rtl:-right-2 z-10 rounded-full  px-2.5 py-1 text-xs font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mw-blue-900 bg-gradient-to-l  from-mw-green to-mw-green-900 ring-mw-green-800">
              Beginner
            </div>
            <div className="flex flex-row  justify-center gap-4 pt-2">
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
                {exercise.instructions.map((instruction, instructionIndex) => (
                  <li key={instructionIndex} className="mb-2">{instruction}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default CardioWorkouts;
