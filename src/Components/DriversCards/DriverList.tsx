import { useState } from "react";
import { useDriverFilters } from "../../Hooks/useDriverFilters";
import { useFavorites } from "../../Hooks/useFavorites";
import { DriverFilters } from "./DriverFilters";
import { DriverGrid } from "./DriverGrid";
import { DriverModal } from "./DriverModal";
import { type Driver } from "../../API/openF1";
import './DriverList.css';

export const DriverList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  const {
    drivers, loading, meetings,
    selectedYear, setSelectedYear,
    selectedMeetingKey, setSelectedMeetingKey,
  } = useDriverFilters();

  const { favorites, toggleFavorite } = useFavorites();

  const filteredDrivers = drivers.filter((d) =>
    d.full_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="header-section">
        <h2 className="title-main">Grille des Pilotes</h2>
        <DriverFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
          meetings={meetings}
          selectedMeetingKey={selectedMeetingKey}
          onMeetingChange={setSelectedMeetingKey}
          loading={loading}
        />
      </div>

      <DriverGrid
        loading={loading}
        drivers={filteredDrivers}
        favorites={favorites}
        onSelectDriver={setSelectedDriver}
        onToggleFavorite={toggleFavorite}
      />

      <DriverModal
        driver={selectedDriver}
        isFav={favorites.some((f) => f.driver_number === selectedDriver?.driver_number)}
        onClose={() => setSelectedDriver(null)}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
};