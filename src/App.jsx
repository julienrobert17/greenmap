import { useState } from "react";
import MapComponent from "./components/mapComponent/mapComponent";
import Sidebar from "./components/sidebar/sidebar";
import Header from "./components/header/header";
import "./App.css";

function App() {
  const [selected, setSelected] = useState([]);

  const handleCountryClick = (countryName) => {
    if (!selected.includes(countryName) && selected.length < 5) {
      setSelected([...selected, countryName]);
    }
  };

  const handleValidate = () => {
    alert("Classement validé !");
    // Tu peux ajouter la logique de comparaison ici plus tard
  };

  return (
    <div className="App">
      <Header />
      <div className="homeBody">
        <Sidebar selectedCountries={selected} onValidate={handleValidate} />
        <div className="MapContainer">
          <MapComponent selectedCountries={selected} onCountryClick={handleCountryClick} />
        </div>
      </div>
    </div>
  );
}

export default App;
