import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        
        {/* 1. Extrémité gauche */}
        <div className="footer-text flex-1 text-center md:text-left">
          © {new Date().getFullYear()} <span className="footer-highlight">F1 Paddock</span>
        </div>
        
        {/* 2. Milieu */}
        <div className="footer-text flex-1 text-center">
          Développé par <span className="footer-highlight">David Martinez</span>
        </div>

        {/* 3. Extrémité droite */}
        <div className="footer-text flex-1 text-center md:text-right">
          Propulsé par l'API <a href="https://openf1.org/" target="_blank" rel="noopener noreferrer" className="footer-link">OpenF1</a>
        </div>
        
      </div>
    </footer>
  );
};