import { useThemeMode } from "flowbite-react";
import './ChangeTheme.css'; 

export const ChangeTheme = () => {
    const { mode, toggleMode } = useThemeMode();
    return (
        <div>
            <button 
                onClick={toggleMode} 
                className="btn-toggle-theme"
            >
                {mode === 'light' ? 'Passer au mode sombre ' : 'Passer au mode clair '}
            </button>
        </div>
    );
}