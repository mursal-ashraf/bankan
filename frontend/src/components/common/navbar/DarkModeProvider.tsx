import React, { useState, useEffect } from 'react';
import { DarkModeContext } from './DarkModeContext';


interface DarkModeProviderProps {
    children: React.ReactNode;
}

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ children }) => {
    const [darkMode, setDarkMode] = useState<boolean>(
        () => JSON.parse(localStorage.getItem('darkMode') || 'false')
    );

    const toggleDarkMode = () => {
        setDarkMode(prevMode => {
            const newMode = !prevMode;
            localStorage.setItem('darkMode', JSON.stringify(newMode));
            return newMode;
        });
    };

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};
