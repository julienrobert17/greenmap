import { useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import "./Header.css";

const Header = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const elem = document.documentElement;
    if (!isFullscreen) {
      elem.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <header className="header">
      <h1 className="header-title">GreenMap</h1>
      <button
        onClick={toggleFullscreen}
        className="fullscreen-button"
        title={isFullscreen ? "Quitter le plein écran" : "Activer le plein écran"}
      >
        {isFullscreen ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
      </button>
    </header>
  );
};

export default Header;
