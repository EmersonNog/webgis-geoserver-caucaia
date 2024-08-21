import React from "react";
import PDFGenerator from "../PDFGenerator/PDFGenerator";

const SelectedRows = ({ selectedRowIds, selectedFlatRows }) => {
  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 8px 5px rgba(0, 0, 0, 0.1)",
        marginTop: "30px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>Cadastro Selecionado</h2>
      <p
        style={{
          marginBottom: "20px",
          marginTop: "0px",
          color: "#666",
          fontSize: "14px",
        }}
      >
        Você pode gerar um PDF com as informações selecionadas clicando no botão
        abaixo.
      </p>
      {/* <pre style={{ backgroundColor: "#eee", padding: "10px", borderRadius: "4px", overflowX: "auto" }}>
        {JSON.stringify(
          {
            selectedRowIds,
            selectedFlatRows: selectedFlatRows.map((row) => row.original),
          },
          null,
          2
        )}
      </pre> */}
      <PDFGenerator
        selectedFlatRows={selectedFlatRows.map((row) => row.original)}
      />
    </div>
  );
};

export default SelectedRows;
