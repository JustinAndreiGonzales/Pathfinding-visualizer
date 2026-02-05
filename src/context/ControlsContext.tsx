import { createContext } from 'react';

type ControlsContextType = {
    speed: number;
    setSpeed: React.Dispatch<React.SetStateAction<number>>;
    handleVisualize: () => void;
    handleClearPath: () => void;
    handleClearWalls: () => void;
    handleResetBoard: () => void;
    handleGenerateRandomMaze: () => void;
    handleRecursiveDivision: () => void;
};

export const ControlsContext = createContext<ControlsContextType | null>(null);
