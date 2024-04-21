import React, { useState } from 'react';
import MaleOutline from './MaleOutline';
import FemaleOutline from './FemaleOutline';

const GenderSelector = () => {
  const [selectedGender, setSelectedGender] = useState('Male');

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    margin: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    borderRadius: '5px'
  };

  const activeButtonStyle = {
    backgroundColor: '#3490dc',
    color: '#ffffff',
  };

  const handleClick = (gender) => {
    setSelectedGender(gender);
  };

  return (
    // <div style={{ display: 'flex', flexDirection: 'row-reverse', justifyItems:'flex-start',alignItems:'self-end'}}>
    <>
      <button
        style={{
          ...buttonStyle,
          ...(selectedGender === 'Male' && activeButtonStyle),
        }}
        onClick={() => handleClick('Male')}
      >
        Male
      </button>
      <button
        style={{
          ...buttonStyle,
          ...(selectedGender === 'Female' && activeButtonStyle),
        }}
        onClick={() => handleClick('Female')}
        >
        Female
      </button>

      <div style={{ marginTop: '20px' }}>
        {selectedGender === 'Male' && <MaleOutline />}
        {selectedGender === 'Female' && <FemaleOutline />}
      </div>
      </>
    // </div>
  );
};

export default GenderSelector;
