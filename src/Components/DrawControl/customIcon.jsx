// src/Components/DrawControl/customIcon.js
import L from "leaflet";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { library, icon } from "@fortawesome/fontawesome-svg-core";

library.add(faMapMarkerAlt);

const createIcon = (faIcon) => {
  const svgIcon = icon(faIcon).html[0];
  return new L.DivIcon({
    className: "custom-icon",
    html: svgIcon,
    iconSize: [32, 32],
    iconAnchor: [24, 48],
    popupAnchor: [0, 48],
  });
};

const markerIcon = createIcon(faMapMarkerAlt);

export default markerIcon;
