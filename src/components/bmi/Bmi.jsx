import React, { useState, useEffect } from 'react';
import './BMI.css'; // Import your CSS file


const Bmi = () => {
  const [cmValue, setCmValue] = useState(182);
  const [kgValue, setKgValue] = useState(72);
  const [bmiResult, setBmiResult] = useState(0);
  const [bmiCategory, setBmiCategory] = useState('');

  useEffect(() => {
    calculateBmi(cmValue, kgValue);
  }, [cmValue, kgValue]);

  const calculateBmi = (cm, kg) => {
    const meter = cm / 100;
    const bmi = kg / (meter * meter);
    setBmiResult(bmi.toFixed(1));

    if (bmi < 18.5) {
      setBmiCategory('Underweight');
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      setBmiCategory('Normal Weight');
    } else if (bmi >= 25 && bmi <= 29.9) {
      setBmiCategory('Overweight');
    } else if (bmi >= 30) {
      setBmiCategory('Obesity');
    }
  };

  return (
    <div className="bmi-container">
      <div className="bmi-calculator">
        <div className="bmi-title-section">
          <div className="application-title">
            <span className="application-title-first">Your</span>
            <img src="src/assets/images/bmi.png" alt="Bmi Calculator"/>
          </div>
          <span className="application-description">Body Mass Index Calculator</span>
        </div>
        <div className="bmi-control-section">
          <div className="cm-input">
            <img src='src/assets/images/body-mass-index (2).png' className="range-input-icon" alt="cm-icon"/>
            <input type="range" name="cm-range" id="cm-range-input" max="250" value={cmValue} onChange={(e) => setCmValue(e.target.value)} />
            <label htmlFor="cm-range" className="cm-range-title">{cmValue} cm</label>
          </div>
          <div className="kg-input">
            <img src="src/assets/images/bmi (2).png" className="range-input-icon" alt="kg-icon"/>
            <input type="range" name="kg-range" id="kg-range-input" max="250" value={kgValue} onChange={(e) => setKgValue(e.target.value)} />
            <label htmlFor="kg-range" className="kg-range-title">{kgValue} kg</label>
          </div>
        </div>
        <div className="bmi-results-section">
          <div className="bmi-calculated-results">
            <img src="src/assets/images/body-mass-index (1).png" alt="bmi-logo"/>
            <span className="title">{bmiResult}</span>
          </div>
          <div className="bmi-result-message">
            <span className="message">{bmiCategory}</span>
            {/* Update the image source dynamically based on bmiCategory */}
            <img src={`src/assets/icons/${bmiCategory}.svg`} className="message-icon" alt="result-message-icon"/>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bmi;
