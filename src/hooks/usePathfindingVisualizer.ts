import { useCallback, useEffect, useRef, useState } from 'react';
import { createNewGrid } from '../utilities/createNewGrid';
import { getGridDimension } from '../utilities/getGridDimension';
import { useDijkstra } from '../algorithms/pathfinding/dijkstra';
import type { CellIndex, CellType, Stats } from '../types';
import { primMazeGenerator } from '../algorithms/mazeGenerator/prims';
import { useRecursiveBacktracker } from '../algorithms/mazeGenerator/recursiveBacktracker';

export const usePathfindingVisualizer = (
    currGridSize: string,
    isDiagonal: boolean,
    currAlgo: string,
    speed: number
) => {
    const [rows, cols] = getGridDimension(currGridSize);
    const [maze, setMaze] = useState(() =>
        createNewGrid(rows, cols, 'unvisited')
    );
    const [startCell, setStartCell] = useState<CellType | null>(null);
    const [endCell, setEndCell] = useState<CellType | null>(null);

    const [stats, setStats] = useState<Stats>({
        nodes: 0,
        pathLength: 0,
        time: 0,
    });

    const speedRef = useRef(speed);

    const handleGridSizeChange = (newGridSize: string) => {
        const [rows, cols] = getGridDimension(newGridSize);
        setMaze(createNewGrid(rows, cols, 'unvisited'));
    };

    const sleep = (ms: number) =>
        new Promise<void>((resolve) => setTimeout(resolve, ms));

    const animate = async (cellsVisited: CellIndex[], path: CellIndex[]) => {
        for (const [index, node] of cellsVisited.entries()) {
            setMaze((prev) => {
                const cell = prev[node.row][node.col];
                if (cell.state === 'start' || cell.state === 'end') return prev;
                const next = prev.map((r) => r.map((c) => ({ ...c })));
                next[node.row][node.col].state = 'visited';
                return next;
            });
            setStats((prev) => ({ ...prev, nodes: index + 1 }));
            await sleep(100 - speedRef.current);
        }
        for (const [index, node] of path.entries()) {
            setMaze((prev) => {
                const cell = prev[node.row][node.col];
                if (cell.state === 'start' || cell.state === 'end') return prev;
                const next = prev.map((r) => r.map((c) => ({ ...c })));
                next[node.row][node.col].state = 'path';
                return next;
            });
            setStats((prev) => ({ ...prev, pathLength: index + 1 }));
            await sleep(100 - speedRef.current);
        }
    };

    const animateMazeGeneration = async (paths: CellIndex[]) => {
        setMaze(createNewGrid(rows, cols, 'wall'));

        for (const { row, col } of paths) {
            setMaze((prev) => {
                const next = prev.map((r) => r.map((c) => ({ ...c })));
                next[row][col].state = 'unvisited';
                return next;
            });
            await sleep(100 - speedRef.current);
        }
    };

    const handleVisualize = () => {
        if (startCell === null || endCell === null) return;

        const now = performance.now();
        const { cellsVisited, path } = useDijkstra(
            maze,
            startCell,
            endCell,
            isDiagonal
        );
        const end = performance.now();

        animate(cellsVisited, path);
        setStats((prev) => ({ ...prev, time: end - now }));
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
        setStartCell(null);
        setEndCell(null);
    };

    const handleGenerateRandomMaze = () => {
        const path = primMazeGenerator(rows, cols);
        animateMazeGeneration(path);
    };
    const handleRecursiveDivision = () => {
        const path = useRecursiveBacktracker(rows, cols);
        console.log(path);
        animateMazeGeneration(path);
    };

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

                setStartCell((prevStart) => {
                    if (!prevStart) {
                        cell.state = 'start';
                        return { row, col, state: 'start' };
                    }
                    return prevStart;
                });

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

    useEffect(() => {
        speedRef.current = speed;
    }, [speed]);

    return {
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
    };
};
