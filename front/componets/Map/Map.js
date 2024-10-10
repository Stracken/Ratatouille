"use client"
import { useState, useEffect } from 'react';
import "leaflet/dist/leaflet.css";

function Map() {
    const [dimensions, setDimensions] = useState({ width: '80%', height: '2000px' });

    useEffect(() => {
        function handleResize() {
            setDimensions({
                width: `${window.innerWidth}px`,
                height: `${window.innerHeight * 0.9}px` // 60% de la hauteur de l'écran
            });
        }

        window.addEventListener('resize', handleResize);
        handleResize(); // Appel initial pour définir les dimensions

        return () => window.removeEventListener('resize', handleResize);
    }, []);

  return (
    <iframe
      className="Map"
      src="https://umap.openstreetmap.fr/fr/map/projet_1075295"
      title="Carte sans nom"
      style={{
        width: dimensions.width,
        height: dimensions.height,
        border: 'none' 
    }}
    />
  );
}

export default Map;
