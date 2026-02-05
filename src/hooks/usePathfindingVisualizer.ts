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
    const [, setHasStart] = useState(false);
    const [, setHasEnd] = useState(false);

    const handleGridSizeChange = (newGridSize: string) => {
        const [rows, cols] = getGridDimension(newGridSize);
        setMaze(createNewGrid(rows, cols));
    };

    const handleVisualize = () => {
        setMaze((prev) => {
            const next = prev.map((row) => row.map((cell) => ({ ...cell })));
            next[10][10].state = 'visited';
            next[10][11].state = 'path';
            return next;
        });
    };

    const handleClearPath = () => {
        setMaze((prev) => {
            return prev.map((row) =>
                row.map((cell) =>
                    cell.state === 'visited' || cell.state === 'path'
                        ? { ...cell, state: 'unvisited' }
                        : { ...cell }
                )
            );
        });
    };

    const handleClearWalls = () => {
        setMaze((prev) => {
            return prev.map((row) =>
                row.map((cell) =>
                    cell.state === 'wall'
                        ? { ...cell, state: 'unvisited' }
                        : { ...cell }
                )
            );
        });
    };

    const handleResetBoard = () => {
        handleGridSizeChange(currGridSize);
        setHasEnd(false);
        setHasStart(false);
    };

    const handleGenerateRandomMaze = () => {};
    const handleRecursiveDivision = () => {};

    const handleGridOnClick = useCallback(
        (row: number, col: number) => {
            setMaze((prevMaze) => {
                const next = prevMaze.map((r) => r.map((c) => ({ ...c })));
                const cell = next[row][col];

                // Start cell clicked: reset to unvisited, free start
                if (cell.state === 'start') {
                    cell.state = 'unvisited';
                    setHasStart(false);
                    return next;
                }

                // End cell clicked: reset to unvisited, free end
                if (cell.state === 'end') {
                    cell.state = 'unvisited';
                    setHasEnd(false);
                    return next;
                }

                // Place start if none exists
                setHasStart((prevStart) => {
                    if (!prevStart) {
                        cell.state = 'start';
                        return true;
                    }
                    return prevStart;
                });

                // Place end if start exists but no end
                setHasEnd((prevEnd) => {
                    if (!prevEnd && cell.state !== 'start') {
                        cell.state = 'end';
                        return true;
                    }
                    return prevEnd;
                });

                // Toggle walls if cell is unvisited/wall
                if (cell.state === 'unvisited') {
                    cell.state = 'wall';
                } else if (cell.state === 'wall') {
                    cell.state = 'unvisited';
                }

                return next;
            });
        },
        [setMaze]
    );

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
    };
};
