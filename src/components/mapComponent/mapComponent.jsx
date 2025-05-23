// src/components/MapComponent.jsx
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { useState } from "react";
import "./mapComponent.css"; // <-- Import CSS

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const MapComponent = ({ onCountryClick, selectedCountries = [] }) => {
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [center, setCenter] = useState([0, 0]);

  const getCountryName = (geo) => geo.properties.name || geo.properties.NAME;

  const getFillColor = (geo) => {
    const name = getCountryName(geo);
    if (selectedCountries.includes(name)) return "#22c55e"; // vert si sélectionné
    if (name === hoveredCountry) return "#60a5fa"; // bleu clair au survol
    return "#e5e7eb"; // gris clair par défaut
  };

  /*const handleMoveEnd = ({ coordinates }) => {
    const clamp = (value, min, max) => Math.max(min, Math.min(value, max));
    const [lon, lat] = coordinates;
    const clampedLon = clamp(lon, -120, 120); // limite horizontale
    const clampedLat = clamp(lat, -50, 60);   // limite verticale
    setCenter([clampedLon, clampedLat]);
  };*/

  return (
    <div className="map-container">
      <ComposableMap projection="geoMercator">
        <ZoomableGroup
          zoom={0.85}
          minZoom={0.85}  // 👈 Pas plus petit
          maxZoom={4}  // 👈 Pas plus grand
          center={center}
          //onMoveEnd={handleMoveEnd}
          enableZoom={true} // molette et pinch désactivés
          enablePan={true}   // drag toujours actif
        >
        <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const name = getCountryName(geo);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => setHoveredCountry(name)}
                    onMouseLeave={() => setHoveredCountry(null)}
                    onClick={() => {
                      if (onCountryClick) onCountryClick(name);
                    }}
                    style={{
                      default: {
                        fill: getFillColor(geo),
                        stroke: "#4b5563",
                        strokeWidth: 0.5,
                        outline: "none",
                        cursor: "pointer",
                      },
                      hover: {
                        fill: "#60a5fa",
                        outline: "none",
                      },
                      pressed: {
                        fill: "#3b82f6",
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default MapComponent;
