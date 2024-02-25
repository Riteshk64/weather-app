import React, { useState } from "react";
import "./toggle.css";

const LocationToggle = ({ isChecked, onChange }) => {
  const [checkedState, setCheckedState] = useState(isChecked);

  const handleToggleChange = () => {
    const newState = !checkedState;
    setCheckedState(newState);
    onChange(newState);
  };

  return (
    <div className="units-toggle location-toggle">
      <p>Use your location:</p>
      <label className="switch">
        <input
          type="checkbox"
          checked={checkedState}
          onChange={handleToggleChange}
        />
        <span className="slider" />
      </label>
    </div>
  );
};

export default LocationToggle;
