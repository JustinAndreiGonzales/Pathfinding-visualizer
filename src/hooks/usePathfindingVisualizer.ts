import { useCallback, useEffect, useState } from 'react';
import { createNewGrid } from '../utilities/createNewGrid';
import { getGridDimension } from '../utilities/getGridDimension';
import { useDijkstra } from '../algorithms/dijkstra';
import type { CellType } from '../types';
import path from 'path';

export const usePathfindingVisualizer = (
    currGridSize: string,
    isDiagonal: boolean,
    currAlgo: string,
    speed: number
) => {
    const [rows, cols] = getGridDimension(currGridSize);
    const [maze, setMaze] = useState(() => createNewGrid(rows, cols));
    const [startCell, setStartCell] = useState<CellType | null>(null);
    const [endCell, setEndCell] = useState<CellType | null>(null);
    // const [, setHasStart] = useState(false);
    // const [, setHasEnd] = useState(false);

    const handleGridSizeChange = (newGridSize: string) => {
        const [rows, cols] = getGridDimension(newGridSize);
        setMaze(createNewGrid(rows, cols));
    };

    const sleep = (ms: number) =>
        new Promise<void>((resolve) => setTimeout(resolve, ms));

    const animate = async (
        cellsVisited: { i: number; j: number }[],
        path: { i: number; j: number }[]
    ) => {
        for (const node of cellsVisited) {
            setMaze((prev) => {
                const cell = prev[node.i][node.j];
                if (cell.state === 'start' || cell.state === 'end') return prev;
                const next = prev.map((r) => r.map((c) => ({ ...c })));
                next[node.i][node.j].state = 'visited';
                return next;
            });
            await sleep(30);
        }
        for (const node of path) {
            setMaze((prev) => {
                const cell = prev[node.i][node.j];
                if (cell.state === 'start' || cell.state === 'end') return prev;
                const next = prev.map((r) => r.map((c) => ({ ...c })));
                next[node.i][node.j].state = 'path';
                return next;
            });
            await sleep(30);
        }
    };

    const handleVisualize = () => {
        if (startCell === null || endCell === null) return;

        const { cellsVisited, path } = useDijkstra(maze, startCell, endCell);

        animate(cellsVisited, path);

        // setMaze((prev) => {
        //     const next = prev.map((row) => row.map((cell) => ({ ...cell })));
        //     next[10][10].state = 'visited';
        //     next[10][11].state = 'path';
        //     return next;
        // });
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
        // setHasEnd(false);
        // setHasStart(false);
        setStartCell(null);
        setEndCell(null);
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
                    // setHasStart(false);
                    setStartCell(null);
                    return next;
                }

                // End cell clicked: reset to unvisited, free end
                if (cell.state === 'end') {
                    cell.state = 'unvisited';
                    // setHasEnd(false);
                    setEndCell(null);
                    return next;
                }

                // Place start if none exists
                // setHasStart((prevStart) => {
                //     if (!prevStart) {
                //         cell.state = 'start';
                //         return true;
                //     }
                //     return prevStart;
                // });

                setStartCell((prevStart) => {
                    if (!prevStart) {
                        cell.state = 'start';
                        return { row, col, state: 'start' };
                    }
                    return prevStart;
                });

                // Place end if start exists but no end
                // setHasEnd((prevEnd) => {
                //     if (!prevEnd && cell.state !== 'start') {
                //         cell.state = 'end';
                //         return true;
                //     }
                //     return prevEnd;
                // });
                setEndCell((prevEnd) => {
                    if (!prevEnd && cell.state !== 'start') {
                        cell.state = 'end';
                        return { row, col, state: 'end' };
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
