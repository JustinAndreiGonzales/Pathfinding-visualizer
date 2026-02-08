import type { CellIndex, CellType } from '../../types';
import { createNewGrid } from '../../utilities/createNewGrid';
import { getRandomOdd, isInBounds, longDirections } from '../algo_utils';

export const primMazeGenerator = (rows: number, cols: number) => {
    const wallCreation: CellIndex[] = [];
    const newGrid = createNewGrid(rows, cols, 'wall');

    const row = getRandomOdd(rows);
    const col = getRandomOdd(cols);

    const start = newGrid[row][col];
    start.state = 'unvisited';
    wallCreation.push({ row, col });

    const frontier: CellType[] = [];

    const addFrontier = (cell: CellType) => {
        for (const { dr, dc } of longDirections) {
            const r = cell.row + dr;
            const c = cell.col + dc;
            if (
                isInBounds(r, c, rows, cols) &&
                newGrid[r][c].state === 'wall'
            ) {
                frontier.push(newGrid[r][c]);
            }
        }
    };

    addFrontier(start);

    while (frontier.length > 0) {
        const randomIndex = Math.floor(Math.random() * frontier.length);
        const [current] = frontier.splice(randomIndex, 1);

        const neighbors: CellType[] = [];

        for (const { dr, dc } of longDirections) {
            const r = current.row + dr;
            const c = current.col + dc;
            if (
                isInBounds(r, c, rows, cols) &&
                newGrid[r][c].state === 'unvisited'
            ) {
                neighbors.push(newGrid[r][c]);
            }
        }

        if (neighbors.length === 1) {
            const next = neighbors[0];

            const wallRow = (current.row + next.row) / 2;
            const wallCol = (current.col + next.col) / 2;

            newGrid[wallRow][wallCol].state = 'unvisited';
            newGrid[current.row][current.col].state = 'unvisited';

            wallCreation.push(
                { row: wallRow, col: wallCol },
                { row: current.row, col: current.col }
            );

            addFrontier(current);
        }
    }
    return wallCreation;
};
