import { type Driver } from "../../API/openF1";
import "./DriverCard.css";

interface DriverCardProps {
  driver: Driver;
  isFav: boolean;
  onSelect: (driver: Driver) => void;
  onToggleFavorite: (driver: Driver) => void;
}

export const DriverCard = ({ driver, isFav, onSelect, onToggleFavorite }: DriverCardProps) => (
  <li onClick={() => onSelect(driver)} className="driver-card group">
    <div
      className="card-color-bar"
      style={{ backgroundColor: `#${driver.team_colour || "gray-500"}` }}
    />
    <div className="card-content">
      <img
        className="card-image"
        src={ driver.headshot_url || "https://placehold.co/200x200?text=No+Image"}
        alt={driver.full_name}
      />
      <h5 className="card-name flex items-center justify-center gap-2">
        {driver.full_name}
      </h5>
      <span className="card-number">#{driver.driver_number}</span>
      <span className="card-team">{driver.team_name}</span>
      <button
        onClick={(e) => { e.stopPropagation(); onToggleFavorite(driver); }}
        className={`btn-favorite ${isFav ? "btn-favorite-remove" : "btn-favorite-add"}`}
      >
        {isFav ? " Retirer" : "Ajouter"}
      </button>
    </div>
  </li>
);