import { useCallback, useEffect, useState } from 'react';
import { createNewGrid } from '../utilities/createNewGrid';
import { getGridDimension } from '../utilities/getGridDimension';

export const usePathfindingVisualizer = (
    currGridSize: string,
    isDiagonal: boolean,
    currAlgo: string,
    speed: number
) => {
    const [rows, cols] = getGridDimension(currGridSize);
    const [maze, setMaze] = useState(() => createNewGrid(rows, cols));
    const [hasStart, setHasStart] = useState(false);
    const [hasEnd, setHasEnd] = useState(false);

    const [isMouseDown, setIsMouseDown] = useState(false);

    const handleGridSizeChange = (newGridSize: string) => {
        const [rows, cols] = getGridDimension(newGridSize);
        setMaze(createNewGrid(rows, cols));
    };

    const handleVisualize = useCallback(() => {
        setMaze((prev) => {
            const next = prev.map((row) => row.map((cell) => ({ ...cell })));
            next[10][10].state = 'visited';
            next[10][11].state = 'path';
            return next;
        });
    }, [currGridSize, isDiagonal, currAlgo, speed]);

    const handleClearPath = useCallback(() => {
        setMaze((prev) => {
            return prev.map((row) =>
                row.map((cell) =>
                    cell.state === 'visited' || cell.state === 'path'
                        ? { ...cell, state: 'unvisited' }
                        : { ...cell }
                )
            );
        });
    }, []);

    const handleClearWalls = useCallback(() => {
        setMaze((prev) => {
            return prev.map((row) =>
                row.map((cell) =>
                    cell.state === 'wall'
                        ? { ...cell, state: 'unvisited' }
                        : { ...cell }
                )
            );
        });
    }, []);

    const handleResetBoard = useCallback(() => {
        handleGridSizeChange(currGridSize);
        setHasEnd(false);
        setHasStart(false);
    }, [currGridSize]);

    const handleGenerateRandomMaze = useCallback(() => {}, []);
    const handleRecursiveDivision = useCallback(() => {}, []);

    // better hover onclick (better UX)
    const handleGridOnClick = (row: number, col: number) => {
        setMaze((prev) => {
            const next = prev.map((row) => row.map((cell) => ({ ...cell })));
            const cellState = next[row][col].state;
            if (cellState == 'end') {
                setHasEnd(false);
                next[row][col].state = 'unvisited';
            } else if (cellState == 'start') {
                setHasStart(false);
                next[row][col].state = 'unvisited';
            } else if (!hasStart) {
                next[row][col].state = 'start';
                setHasStart(true);
            } else if (!hasEnd) {
                next[row][col].state = 'end';
                setHasEnd(true);
            } else if (cellState == 'wall') {
                next[row][col].state = 'unvisited';
            } else {
                next[row][col].state = 'wall';
            }
            return next;
        });
    };

    useEffect(() => {
        handleGridSizeChange(currGridSize);
    }, [currGridSize]);

    return {
        maze,
        rows,
        cols,
        handleVisualize,
        handleClearPath,
        handleClearWalls,
        handleResetBoard,
        handleGenerateRandomMaze,
        handleRecursiveDivision,
        handleGridOnClick,
        isMouseDown,
        setIsMouseDown,
    };
};
