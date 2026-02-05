import type { CellState, CellType } from '../types';

export const createNewGrid = (x: number, y: number): CellType[][] => {
    return Array.from({ length: x }, () =>
        Array.from(
            { length: y },
            () => ({ state: 'unvisited' as CellState }) as CellType
        )
    );
};
