import { useState, useEffect } from "react";
import { type Driver } from "../../API/openF1";
import "./Favorites.css";

export const Favorites = () => {
  const [favorites, setFavorites] = useState<Driver[]>([]);

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
            
            <li key={driver.driver_number} className="driver-card">
              {/* Le style en ligne (inline) est toujours nécessaire ici car la couleur vient de l'API */}
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
                    onClick={() => removeFavorite(driver.driver_number)}
                    type="button"
                    className="btn-remove"
                  >
                    <svg className="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Retirer
                  </button>
                </div>
                
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};