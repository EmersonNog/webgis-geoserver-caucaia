import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

const GeoSearch = () => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const geoSearchControl = new GeoSearchControl({
      provider: provider,
      position: "topright",
      style: "button",
      autoClose: true,
      autoComplete: true,
      autoCompleteDelay: 250,
      searchLabel: "Endereço",
      notFoundMessage: "Nenhum lugar encontrado",
    });

    map.addControl(geoSearchControl);

    return () => {
      map.removeControl(geoSearchControl);
    };
  }, [map]);

  return null;
};

export default GeoSearch;
