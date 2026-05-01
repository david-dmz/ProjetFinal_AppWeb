import { useState, useEffect } from "react";
import { fetchDrivers, type Driver } from "../API/openF1";
import "./DriverList.css"; // <-- Importation de ton fichier CSS séparé

export const DriverList = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  // 1. On charge les favoris depuis le localStorage au démarrage
  const [favorites, setFavorites] = useState<Driver[]>(() => {
    const saved = localStorage.getItem("f1_favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // 2. Fonction pour ajouter ou retirer un favori
  const toggleFavorite = (driverToToggle: Driver) => {
    let updatedFavorites;

    // On vérifie si le pilote est déjà dans les favoris
    const isFavorite = favorites.some(
      (fav) => fav.driver_number === driverToToggle.driver_number,
    );

    if (isFavorite) {
      updatedFavorites = favorites.filter(
        (fav) => fav.driver_number !== driverToToggle.driver_number,
      );
    } else {
      updatedFavorites = [...favorites, driverToToggle];
    }

    // On met à jour l'état React ET le localStorage du navigateur
    setFavorites(updatedFavorites);
    localStorage.setItem("f1_favorites", JSON.stringify(updatedFavorites));
  };
  useEffect(() => {
    const loadDrivers = async () => {
      const driversData = await fetchDrivers();
      setDrivers(driversData);
      setLoading(false);
    };

    loadDrivers();
  }, []);

  const filteredDrivers = drivers.filter((driver) =>
    driver.full_name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const closeModal = () => {
    setSelectedDriver(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-6">
          Grille des Pilotes
        </h2>

        <input
          type="text"
          placeholder="Rechercher un pilote (ex: Leclerc)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-white border border-gray-300 text-gray-900 text-base rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full max-w-md mx-auto p-4 shadow-sm transition-all duration-300"
        />
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredDrivers.map((driver) => (
          <li
            key={driver.driver_number}
            onClick={() => setSelectedDriver(driver)}
            className="group bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
          >
            {/* Ligne de couleur de l'écurie */}
            <div
              className="h-3 w-full"
              style={{ backgroundColor: `#${driver.team_colour}` }}
            ></div>

            <div className="flex flex-col items-center p-6 flex-grow">
              <img
                className="w-28 h-28 mb-4 rounded-full shadow-lg object-cover border-4 border-white group-hover:scale-105 transition-transform duration-300"
                src={
                  driver.headshot_url ||
                  "https://placehold.co/200x200?text=No+Image"
                }
                alt={driver.full_name}
              />
              <h5 className="text-xl font-bold text-gray-900 mb-1 text-center">
                {driver.full_name}
              </h5>
              <span className="text-sm font-semibold text-gray-400 mb-1">
                #{driver.driver_number}
              </span>
              <span className="text-sm font-medium text-gray-600 mb-6 text-center">
                {driver.team_name}
              </span>

              {/* Le bouton change de style et de texte si le pilote est déjà favori */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(driver);
                }}
                className={`mt-auto w-full inline-flex justify-center items-center px-4 py-2.5 text-sm font-bold text-white rounded-lg focus:ring-4 focus:outline-none transition-colors ${
                  favorites.some(
                    (fav) => fav.driver_number === driver.driver_number,
                  )
                    ? "bg-red-600 hover:bg-red-700 focus:ring-red-300" // Style "Retirer"
                    : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-300" // Style "Ajouter"
                }`}
              >
                {favorites.some(
                  (fav) => fav.driver_number === driver.driver_number,
                )
                  ? "Retirer des Favoris"
                  : "Ajouter aux Favoris"}
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* --- LA MODALE --- */}
      {selectedDriver && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 md:p-8 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Bouton de fermeture en haut à droite */}
            <button
              className="absolute top-5 right-5 text-gray-400 bg-gray-100 hover:bg-gray-200 hover:text-gray-900 rounded-full w-10 h-10 flex justify-center items-center transition-colors z-10 font-bold text-lg"
              onClick={closeModal}
            >
              ✕
            </button>

            {/* En-tête de la modale */}
            <div className="text-3xl font-black text-gray-900 mb-6 border-b border-gray-100 pb-4 pr-8">
              {selectedDriver.full_name}
            </div>

            {/* Corps de la modale */}
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <img
                src={
                  selectedDriver.headshot_url ||
                  "https://placehold.co/300x300?text=No+Image"
                }
                alt={selectedDriver.full_name}
                className="w-52 h-52 md:w-64 md:h-64 object-contain rounded-2xl shadow-inner flex-shrink-0"
                style={{
                  backgroundColor: "#f8fafc",
                  borderBottom: `8px solid #${selectedDriver.team_colour}`,
                  backgroundImage: `linear-gradient(to top, #${selectedDriver.team_colour}30, transparent)`,
                  filter: "drop-shadow(0 15px 15px rgba(0,0,0,0.2))",
                  imageRendering: "crisp-edges",
                }}
              />

              {/* Informations du pilote */}
              <div className="flex-1 w-full bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-4">
                <p className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <strong className="text-gray-500 uppercase text-xs tracking-wider">
                    Acronyme
                  </strong>
                  <span className="text-lg font-bold text-gray-900">
                    {selectedDriver.name_acronym}
                  </span>
                </p>
                <p className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <strong className="text-gray-500 uppercase text-xs tracking-wider">
                    Numéro
                  </strong>
                  <span className="text-lg font-bold text-blue-600">
                    #{selectedDriver.driver_number}
                  </span>
                </p>
                <p className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <strong className="text-gray-500 uppercase text-xs tracking-wider">
                    Écurie
                  </strong>
                  <span className="text-lg font-bold text-gray-900">
                    {selectedDriver.team_name}
                  </span>
                </p>
                <p className="flex justify-between items-center mb-6">
                  <strong className="text-gray-500 uppercase text-xs tracking-wider">
                    Pays
                  </strong>
                  <span className="text-lg font-bold text-gray-900">
                    {selectedDriver.country_code}
                  </span>
                </p>

                {/* Bouton d'ajout aux favoris dans la modale */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(selectedDriver); // On passe 'selectedDriver' à la fonction
                  }}
                  className={`w-full inline-flex justify-center items-center px-4 py-3 text-base font-bold text-white rounded-xl focus:ring-4 focus:outline-none transition-transform active:scale-95 ${
                    favorites.some(
                      (fav) =>
                        fav.driver_number === selectedDriver.driver_number,
                    )
                      ? "bg-red-600 hover:bg-red-700 focus:ring-red-300" // Si déjà en favori -> Rouge
                      : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-300" // Sinon -> Bleu
                  }`}
                >
                  {favorites.some(
                    (fav) => fav.driver_number === selectedDriver.driver_number,
                  )
                    ? " Retirer des Favoris"
                    : " Ajouter aux Favoris"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
