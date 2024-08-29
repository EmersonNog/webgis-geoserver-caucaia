import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { useMap } from "react-leaflet";
import "bootstrap/dist/css/bootstrap.min.css";
import "./GeoJsonModal.css"; // Certifique-se de que o caminho está correto

const GeoJsonModal = ({ show, onHide }) => {
  const [geoJsonLayer, setGeoJsonLayer] = useState(null);
  const map = useMap();

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const geoJsonData = JSON.parse(reader.result);
          if (geoJsonLayer) {
            map.removeLayer(geoJsonLayer);
          }
          const layer = L.geoJSON(geoJsonData).addTo(map);
          setGeoJsonLayer(layer);
          onHide(); // Fecha o modal após carregar o GeoJSON
        } catch (error) {
          console.error("Error parsing GeoJSON file:", error);
        }
      };
      reader.readAsText(file);
    } else {
      alert("Por favor, selecione um arquivo GeoJSON.");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".geojson,application/json",
  });

  return (
    <Modal show={show} onHide={onHide} centered className="geojson-modal">
      <Modal.Header closeButton>
        <Modal.Title>Importar GeoJSON</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>
            Arraste e solte um arquivo GeoJSON aqui, ou clique para selecionar
            um arquivo.
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GeoJsonModal;
