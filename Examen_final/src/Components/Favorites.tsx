import { useState, useEffect } from "react";
import { type Driver } from "../API/openF1";

export const Favorites = () => {
  const [favorites, setFavorites] = useState<Driver[]>([]);

  // Au chargement de la page, on récupère les données du localStorage
  useEffect(() => {
    const saved = localStorage.getItem("f1_favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  // Fonction pour retirer un pilote directement depuis cette page
  const removeFavorite = (driverNumber: number) => {
    const updatedFavorites = favorites.filter((fav) => fav.driver_number !== driverNumber);
    setFavorites(updatedFavorites);
    localStorage.setItem("f1_favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-6">
          Mon Écurie (Favoris)
        </h2>
        <p className="text-gray-500">Gérez votre sélection personnelle de pilotes.</p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center text-gray-500 mt-20 text-xl">
          Vous n'avez encore aucun pilote dans vos favoris.
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {favorites.map((driver) => (
            <li 
              key={driver.driver_number}
              className="bg-white border border-gray-100 rounded-2xl shadow-md flex flex-col overflow-hidden"
            >
              <div className="h-3 w-full" style={{ backgroundColor: `#${driver.team_colour}` }}></div>
              <div className="flex flex-col items-center p-6 flex-grow">
                <img 
                  className="w-28 h-28 mb-4 rounded-full shadow-lg object-cover border-4 border-white" 
                  src={driver.headshot_url || 'https://placehold.co/200x200?text=No+Image'} 
                  alt={driver.full_name} 
                />
                <h5 className="text-xl font-bold text-gray-900 mb-1 text-center">{driver.full_name}</h5>
                <span className="text-sm font-medium text-gray-600 mb-6 text-center">{driver.team_name}</span>
                
                {/* Le bouton sert uniquement à retirer sur cette page */}
                <button 
                  onClick={() => removeFavorite(driver.driver_number)}
                  className="mt-auto w-full inline-flex justify-center items-center px-4 py-2.5 text-sm font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Retirer des Favoris
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};