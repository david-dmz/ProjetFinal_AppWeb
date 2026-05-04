import { type Driver } from "../../API/openF1";
import { DriverCard } from "./DriverCard";
import "./DriverGrid.css";

interface DriverGridProps {
  loading: boolean;
  drivers: Driver[];
  favorites: Driver[];
  onSelectDriver: (driver: Driver) => void;
  onToggleFavorite: (driver: Driver) => void;
}

export const DriverGrid = ({
  loading, drivers, favorites, onSelectDriver, onToggleFavorite,
}: DriverGridProps) => {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" />
      </div>
    );
  }

  return (
    <ul className="drivers-grid">
      {drivers.map((driver) => (
        <DriverCard
          key={driver.driver_number}
          driver={driver}
          isFav={favorites.some((fav) => fav.driver_number === driver.driver_number)}
          onSelect={onSelectDriver}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </ul>
  );
};