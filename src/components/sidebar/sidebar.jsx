// src/components/Sidebar.jsx
import "./Sidebar.css";

const Sidebar = ({ selectedCountries = [], onValidate }) => {
  const slots = Array(5)
    .fill(null)
    .map((_, i) => selectedCountries[i] || null);

  return (
    <div className="sidebar">
      <div>
        <h2>Classe les pays du plus au moins pollueur</h2>
        <p>Clique ou glisse les pays dans les emplacements ci-dessous.</p>

        <div>
          {slots.map((country, index) => (
            <div
              key={index}
              className={`slot ${country ? "filled" : ""}`}
            >
              <span className="slot-number">#{index + 1}</span>
              <span className="slot-country">{country || "Vide"}</span>
            </div>
          ))}
        </div>
      </div>

      <button
      className={selectedCountries.length !== 5 ? "disabled-button" : "validate-button"}
      onClick={onValidate}
      disabled={selectedCountries.length !== 5}
      >
        Valider
      </button>

    </div>
  );
};

export default Sidebar;
