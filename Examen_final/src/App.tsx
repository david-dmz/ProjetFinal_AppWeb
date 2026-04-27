import { useState, useEffect } from 'react';
import { ChangeTheme } from './Components/ChangeTheme';
import { ThemeProvider } from 'flowbite-react';
import './App.css'; 
 
export default function App() {
  return(
    <ThemeProvider>
        
        <div className="app-container">
            <h1 className="dashboard-title">Tableau de bord</h1>
            <ChangeTheme />
        </div>
    </ThemeProvider>
  )
 }