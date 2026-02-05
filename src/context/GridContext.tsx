import { createContext } from 'react';
import type { CellType } from '../types';
// TODO: better types
type GridContextType = {
    maze: CellType[][];
    rows: number;
    cols: number;
    handleGridOnClick: (row: number, col: number) => void;
};

export const GridContext = createContext<GridContextType | null>(null);
