export type IconProps = {
    className?: string;
};

export type CellState =
    | 'unvisited'
    | 'visited'
    | 'start'
    | 'end'
    | 'wall'
    | 'path';

export type CellType = {
    row: number;
    col: number;
    state: CellState;
};
