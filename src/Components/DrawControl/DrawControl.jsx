import React, { useEffect } from "react";
import { FeatureGroup, useMap } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet/dist/leaflet.css";
import markerIcon from "./customIcon";
import "./DrawControl.css";

const DrawControl = ({ onCreated, onDeleted }) => {
  const map = useMap();

  useEffect(() => {
    const updateTooltip = (layer) => {
      let area;

      if (layer instanceof L.Polygon) {
        area = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]) / 10000;
      } else if (layer instanceof L.Circle) {
        const radius = layer.getRadius();
        area = (Math.PI * Math.pow(radius, 2)) / 10000;
      }

      if (area !== undefined) {
        layer.bindTooltip(`Área: ${area.toFixed(2)} ha`).openTooltip();
      }
    };

    const handleDrawCreated = (e) => {
      const layer = e.layer;
      onCreated(layer);
      if (layer instanceof L.Polygon || layer instanceof L.Circle) {
        updateTooltip(layer);
      }
    };

    const handleDrawEdited = (e) => {
      e.layers.eachLayer((layer) => {
        if (layer instanceof L.Polygon || layer instanceof L.Circle) {
          updateTooltip(layer);
        }
      });
    };

    map.on("draw:created", handleDrawCreated);
    map.on("draw:edited", handleDrawEdited);

    return () => {
      map.off("draw:created", handleDrawCreated);
      map.off("draw:edited", handleDrawEdited);
    };
  }, [map, onCreated]);

  return (
    <FeatureGroup>
      <EditControl
        position="topright"
        onCreated={onCreated}
        onDeleted={onDeleted}
        draw={{
          polygon: {
            shapeOptions: {
              color: "#FF0000",
              fillColor: "#FF0000",
            },
          },
          polyline: {
            shapeOptions: {
              color: "#FF0000",
              fillColor: "#FF0000",
            },
          },
          circle: {
            shapeOptions: {
              color: "#FF0000",
              fillColor: "#FF0000",
            },
          },
          marker: {
            icon: markerIcon,
            repeatMode: true,
          },
          circlemarker: false,
          rectangle: false,
        }}
      />
    </FeatureGroup>
  );
};

export default DrawControl;
