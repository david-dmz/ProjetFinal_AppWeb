import { useState, useEffect } from "react";
import { fetchDrivers, type Driver } from "../API/openF1";

export const DriverList = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <h2>Liste des Pilotes</h2>
     
     {/*Champ de recherche*/ }
      <input
        type="text"
        placeholder="Rechercher un pilote (ex: Leclerc)..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />

      <ul>
        {drivers.map((driver) => (
          <li key={driver.driver_number}>
            <img src={driver.headshot_url || 'https://placehold.co/200x200?text=No+Image'}
            alt={driver.full_name} />
            <span>{driver.full_name}</span>
            <span>{driver.team_name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
