import type { CellState } from '../types';

export const createNewGrid = (x: number, y: number) => {
    return Array.from({ length: x }, () =>
        Array.from({ length: y }, () => 'unvisited' as CellState)
    );
};
