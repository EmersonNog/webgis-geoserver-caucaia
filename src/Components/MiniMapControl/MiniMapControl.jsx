// MiniMapControl.js
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-minimap/dist/Control.MiniMap.min.css";
import "leaflet-minimap";

const MiniMapControl = () => {
  const map = useMap();

  useEffect(() => {
    const minimapLayer = new L.TileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    );

    const minimap = new L.Control.MiniMap(minimapLayer, {
      toggleDisplay: true,
      minimized: false,
      position: "bottomright",
      width: 210,
      height: 180,
    }).addTo(map);

    return () => map.removeControl(minimap);
  }, [map]);

  return null;
};

export default MiniMapControl;
