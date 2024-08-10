import React from 'react';
import './Legend.css';

const Legend = ({ legendUrl }) => {
  return (
    <div className="legend">
      <h4>Legenda</h4>
      <img src={legendUrl} alt="Legenda WMS" style={{ width: '70%' }} />
    </div>
  );
};

export default Legend;
