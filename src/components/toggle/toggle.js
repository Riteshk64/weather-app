import React from "react";
import "./toggle.css";

const Toggle = ({ isChecked, handleCheckboxChange }) => {
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
