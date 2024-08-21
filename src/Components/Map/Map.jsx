import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, LayersControl, useMap } from "react-leaflet";
import AreaSelector from "../LocationSelector/LocationSelector";
import CategoryButton from "../CategoryButton/CategoryButton";
import LayerGroupComponent from "../LayerGroupComponent/LayerGroupComponent";
import Legend from "../Legend/Legend";
import MiniMapControl from "../MiniMapControl/MiniMapControl";
import "leaflet/dist/leaflet.css";
import { BASE_URL } from "../../Config/GeoServer";

const ChangeMapCenter = ({ center }) => {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
};

const { BaseLayer, Overlay } = LayersControl;

const Map = () => {
  const [selectedArea, setSelectedArea] = useState("Picuí");
  const [loading, setLoading] = useState(true);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [subareasData, setSubareasData] = useState(null);
  const [lotesData, setLotesData] = useState(null);
  const [currentStyle, setCurrentStyle] = useState("");

  const mapCenters = {
    Picuí: [-3.7575913063640405, -38.66027599854278],
    Cauípe: [-3.5896708562393003, -38.782047598763214],
  };

  const mapUrls = {
    OSM: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    "Carto Positron":
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    "ESRI World":
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    "GeoServer WMS": `${BASE_URL}geoserver/wms`,
  };

  const fetchGeoJsonData = async (typeName) => {
    try {
      const response = await fetch(`${BASE_URL}geoserver/wfs`, {
        method: "POST",
        body: new URLSearchParams({
          service: "WFS",
          version: "1.0.0",
          request: "GetFeature",
          typeName: typeName,
          outputFormat: "application/json",
        }),
      });
      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${typeName} GeoJSON data:`, error);
      return null;
    }
  };

  useEffect(() => {
    setLoading(true);

    const fetchAllData = async () => {
      const quadrasData = await fetchGeoJsonData("cite:quadras");
      const subareasData = await fetchGeoJsonData("cite:subareas");
      const lotesData = await fetchGeoJsonData("cite:lotes");

      setGeoJsonData(quadrasData);
      setSubareasData(subareasData);
      setLotesData(lotesData);
      setLoading(false);
    };

    fetchAllData();
  }, []);

  const handleChangeArea = (event) => {
    setSelectedArea(event.target.value);
  };

  const handleStyleChange = (style) => {
    setCurrentStyle(style);
  };

  const legendUrl = currentStyle
    ? `${BASE_URL}geoserver/wms?service=WMS&version=1.1.0&request=GetLegendGraphic&layer=cite:lotes&style=${currentStyle}&format=image/png`
    : `${BASE_URL}geoserver/wms?service=WMS&version=1.1.0&request=GetLegendGraphic&layer=cite:lotes&format=image/png`;

  return (
    <>
      <main className="main">
        <MapContainer
          center={mapCenters[selectedArea]}
          zoom={16}
          style={{ height: "100%", width: "100%" }}
        >
          <CategoryButton onStyleChange={handleStyleChange} />
          <LayersControl position="topright">
            <BaseLayer checked name="OpenStreetMap">
              <TileLayer
                url={mapUrls["OSM"]}
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
            </BaseLayer>
            <BaseLayer name="Carto Positron">
              <TileLayer
                url={mapUrls["Carto Positron"]}
                attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
              />
            </BaseLayer>
            <BaseLayer name="ESRI World">
              <TileLayer
                url={mapUrls["ESRI World"]}
                attribution='&copy; <a href="https://www.esri.com/en-us/home">Esri</a> contributors'
              />
            </BaseLayer>
            <Overlay checked name="Lotes">
              <LayerGroupComponent
                layerName="cite:lotes"
                geoJsonData={lotesData}
                wmsUrl={mapUrls["GeoServer WMS"]}
                styles={currentStyle}
              />
            </Overlay>
            <Overlay name="Quadras">
              <LayerGroupComponent
                layerName="cite:quadras"
                geoJsonData={geoJsonData}
                wmsUrl={mapUrls["GeoServer WMS"]}
                styles={"cite:quadras_estilos"}
              />
            </Overlay>
            <Overlay name="Sub-Áreas">
              <LayerGroupComponent
                layerName="cite:subareas"
                geoJsonData={subareasData}
                wmsUrl={mapUrls["GeoServer WMS"]}
                styles={"cite:subareas_estilos"}
              />
            </Overlay>
          </LayersControl>
          <ChangeMapCenter center={mapCenters[selectedArea]} />
          <AreaSelector
            selectedArea={selectedArea}
            onChange={handleChangeArea}
          />
          <Legend legendUrl={legendUrl} />
          <MiniMapControl />
        </MapContainer>
      </main>
    </>
  );
};

export default Map;
