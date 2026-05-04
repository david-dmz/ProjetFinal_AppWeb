import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ChangeTheme } from "./Components/ChangeTheme";
import { ThemeProvider } from "flowbite-react";
import "./App.css";

import { HomePage } from "./Components/HomePage/HomePage";
import { DriverList } from "./Components/DriversCards/DriverList";
import { Favorites } from "./Components/Favorite/Favorites";
import { Footer } from "./Components/Footer/Footer";

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app-container min-h-screen flex flex-col">
          
          <header className="sticky top-0 z-50 bg-[#15151e]/90 backdrop-blur-md border-b border-gray-800 shadow-xl">
            <div className="flex flex-wrap items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full gap-4">

              <div className="flex-shrink-0">
                <h1 className="text-2xl font-black italic text-white tracking-widest drop-shadow-md">
                  F1 <span className="text-red-600">PADDOCK</span>
                </h1>
              </div>

              <nav className="flex-1 flex justify-center">
                <ul className="flex items-center gap-1 sm:gap-4 bg-white/5 px-2 sm:px-4 py-2 rounded-full border border-white/10">
                  <li>
                    <Link 
                      to="/" 
                      className="text-gray-300 hover:text-white hover:bg-white/10 px-3 sm:px-5 py-2 rounded-full text-sm sm:text-base font-bold transition-all"
                    >
                      Accueil
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/pilotes" 
                      className="text-gray-300 hover:text-white hover:bg-white/10 px-3 sm:px-5 py-2 rounded-full text-sm sm:text-base font-bold transition-all"
                    >
                      Pilotes
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/favoris" 
                      className="text-gray-300 hover:text-white hover:bg-white/10 px-3 sm:px-5 py-2 rounded-full text-sm sm:text-base font-bold transition-all"
                    >
                      Mon Écurie
                    </Link>
                  </li>
                </ul>
              </nav>

              <div className="flex-shrink-0 flex items-center">
                <ChangeTheme />
              </div>

            </div>
          </header>

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/pilotes" element={<DriverList />} />
              <Route path="/favoris" element={<Favorites />} />
            </Routes>
          </main>

          <Footer />
          
        </div>
      </Router>
    </ThemeProvider>
  );
}