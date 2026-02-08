import type { CellIndex, CellType } from '../../types';
import { createNewGrid } from '../../utilities/createNewGrid';
import { getRandomOdd, isInBounds, longDirections } from '../algo_utils';

const shuffleArr = <T>(arr: T[]) => {
    const shuffledArr: T[] = [];
    while (arr.length > 0) {
        const index = Math.floor(Math.random() * arr.length);
        shuffledArr.push(arr.splice(index, 1)[0]);
    }
    return shuffledArr;
};

export const useRecursiveBacktracker = (rows: number, cols: number) => {
    const pathCreation: CellIndex[] = [];
    const grid = createNewGrid(rows, cols, 'wall');

    const row = getRandomOdd(rows);
    const col = getRandomOdd(cols);

    const recursiveBacktracking = (start_row: number, start_col: number) => {
        const start = grid[start_row][start_col];
        start.state = 'unvisited';
        pathCreation.push({ row: start_row, col: start_col });

        const stack: CellType[] = [start];

        while (stack.length > 0) {
            const current = stack.pop()!;

            let neighbors: CellType[] = [];
            const getNeighbors = (cell: CellType) => {
                for (const { dr, dc } of longDirections) {
                    const r = dr + cell.row;
                    const c = dc + cell.col;

                    if (
                        isInBounds(r, c, rows, cols) &&
                        grid[r][c].state === 'wall'
                    )
                        neighbors.push(grid[r][c]);
                }
            };

            getNeighbors(current);
            neighbors = shuffleArr(neighbors);

            if (neighbors.length > 0) {
                stack.push(current);
                const randomIndex = Math.floor(
                    Math.random() * neighbors.length
                );
                const { row: n_row, col: n_col } = neighbors[randomIndex];

                const wall_row = current.row + (n_row - current.row) / 2;
                const wall_col = current.col + (n_col - current.col) / 2;

                grid[wall_row][wall_col].state = 'unvisited';
                grid[n_row][n_col].state = 'unvisited';

                pathCreation.push({ row: wall_row, col: wall_col });
                pathCreation.push({ row: n_row, col: n_col });

                stack.push(grid[n_row][n_col]);
            }
        }
    };

    recursiveBacktracking(row, col);

    return pathCreation;
};
