import React, { useState, useEffect } from 'react';
import './CategoryButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap } from '@fortawesome/free-solid-svg-icons';

const CategoryButton = ({ onStyleChange }) => {
  // Adiciona a prop onStyleChange
  const [showColumns, setShowColumns] = useState(false);
  const [columns, setColumns] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState('identificado'); // Inicializa como 'identificado'

  const columnLabels = {
    identificado: 'Identificado',
    possui_foto: 'Possui Foto',
    cadastrado: 'Cadastrado',
    situação: 'Situação',
    cadastro_basico: 'Cadastro Básico',
    ready_memorial: 'Memorial Pronto',
    cadastro_social_completo: 'Cadastro Social Completo',
    complete_social_ready_memorial: 'Completo e Pronto para Memorial',
  };

  const columnStyles = {
    identificado: 'cite:identificados_estilos',
    possui_foto: 'cite:fotos_estilos',
    cadastrado: 'cite:cadastros_estilos',
    situação: 'cite:situacao_estilos',
    cadastro_basico: 'cite:cadastro_basico_estilos',
    ready_memorial: 'cite:memorial_pronto',
    cadastro_social_completo: 'cite:cadastro_social_completo',
    complete_social_ready_memorial: 'cite:complete_social_ready_memorial',
  };

  const fetchColumns = async () => {
    try {
      const response = await fetch('http://localhost:9090/geoserver/wfs', {
        method: 'POST',
        body: new URLSearchParams({
          service: 'WFS',
          version: '1.0.0',
          request: 'DescribeFeatureType',
          typeName: 'cite:lotes',
          outputFormat: 'application/json',
        }),
      });
      const data = await response.json();
      const desiredColumns = Object.keys(columnLabels);
      const columnNames = data.featureTypes[0].properties
        .map((property) => property.name)
        .filter((name) => desiredColumns.includes(name));
      setColumns(columnNames);
      onStyleChange(columnStyles['identificado'] || '');
    } catch (error) {
      console.error('Erro ao buscar colunas:', error);
    }
  };

  const handleClick = (column) => {
    setSelectedColumn(column);
    setShowColumns(false);
    onStyleChange(columnStyles[column] || '');
  };

  const handleToggle = () => {
    setShowColumns(!showColumns);
    if (!showColumns) {
      fetchColumns();
    }
  };

  useEffect(() => {
    onStyleChange(columnStyles[selectedColumn] || '');
  }, [selectedColumn, onStyleChange]);

  return (
    <div className="category-button">
      <button className="button-icon" onClick={handleToggle}>
        <FontAwesomeIcon icon={faMap} />
      </button>
      {showColumns && (
        <ul className="columns-list">
          {Object.keys(columnLabels).map(
            (column, index) =>
              columns.includes(column) && (
                <li
                  key={index}
                  onClick={() => handleClick(column)}
                  className={selectedColumn === column ? 'selected' : ''}
                >
                  {columnLabels[column]}
                </li>
              )
          )}
        </ul>
      )}
    </div>
  );
};

export default CategoryButton;
