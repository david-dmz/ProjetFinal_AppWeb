import { useState, useEffect } from "react";
import { fetchDrivers, fetchMeetings, type Driver, type Meeting } from "../API/openF1";
import { customImages, driverWDC } from '../API/DriversInfo';
import './DriverList.css'; 

export const DriverList = () => {
  // --- ÉTATS GLOBAUX ---
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  
  // --- ÉTATS DES FILTRES ---
  const [selectedYear, setSelectedYear] = useState<string>("2026");
  const [meetings, setMeetings] = useState<Meeting[]>([]); 
  const [selectedMeetingKey, setSelectedMeetingKey] = useState<number | "">(""); 
  
  // --- ÉTAT DES FAVORIS ---
  const [favorites, setFavorites] = useState<Driver[]>(() => {
    const saved = localStorage.getItem("f1_favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // --- EFFET 1 : Charger les courses (Meetings) quand l'année change ---
  useEffect(() => {
    const loadMeetings = async () => {
      setLoading(true);
      const meetingsData = await fetchMeetings(selectedYear);
      setMeetings(meetingsData);
      
      // Si on a trouvé des courses, on sélectionne automatiquement la première
      if (meetingsData.length > 0) {
        setSelectedMeetingKey(meetingsData[0].meeting_key);
      } else {
        setDrivers([]);
        setSelectedMeetingKey("");
        setLoading(false);
      }
    };
    loadMeetings();
  }, [selectedYear]);

  // --- EFFET 2 : Charger les pilotes quand la course change ---
  useEffect(() => {
    if (!selectedMeetingKey) return; 

    const loadDrivers = async () => {
      setLoading(true);
      const driversData = await fetchDrivers(Number(selectedMeetingKey));
      setDrivers(driversData);
      setLoading(false);
    };
    loadDrivers();
  }, [selectedMeetingKey]);

  // --- LOGIQUE DE FILTRAGE PAR RECHERCHE ---
  const filteredDrivers = drivers.filter((driver) =>
    driver.full_name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const closeModal = () => setSelectedDriver(null);

  // --- LOGIQUE D'AJOUT/SUPPRESSION DES FAVORIS ---
  const toggleFavorite = (driverToToggle: Driver) => {
    let updatedFavorites;
    const isFavorite = favorites.some(fav => fav.driver_number === driverToToggle.driver_number);

    if (isFavorite) {
      updatedFavorites = favorites.filter(fav => fav.driver_number !== driverToToggle.driver_number);
    } else {
      updatedFavorites = [...favorites, driverToToggle];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("f1_favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="page-container">
      
      {/* --- EN-TÊTE ET FILTRES --- */}
      <div className="header-section">
        <h2 className="title-main">Grille des Pilotes</h2>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-4xl mx-auto">
          
          <input
            type="text"
            placeholder="Rechercher un pilote..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar !m-0 flex-1"
          />
          
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-white border border-gray-300 text-gray-900 text-base font-bold rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full md:w-40 p-4 shadow-sm cursor-pointer"
          >
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>

          <select
            value={selectedMeetingKey}
            onChange={(e) => setSelectedMeetingKey(Number(e.target.value))}
            className="bg-white border border-gray-300 text-gray-900 text-base font-bold rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full md:w-64 p-4 shadow-sm cursor-pointer truncate"
            disabled={meetings.length === 0 || loading}
          >
            {meetings.map((meeting) => (
              <option key={meeting.meeting_key} value={meeting.meeting_key}>
                {meeting.country_name} - {meeting.meeting_name}
              </option>
            ))}
          </select>

        </div>
      </div>

      {/* --- AFFICHAGE DE LA GRILLE (OU DU CHARGEMENT) --- */}
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <ul className="drivers-grid">
          {filteredDrivers.map((driver) => {
            const isFav = favorites.some(fav => fav.driver_number === driver.driver_number);

            return (
              <li 
                key={driver.driver_number}
                onClick={() => setSelectedDriver(driver)}
                className="driver-card group" 
              >
                <div className="card-color-bar" style={{ backgroundColor: `#${driver.team_colour || 'gray-500'}` }}></div>
                
                <div className="card-content">
                  <img 
                    className="card-image" 
                    src={customImages[driver.driver_number] || driver.headshot_url || 'https://placehold.co/200x200?text=No+Image'} 
                    alt={driver.full_name} 
                  />
                  <h5 className="card-name flex items-center justify-center gap-2">
                    {driver.full_name}
                   
                  </h5>
                  <span className="card-number">#{driver.driver_number}</span>
                  <span className="card-team">{driver.team_name}</span>
                  
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(driver); }}
                    className={`btn-favorite ${isFav ? 'btn-favorite-remove' : 'btn-favorite-add'}`}
                  >
                    {isFav ? " Retirer" : "Ajouter"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* --- FENÊTRE MODALE DÉTAILLÉE --- */}
      {selectedDriver && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>✕</button>
            <div className="modal-header">{selectedDriver.full_name}</div>
            
            <div className="modal-body">
              <div 
                className="modal-image-container"
                style={{ 
                  borderBottom: `8px solid #${selectedDriver.team_colour}`,
                  backgroundImage: `linear-gradient(to top, #${selectedDriver.team_colour}30, transparent)`
                }}
              >
                <img 
                  src={customImages[selectedDriver.driver_number] || selectedDriver.headshot_url || 'https://placehold.co/300x300?text=No+Image'} 
                  alt={selectedDriver.full_name} 
                  className="modal-image"
                />
              </div>
              
              <div className="modal-details-container">
                <p className="modal-detail-row">
                  <strong className="modal-detail-label">Acronyme</strong> 
                  <span className="modal-detail-value">{selectedDriver.name_acronym}</span>
                </p>
                <p className="modal-detail-row">
                  <strong className="modal-detail-label">Numéro</strong> 
                  <span className="modal-detail-value-blue">#{selectedDriver.driver_number}</span>
                </p>
                <p className="modal-detail-row">
                  <strong className="modal-detail-label">Championnats (WDC)</strong> 
                  <span className="modal-detail-value font-black text-yellow-500">
                    {driverWDC[selectedDriver.driver_number] ? `${driverWDC[selectedDriver.driver_number]}` : "0"}
                  </span>
                </p>
                <p className="modal-detail-row-last">
                  <strong className="modal-detail-label">Écurie</strong> 
                  <span className="modal-detail-value">{selectedDriver.team_name}</span>
                </p>
                
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(selectedDriver); }}
                  className={`modal-btn-favorite ${
                    favorites.some(fav => fav.driver_number === selectedDriver.driver_number) 
                      ? 'btn-favorite-remove' 
                      : 'btn-favorite-add'
                  }`}
                >
                  {favorites.some(fav => fav.driver_number === selectedDriver.driver_number) 
                    ? "❌" 
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