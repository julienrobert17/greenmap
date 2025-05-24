import { useEffect, useState } from "react";
import MapComponent from "./components/mapComponent/mapComponent";
import Sidebar from "./components/sidebar/sidebar";
import Header from "./components/header/header";
import questions from "./assets/questions";
import data from "./data/map_data_by_entity.json";
import "./App.css";

function App() {
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [step, setStep] = useState("quiz");

  useEffect(() => {
  const q = questions[Math.floor(Math.random() * questions.length)];
  setQuestion(q);

  const candidates = Object.entries(data).filter(([_, d]) =>
    d[q.key] != null &&
    d.Code &&
    !["NaN", "NAN", "nan"].includes(d.Code)
  );

  const selected = candidates
    .sort(() => Math.random() - 0.5)
    .slice(0, 5)
    .map(([name, d]) => ({
      name,
      value: d[q.key],
      code: d.Code,
      alpha2: d.Code_alpha2?.toLowerCase(),
    }));

  setOptions(selected);
}, []);

  const handleCountryClick = (countryName) => {
    if (!selectedOrder.includes(countryName) && selectedOrder.length < 5) {
      setSelectedOrder([...selectedOrder, countryName]);
    }
  };

  const handleValidate = (userOrder) => {
    setSelectedOrder(userOrder);            
    setShowResult(true);                    
    setStep("map");                         
  };


  const correctOrder = [...options].sort((a, b) => b.value - a.value).map(c => c.name);

  return (
    <div className="App">
      <Header />
      <div className="homeBody">
        <Sidebar
          question={question}
          countries={options}
          selectedCountries={selectedOrder}
          correctOrder={showResult ? correctOrder : null}
          onValidate={handleValidate}
        />
        <div className="MapContainer">
          <MapComponent
            selectedCountries={selectedOrder}
            onCountryClick={handleCountryClick}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
