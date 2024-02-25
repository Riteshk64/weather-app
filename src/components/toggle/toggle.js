import React, { useState } from "react";
import "./toggle.css";

const Toggle = ({ changeUnits }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked((prevIsChecked) => {
      const newValue = !prevIsChecked;
      changeUnits(newValue ? "imperial" : "metric");
      return newValue;
    });
  };

  return (
    <div className="units-toggle">
      <p>Metric</p>
      <label className="switch">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span className="slider" />
      </label>
      <p>Imperial</p>
    </div>
  );
};

export default Toggle;
