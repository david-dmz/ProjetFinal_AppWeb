import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ChangeTheme } from "./Components/ChangeTheme";
import {ThemeProvider } from "flowbite-react";
import "./App.css";

import { HomePage } from "./Components/HomePage/HomePage";
import { DriverList } from "./Components/DriversCards/DriverList";
import { Favorites } from "./Components/Favorite/Favorites";
import { Footer } from "./Components/Footer/Footer";

export default function App() {
  return (
    <>
      <ThemeProvider>
      <Router>
        <div className="app-container">
          <h1 className="dashboard-title">F1 PADDOCK</h1>

          <nav>
            <ul>
              <li>
                <Link to ="/" style={{ color: "white" }}>
                Accueil
                </Link>
              </li>
              <li>
                <Link to="/pilotes" style={{ color: "white" }}>
                  Pilotes
                </Link>
              </li>
              <li>
                <Link to="/favoris" style={{ color: "white" }}>
                  Mon Écurie (Favoris)
                </Link>
              </li>
            </ul>
          </nav>
          <ChangeTheme />

          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/pilotes" element={<DriverList />} />
              <Route path="/favoris" element={<Favorites  />} />
            </Routes>
            <Footer />
          </main>
          
        </div>
      </Router>
    </ThemeProvider>
    </>
  
  );
}
