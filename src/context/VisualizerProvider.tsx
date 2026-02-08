import { useState, type ReactNode } from 'react';
import { usePathfindingVisualizer } from '../hooks/usePathfindingVisualizer';
import { GridContext } from './GridContext';
import { ControlsContext } from './ControlsContext';
import { SettingsContext } from './SettingsContext';

export const VisualizerProvider = ({ children }: { children: ReactNode }) => {
    // Constants
    const gridSizes = ['Small (20x40)', 'Medium (25x50)', 'Large (30x60)'];
    const algorithms = ["Dijkstra's Algorthm", 'A star', 'BFS', 'DFS'];

    // States
    // Main Header
    const [gridSize, setGridSize] = useState(gridSizes[1]);
    const [isDiagonal, setIsDiagonal] = useState(false);

    // Sidebar
    const [currAlgo, setCurrAlgo] = useState(algorithms[0]);
    const [speed, setSpeed] = useState(50);

    const handleGridSizeChange = (newGridSize: string) => {
        setGridSize(newGridSize);
    };

    const {
        maze,
        rows,
        cols,
        stats,
        handleVisualize,
        handleClearPath,
        handleClearWalls,
        handleResetBoard,
        handleGenerateRandomMaze,
        handleRecursiveDivision,
        handleGridOnClick,
    } = usePathfindingVisualizer(gridSize, isDiagonal, currAlgo, speed);

    const gridValues = {
        maze,
        rows,
        cols,
        handleGridOnClick,
    };
    const settingValues = {
        gridSizes,
        currGridSize: gridSize,
        setGridSize: handleGridSizeChange,
        isDiagonal,
        setIsDiagonal,
        algorithms,
        currAlgo,
        setCurrAlgo,
    };
    const controlsValues = {
        speed,
        stats,
        setSpeed,
        handleVisualize,
        handleClearPath,
        handleClearWalls,
        handleResetBoard,
        handleGenerateRandomMaze,
        handleRecursiveDivision,
    };

    return (
        <SettingsContext.Provider value={settingValues}>
            <ControlsContext.Provider value={controlsValues}>
                <GridContext.Provider value={gridValues}>
                    {children}
                </GridContext.Provider>
            </ControlsContext.Provider>
        </SettingsContext.Provider>
    );
};
