import React from 'react';
import './LocationSelector.css';

const AreaSelector = ({ selectedArea, onChange }) => {
  return (
    <div className="area-selector">
      <div>Área</div>
      <label htmlFor="picui">
        <input
          id="picui"
          type="radio"
          name="area"
          value="Picuí"
          checked={selectedArea === 'Picuí'}
          onChange={onChange}
          className="location-text"
        />
        Picuí
      </label>
      <br />
      <label htmlFor="cauipe">
        <input
          id="cauipe"
          type="radio"
          name="area"
          value="Cauípe"
          checked={selectedArea === 'Cauípe'}
          onChange={onChange}
        />
        Cauípe
      </label>
    </div>
  );
};

export default AreaSelector;
