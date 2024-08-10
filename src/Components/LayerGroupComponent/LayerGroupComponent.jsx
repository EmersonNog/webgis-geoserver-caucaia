import React, { useRef, useEffect, useState } from 'react';
import { WMSTileLayer, GeoJSON, LayerGroup } from 'react-leaflet';
import L from 'leaflet';
import './Popup.css';

const LayerGroupComponent = ({
  layerName,
  geoJsonData,
  wmsUrl,
  styles,
  subareasGeoJson,
}) => {
  const geoJsonStyle = {
    color: '#fff',
    weight: 0,
    opacity: 0,
  };

  const [maskLayer, setMaskLayer] = useState(null);
  const wmsLayerRef = useRef();

  useEffect(() => {
    if (subareasGeoJson && wmsLayerRef.current) {
      const mask = L.geoJSON(subareasGeoJson, {
        style: {
          color: '#000',
          weight: 1,
          opacity: 0,
        },
      }).addTo(wmsLayerRef.current._map);

      setMaskLayer(mask);
    }

    return () => {
      if (maskLayer) {
        maskLayer.remove();
      }
    };
  }, [subareasGeoJson]);

  useEffect(() => {
    if (wmsLayerRef.current) {
      wmsLayerRef.current.setParams({ styles });
    }
  }, [styles]);

  const onEachFeature = (feature, layer) => {
    if (layerName === 'cite:lotes') {
      const fachadaHtml = feature.properties.popup_cadastro || '<p>N/A</p>'; // Use 'N/A' if 'popup_fachada' is not available

      layer.bindPopup(
        `<div class="popup-content">
          ${fachadaHtml}
        </div>`
      );

      const loteId = feature.properties.lote_id || 'N/A';
      const ruaLogradouro = feature.properties['rua/logradouro'] || 'N/A';
      const numero = feature.properties.numero || 'N/A';
      const tooltipContent = `<strong>Lote ID:</strong> ${loteId}<br/><strong>Rua/Logradouro:</strong> ${ruaLogradouro}<br/><strong>Número:</strong> ${numero}`;

      if (layer instanceof L.Path) {
        layer.bindTooltip(tooltipContent, {
          direction: 'top',
          permanent: false,
          opacity: 0.8,
          className: 'tooltip-content',
        });
      }
    } else if (layerName === 'cite:quadras') {
      const quadra = feature.properties.quadra || 'N/A';
      const tooltipContent = `${quadra}`;

      if (layer instanceof L.Path) {
        layer.bindTooltip(tooltipContent, {
          direction: 'top',
          permanent: false,
          opacity: 0.8,
          className: 'tooltip-content',
        });
      }
    } else if (layerName === 'cite:subareas') {
      const area = feature.properties.area || 'N/A';
      const tooltipContent = `${area}`;

      if (layer instanceof L.Path) {
        layer.bindTooltip(tooltipContent, {
          direction: 'top',
          permanent: false,
          opacity: 0.8,
          className: 'tooltip-content',
        });
      }
    }
  };

  return (
    <LayerGroup>
      <WMSTileLayer
        ref={wmsLayerRef}
        url={wmsUrl}
        layers={layerName}
        format="image/png"
        transparent={true}
        styles={styles}
      />
      {geoJsonData && (
        <GeoJSON
          data={geoJsonData}
          style={geoJsonStyle}
          onEachFeature={onEachFeature}
        />
      )}
    </LayerGroup>
  );
};

export default LayerGroupComponent;
