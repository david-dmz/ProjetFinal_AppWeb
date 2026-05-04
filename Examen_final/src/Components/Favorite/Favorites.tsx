import { useState, useEffect } from "react";
import { type Driver } from "../../API/openF1";
import { DriverModal } from "../DriversCards/DriverModal"; 
import "./Favorites.css";

export const Favorites = () => {
  const [favorites, setFavorites] = useState<Driver[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("f1_favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const removeFavorite = (driverNumber: number) => {
    const updatedFavorites = favorites.filter((fav) => fav.driver_number !== driverNumber);
    setFavorites(updatedFavorites);
    localStorage.setItem("f1_favorites", JSON.stringify(updatedFavorites));
    
    // Fermer la modale si on supprime le pilote actuellement affiché
    if (selectedDriver?.driver_number === driverNumber) {
      setSelectedDriver(null);
    }
  };

  return (
    <div className="favorites-container">
      <div className="header-section">
        <h2 className="title-main">
          Mon Écurie <span className="title-highlight">(Favoris)</span>
        </h2>
        <p className="subtitle">
          Gérez votre sélection personnelle de pilotes pour votre tableau de bord.
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-state">
          Vous n'avez encore aucun pilote dans vos favoris.
        </div>
      ) : (
        <ul className="driver-grid">
          {favorites.map((driver) => (
            <li 
              key={driver.driver_number} 
              className="driver-card"
              onClick={() => setSelectedDriver(driver)} 
              style={{ cursor: 'pointer' }}
            >
              <div className="h-3 w-full" style={{ backgroundColor: `#${driver.team_colour}` }}></div>
              
              <div className="driver-info-container">
                <img 
                  className="driver-avatar" 
                  src={driver.headshot_url || 'https://placehold.co/200x200?text=No+Image'} 
                  alt={driver.full_name} 
                />
                
                <h5 className="driver-name">{driver.full_name}</h5>
                <span className="driver-team">{driver.team_name}</span>
                
                <div className="mt-auto w-full">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation(); 
                      removeFavorite(driver.driver_number);
                    }}
                    type="button"
                    className="btn-remove"
                  >
                    Retirer
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* 4. Affichage conditionnel de la modale */}
      <DriverModal
        driver={selectedDriver}
        isFav={true} 
        onClose={() => setSelectedDriver(null)}
        onToggleFavorite={(d) => removeFavorite(d.driver_number)}
      />
    </div>
  );
};