import React from 'react';

interface DarkModeContextProps {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

export const DarkModeContext = React.createContext<DarkModeContextProps | undefined>(undefined);
