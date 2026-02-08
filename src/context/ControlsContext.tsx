import { createContext } from 'react';
import type { Stats } from '../types';

type ControlsContextType = {
    speed: number;
    stats: Stats;
    setSpeed: React.Dispatch<React.SetStateAction<number>>;
    handleVisualize: () => void;
    handleClearPath: () => void;
    handleClearWalls: () => void;
    handleResetBoard: () => void;
    handleGenerateRandomMaze: () => void;
    handleRecursiveDivision: () => void;
};

export const ControlsContext = createContext<ControlsContextType | null>(null);
