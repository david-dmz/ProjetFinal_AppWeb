import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ChangeTheme } from "./Components/ChangeTheme";
import {ThemeProvider } from "flowbite-react";
import "./App.css";
import { DriverList } from "./Components/DriverList";
import { Favorites } from "./Components/Favorites";
import { Footer } from "./Components/Footer";
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
                <Link to="/" style={{ color: "white" }}>
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
              <Route path="/" element={<DriverList />} />
              <Route path="/favoris" element={<Favorites />} />
            </Routes>
            <Footer />
          </main>
          
        </div>
      </Router>
    </ThemeProvider>
    </>
  
  );
}
