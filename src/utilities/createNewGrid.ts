import type { CellState, CellType } from '../types';

export const createNewGrid = (x: number, y: number): CellType[][] => {
    return Array.from({ length: x }, (_, i) =>
        Array.from(
            { length: y },
            (_, j) =>
                ({
                    row: i,
                    col: j,
                    state: 'unvisited' as CellState,
                }) as CellType
        )
    );
};
