import React from 'react';

export const HomePage = () => {
  // L'ID de ta vidéo YouTube (extrait du lien)
  const videoId = "Sks_fMr2Yss";

  return (
    // Conteneur principal : prend toute la hauteur de l'écran et cache ce qui déborde
    <div className="relative w-full h-screen overflow-hidden bg-black">
      
      {/* 1. LA VIDÉO YOUTUBE EN FOND */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <iframe
          // L'astuce Tailwind : on la rend beaucoup plus grande que l'écran et on la centre
          // pour s'assurer qu'il n'y a pas de bandes noires sur les côtés.
          className="absolute top-1/2 left-1/2 w-[150vw] h-[150vh] min-w-[100vw] min-h-[100vh] -translate-x-1/2 -translate-y-1/2 object-cover"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1`}
          title="F1 Background Video"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>

      {/* 2. LE CALQUE SOMBRE (OVERLAY) */}
      {/* Très important pour que le texte blanc soit lisible par-dessus la vidéo */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* 3. LE CONTENU DE TA PAGE D'ACCUEIL */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white px-4">
        
        <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter text-center uppercase drop-shadow-lg">
          Le Paddock <span className="text-red-600">F1</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 font-medium mb-10 text-center max-w-2xl drop-shadow-md">
          Toutes les données de la saison en temps réel. Explorez les pilotes, les écuries et les résultats.
        </p>
        
        {/* Boutons d'action rapides */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-transform hover:scale-105 active:scale-95 shadow-xl">
            Accéder à la Grille
          </button>
          <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 font-bold rounded-xl transition-transform hover:scale-105 active:scale-95 shadow-xl">
            Voir mes Favoris
          </button>
        </div>

      </div>
      
    </div>
  );
};