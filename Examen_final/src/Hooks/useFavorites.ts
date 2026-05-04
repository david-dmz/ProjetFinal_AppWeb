import { useState } from "react";
import { type Driver } from "../API/openF1";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Driver[]>(() => {
    const saved = localStorage.getItem("f1_favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorite = (driverToToggle: Driver) => {
    const isFavorite = favorites.some(
      (fav) => fav.driver_number === driverToToggle.driver_number
    );
    const updated = isFavorite
      ? favorites.filter((fav) => fav.driver_number !== driverToToggle.driver_number)
      : [...favorites, driverToToggle];

    setFavorites(updated);
    localStorage.setItem("f1_favorites", JSON.stringify(updated));
  };

  return { favorites, toggleFavorite };
};