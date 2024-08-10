import React, { useState, useEffect } from 'react';

const AttributesTable = () => {
  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9090/geoserver/wfs', {
      method: 'POST',
      body: new URLSearchParams({
        service: 'WFS',
        version: '1.0.0',
        request: 'GetFeature',
        typeName: 'cite:lotes',
        outputFormat: 'application/json',
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const features = data.features;
        if (features.length > 0) {
          const attributesArray = features.map((feature) => feature.properties);
          setAttributes(attributesArray);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <table border="1">
      <thead>
        <tr>
          {attributes.length > 0 &&
            Object.keys(attributes[0]).map((key) => <th key={key}>{key}</th>)}
        </tr>
      </thead>
      <tbody>
        {attributes.map((attr, index) => (
          <tr key={index}>
            {Object.values(attr).map((value, idx) => (
              <td key={idx}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AttributesTable;
