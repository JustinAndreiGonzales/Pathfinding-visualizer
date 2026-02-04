import { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { CellState } from '../types';
import { createNewGrid } from '../utilities/createNewGrid';

// TODO: better types
type GridContextType = {
    gridSizes: string[];
    currGridSize: string;
    setGridSize: (newGridSize: string) => void;
    maze: CellState[][];
    setMaze: React.Dispatch<React.SetStateAction<CellState[][]>>;
    isDiagonal: boolean;
    setIsDiagonal: React.Dispatch<React.SetStateAction<boolean>>;
    algorithms: string[];
    currAlgo: string;
    setCurrAlgo: React.Dispatch<React.SetStateAction<string>>;
    speed: number;
    setSpeed: React.Dispatch<React.SetStateAction<number>>;
};

export const GridContext = createContext<GridContextType | null>(null);

export const GridProvider = ({ children }: { children: ReactNode }) => {
    // Constants
    const gridSizes = ['Small (20x40)', 'Medium (25x50)', 'Large (30x60)'];
    const algorithms = ["Dijkstra's Algorthm", 'A star', 'BFS', 'DFS'];

    // States
    // Main Header
    const [gridSize, setGridSize] = useState(gridSizes[1]);
    const [maze, setMaze] = useState(createNewGrid(25, 50));
    const [isDiagonal, setIsDiagonal] = useState(false);

    // Sidebar
    const [currAlgo, setCurrAlgo] = useState(algorithms[0]);
    const [speed, setSpeed] = useState(50);

    const handleGridSizeChange = (newGridSize: string) => {
        const newSize = newGridSize.match(/\((\d+)x(\d+)\)/);
        if (!newSize) {
            throw new Error('Invalid format');
        }
        setGridSize(newGridSize);
        setMaze(createNewGrid(Number(newSize[1]), Number(newSize[2])));
    };

    const value = {
        gridSizes,
        currGridSize: gridSize,
        setGridSize: handleGridSizeChange,
        maze,
        setMaze,
        isDiagonal,
        setIsDiagonal,
        algorithms,
        currAlgo,
        setCurrAlgo,
        speed,
        setSpeed,
    };

    return (
        <GridContext.Provider value={value}>{children}</GridContext.Provider>
    );
};
