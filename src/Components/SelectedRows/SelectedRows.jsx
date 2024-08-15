import React from 'react';

const SelectedRows = ({ selectedRowIds, selectedFlatRows }) => (
  <div>
    <h2>Linhas Selecionadas:</h2>
    <pre>
      {JSON.stringify(
        {
          selectedRowIds,
          selectedFlatRows: selectedFlatRows.map((row) => row.original),
        },
        null,
        2
      )}
    </pre>
  </div>
);

export default SelectedRows;
