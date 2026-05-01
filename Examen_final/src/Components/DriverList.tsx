import { useState, useEffect } from "react";
import { fetchDrivers, type Driver } from "../API/openF1";
import "./DriverList.css";
import { customImages, driverWDC } from "./DriversInfo";

export const DriverList = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState(true);
  
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  // TODO : debug car localStorage ne se met pas à jour correctement
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
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="header-section">
        <h2 className="title-main">Grille des Pilotes</h2>

        <input
          type="text"
          placeholder="Rechercher un pilote (ex: Leclerc)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
      </div>

      <ul className="drivers-grid">
        {filteredDrivers.map((driver) => {
          const isFav = favorites.some(
            (fav) => fav.driver_number === driver.driver_number,
          );

          return (
            <li
              key={driver.driver_number}
              onClick={() => setSelectedDriver(driver)}
              className="driver-card"
            >
              <div
                className="card-color-bar"
                style={{ backgroundColor: `#${driver.team_colour}` }}
              ></div>

              <div className="card-content">
                <img
                  className="card-image"
                  src={
                    customImages[driver.driver_number] ||
                    driver.headshot_url ||
                    "https://placehold.co/200x200?text=No+Image"
                  }
                  alt={driver.full_name}
                />
                <h5 className="card-name">{driver.full_name}</h5>
                <span className="card-number">#{driver.driver_number}</span>
                <span className="card-team">{driver.team_name}</span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(driver);
                  }}
                  className={`btn-favorite ${isFav ? "btn-favorite-remove" : "btn-favorite-add"}`}
                >
                  {isFav ? "Retirer des Favoris" : " Ajouter aux Favoris"}
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {/* --- LA MODALE --- */}
      {selectedDriver && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>
              ✕
            </button>

            <div className="modal-header">{selectedDriver.full_name}</div>

            <div className="modal-body">
              {/* Conteneur de l'image */}
              <div
                className="modal-image-container"
                style={{
                  borderBottom: `8px solid #${selectedDriver.team_colour}`,
                  backgroundImage: `linear-gradient(to top, #${selectedDriver.team_colour}30, transparent)`,
                }}
              >
                <img
                  src={
                    customImages[selectedDriver.driver_number] ||
                    selectedDriver.headshot_url ||
                    "https://placehold.co/300x300?text=No+Image"
                  }
                  alt={selectedDriver.full_name}
                  className="modal-image"
                />
              </div>

              {/* Informations du pilote */}
              <div className="modal-details-container">
                <p className="modal-detail-row">
                  <strong className="modal-detail-label">Acronyme</strong>
                  <span className="modal-detail-value">
                    {selectedDriver.name_acronym}
                  </span>
                </p>
                <p className="modal-detail-row">
                  <strong className="modal-detail-label">Numéro</strong>
                  <span className="modal-detail-value-blue">
                    #{selectedDriver.driver_number}
                  </span>
                </p>
                <p className="modal-detail-row">
                  <strong className="modal-detail-label">Championnats gagnés (WDC)</strong> 
                  <span className="modal-detail-value font-black text-yellow-500">
                    {driverWDC[selectedDriver.driver_number] ? `${driverWDC[selectedDriver.driver_number]}` : "0"}
                  </span>
                </p>
                <p className="modal-detail-row">
                  <strong className="modal-detail-label">Écurie</strong>
                  <span className="modal-detail-value">
                    {selectedDriver.team_name}
                  </span>
                </p>
                <p className="modal-detail-row-last">
                  <strong className="modal-detail-label">Pays</strong>
                  <span className="modal-detail-value">
                    {selectedDriver.country_code}
                  </span>
                </p>

                {/* Bouton Favoris à l'intérieur de la modale */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(selectedDriver);
                  }}
                  className={`modal-btn-favorite ${
                    favorites.some(
                      (fav) =>
                        fav.driver_number === selectedDriver.driver_number,
                    )
                      ? "btn-favorite-remove"
                      : "btn-favorite-add"
                  }`}
                >
                  {favorites.some(
                    (fav) => fav.driver_number === selectedDriver.driver_number,
                  )
                    ? "❌ "
                    : "⭐"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
