import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  FeatureGroup,
  useMap,
} from "react-leaflet";
import GeoSearch from "../GeoSearch/GeoSearch";
import AreaSelector from "../LocationSelector/LocationSelector";
import CategoryButton from "../CategoryButton/CategoryButton";
import LayerGroupComponent from "../LayerGroupComponent/LayerGroupComponent";
import Legend from "../Legend/Legend";
import MiniMapControl from "../MiniMapControl/MiniMapControl";
import DrawControl from "../DrawControl/DrawControl";
import { BASE_URL } from "../../Config/GeoServer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet/dist/leaflet.css";
import "./Map.css";

const { BaseLayer, Overlay } = LayersControl;

const MapCenterController = ({ selectedArea, mapCenters }) => {
  const map = useMap();
  const [lastSelectedArea, setLastSelectedArea] = useState(selectedArea);

  useEffect(() => {
    if (map && lastSelectedArea !== selectedArea) {
      map.setView(mapCenters[selectedArea], map.getZoom());
      setLastSelectedArea(selectedArea);
    }
  }, [selectedArea, map, mapCenters, lastSelectedArea]);

  return null;
};

const Map = () => {
  const [selectedArea, setSelectedArea] = useState("Picuí");
  const [loading, setLoading] = useState(true);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [subareasData, setSubareasData] = useState(null);
  const [lotesData, setLotesData] = useState(null);
  const [currentStyle, setCurrentStyle] = useState("");
  const [drawnLayers, setDrawnLayers] = useState([]);

  const mapCenters = {
    Picuí: [-3.7575913063640405, -38.66027599854278],
    Cauípe: [-3.5896708562393003, -38.782047598763214],
  };

  const handleCreated = (e) => {
    const layer = e.layer;
    // Adicione a camada desenhada à lista de camadas, mas não mude o centramento
    setDrawnLayers((prevLayers) => [...prevLayers, layer]);
  };

  const handleDeleted = (e) => {
    const { layers } = e;

    const remainingLayers = drawnLayers.filter((layer) => {
      return !Object.values(layers._layers).some(
        (deletedLayer) => deletedLayer === layer
      );
    });

    setDrawnLayers(remainingLayers);
  };

  const circleToPolygon = (circleLayer, numPoints = 64) => {
    const latLng = circleLayer.getLatLng();
    const radius = circleLayer.getRadius();
    const latlngs = [];

    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * 2 * Math.PI;
      const lat = latLng.lat + (radius / 111320) * Math.sin(angle);
      const lng =
        latLng.lng +
        (radius / (111320 * Math.cos((Math.PI / 180) * latLng.lat))) *
          Math.cos(angle);
      latlngs.push([lng, lat]);
    }

    latlngs.push(latlngs[0]);

    return {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [latlngs],
      },
      properties: {},
    };
  };

  const handleSave = () => {
    if (drawnLayers.length === 0) {
      toast.error("Nenhuma feição desenhada para salvar");
      return;
    }

    const geoJsonFeatures = drawnLayers
      .map((layer) => {
        if (layer && typeof layer.toGeoJSON === "function") {
          if (layer instanceof L.Circle) {
            const polygon = circleToPolygon(layer);
            return polygon;
          } else {
            return layer.toGeoJSON();
          }
        } else {
          console.error("Layer is not valid:", layer);
          return null;
        }
      })
      .filter((feature) => feature !== null);

    const geoJson = {
      type: "FeatureCollection",
      features: geoJsonFeatures,
    };

    const blob = new Blob([JSON.stringify(geoJson)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "drawn_features.geojson";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success("Feições desenhadas salvas");
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
          <MapCenterController
            selectedArea={selectedArea}
            mapCenters={mapCenters}
          />
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
          <AreaSelector
            selectedArea={selectedArea}
            onChange={handleChangeArea}
          />
          <Legend legendUrl={legendUrl} />
          <MiniMapControl />
          <GeoSearch />
          <FeatureGroup>
            <DrawControl onCreated={handleCreated} onDeleted={handleDeleted} />
          </FeatureGroup>
          <button onClick={handleSave} className="save-geom">
            <FontAwesomeIcon icon={faDownload} />
          </button>
          <ToastContainer />
        </MapContainer>
      </main>
    </>
  );
};

export default Map;
