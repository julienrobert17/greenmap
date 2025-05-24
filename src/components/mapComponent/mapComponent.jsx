// src/components/MapComponent.jsx
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { useState } from "react";
import "./MapComponent.css";

const geoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const MapComponent = ({ onCountryClick, selectedCountries = [], step }) => {
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [center, setCenter] = useState([0, 0]);

  const getCountryName = (geo) =>
    geo.properties.name || geo.properties.NAME;

  const getFillColor = (geo) => {
    const name = getCountryName(geo);
    if (selectedCountries.includes(name)) return "#22c55e"; // vert si déjà placé
    if (step === 2 && name === hoveredCountry) return "#60a5fa"; // survol uniquement à l'étape 2
    return "#e5e7eb"; // gris par défaut
  };

  const handleClick = (geo) => {
    const name = getCountryName(geo);
    if (step === 2 && onCountryClick && !selectedCountries.includes(name)) {
      onCountryClick(name);
    }
  };

  const handleMoveEnd = ({ coordinates }) => {
    const clamp = (val, min, max) => Math.max(min, Math.min(val, max));
    const [lon, lat] = coordinates;
    setCenter([clamp(lon, -120, 120), clamp(lat, -50, 60)]);
  };

  return (
    <div className="map-container">
      <ComposableMap projection="geoMercator">
        <ZoomableGroup
          center={center}
          zoom={0.85}
          minZoom={0.85}
          maxZoom={4}
          enableZoom={true}
          enablePan={true}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const name = getCountryName(geo);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() =>
                      step === 2 ? setHoveredCountry(name) : null
                    }
                    onMouseLeave={() => setHoveredCountry(null)}
                    onClick={() => handleClick(geo)}
                    style={{
                      default: {
                        fill: getFillColor(geo),
                        stroke: "#4b5563",
                        strokeWidth: 0.5,
                        outline: "none",
                        cursor: step === 2 ? "pointer" : "default",
                      },
                      hover: {
                        fill: step === 2 ? "#60a5fa" : getFillColor(geo),
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
