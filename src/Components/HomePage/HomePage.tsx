import React from 'react';
import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      
      {/* --- LA VIDÉO LOCALE EN FOND --- */}
      {/* playsInline pour que cela marche sur le telephone*/}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      >
        {/* Le chemin pointe directement vers le dossier public */}
        <source src="/videos/f1-bg.mp4" type="video/mp4" />
        Votre navigateur ne supporte pas la balise vidéo.
      </video>

      {/* --- LE CALQUE SOMBRE (OVERLAY) --- */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* --- LE CONTENU TEXTE ET BOUTONS --- */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white px-4">
        
        <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter text-center uppercase drop-shadow-lg">
          Le Paddock <span className="text-red-600">F1</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 font-medium mb-10 text-center max-w-2xl drop-shadow-md">
          Toutes les données de la saison en temps réel. Explorez les pilotes, les écuries et les résultats.
          <br /><br />
         <span className="text-lg md:text-xl text-gray-400">
    Propulsé par <strong className="text-white">l'API OpenF1</strong> et les données officielles du chronométrage (Live Timing) de la F1. Branchez-vous directement sur les systèmes des ingénieurs pour analyser les courses en direct.
  </span>
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            to="/pilotes" 
            className="inline-flex justify-center items-center px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-transform hover:scale-105 active:scale-95 shadow-xl"
          >
            Accéder à la Grille
          </Link>
          <Link 
            to="/favoris" 
            className="inline-flex justify-center items-center px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 font-bold rounded-xl transition-transform hover:scale-105 active:scale-95 shadow-xl"
          >
            Voir mes Favoris
          </Link>
        </div>

      </div>
      
    </div>
  );
};