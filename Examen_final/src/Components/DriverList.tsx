import { useState, useEffect } from "react";
import { fetchDrivers, type Driver } from "../API/openF1";
import './DriverList.css'; // <-- Importation de ton fichier CSS séparé

export const DriverList = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

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
    return <div>Chargement de la grille...</div>;
  }

  return (
    <div className="driver-container">
      <h2 className="page-title">Grille des Pilotes</h2>
      
      <input
        type="text"
        placeholder="Rechercher un pilote (ex: Leclerc)..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />

      <ul className="driver-grid">
        {filteredDrivers.map((driver) => (
          <li 
            key={driver.driver_number}
            className="driver-card"
            onClick={() => setSelectedDriver(driver)}
          >
            <img 
              className="driver-image" 
              src={driver.headshot_url || 'https://placehold.co/200x200?text=No+Image'} 
              alt={driver.full_name} 
            />
            <h5 className="driver-name">{driver.full_name}</h5>
            <span className="driver-info">Numéro: {driver.driver_number}</span>
            <span className="driver-info">Écurie: {driver.team_name}</span>
            
            <button 
              className="btn-favoris"
              onClick={(e) => { e.stopPropagation(); console.log("Ajout favori"); }}
            >
              Ajout Favoris
            </button>
          </li>
        ))}
      </ul>

      {/* --- La Modale --- */}
      {selectedDriver && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>✕</button>
            
            <div className="modal-header">
              {selectedDriver.full_name}
            </div>
            
            <div className="modal-body">
              <img 
                src={selectedDriver.headshot_url || 'https://placehold.co/300x300?text=No+Image'} 
                alt={selectedDriver.full_name} 
                className="modal-profile-img"
                style={{ borderBottom: `8px solid #${selectedDriver.team_colour}` }}
              />
              
              <div className="modal-details">
                <p><strong>Acronyme :</strong> {selectedDriver.name_acronym}</p>
                <p><strong>Numéro :</strong> {selectedDriver.driver_number}</p>
                <p><strong>Écurie :</strong> {selectedDriver.team_name}</p>
                <p><strong>Pays :</strong> {selectedDriver.country_code}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};