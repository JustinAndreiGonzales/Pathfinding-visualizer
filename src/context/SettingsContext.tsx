import { createContext } from 'react';

type SettingsContextType = {
    gridSizes: string[];
    currGridSize: string;
    setGridSize: (newGridSize: string) => void;
    isDiagonal: boolean;
    setIsDiagonal: React.Dispatch<React.SetStateAction<boolean>>;
    algorithms: string[];
    currAlgo: string;
    setCurrAlgo: React.Dispatch<React.SetStateAction<string>>;
};

export const SettingsContext = createContext<SettingsContextType | null>(null);
