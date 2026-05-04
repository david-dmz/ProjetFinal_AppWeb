import { type Driver } from "../../API/openF1";
import { customImages, driverWDC } from "../../API/DriversInfo";
import "./DriverModal.css";

interface DriverModalProps {
  driver: Driver | null;
  isFav: boolean;
  onClose: () => void;
  onToggleFavorite: (driver: Driver) => void;
}

export const DriverModal = ({ driver, isFav, onClose, onToggleFavorite }: DriverModalProps) => {
  if (!driver) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>✕</button>
        <div className="modal-header">{driver.full_name}</div>

        <div className="modal-body">
          <div
            className="modal-image-container"
            style={{
              borderBottom: `8px solid #${driver.team_colour}`,
              backgroundImage: `linear-gradient(to top, #${driver.team_colour}30, transparent)`,
            }}
          >
            <img
              src={ driver.headshot_url || "https://placehold.co/300x300?text=No+Image"}
              alt={driver.full_name}
              className="modal-image"
            />
          </div>

          <div className="modal-details-container">
            <p className="modal-detail-row">
              <strong className="modal-detail-label">Acronyme</strong>
              <span className="modal-detail-value">{driver.name_acronym}</span>
            </p>
            <p className="modal-detail-row">
              <strong className="modal-detail-label">Numéro</strong>
              <span className="modal-detail-value-blue">#{driver.driver_number}</span>
            </p>
            <p className="modal-detail-row">
              <strong className="modal-detail-label">Championnats (WDC)</strong>
              <span className="modal-detail-value font-black text-yellow-500">
                {driverWDC[driver.driver_number] ?? "0"}
              </span>
            </p>
            <p className="modal-detail-row-last">
              <strong className="modal-detail-label">Écurie</strong>
              <span className="modal-detail-value">{driver.team_name}</span>
            </p>

            <button
              onClick={(e) => { e.stopPropagation(); onToggleFavorite(driver); }}
              className={`modal-btn-favorite ${isFav ? "btn-favorite-remove" : "btn-favorite-add"}`}
            >
              {isFav ? "❌" : "⭐"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};