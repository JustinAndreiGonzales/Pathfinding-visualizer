import React, { useRef } from 'react';
import { useGridContext } from '../../hooks/useGridContext';
import type { CellState, CellType } from '../../types';

const Maze = () => {
    const { maze, rows, cols, handleGridOnClick } = useGridContext();

    const isMouseDownRef = useRef(false);

    const gridRowCol = (() => {
        switch (rows) {
            case 20:
                return 'grid-cols-40 grid-rows-20';
            case 25:
                return 'grid-cols-50 grid-rows-25';
            case 30:
                return 'grid-cols-60 grid-rows-30';
            default:
                return '';
        }
    })();

    return (
        <div className='flex w-full h-full justify-center items-center rounded-2xl'>
            <div
                className={`grid ${gridRowCol} w-4/5 aspect-2/1 max-h-full shadow-2xl rounded-lg border border-brdr-2`}
            >
                {maze.map((row, i) =>
                    row.map((node, j) => (
                        <Cell
                            key={`${i}-${j}`}
                            i={i}
                            j={j}
                            cols={cols}
                            rows={rows}
                            node={node}
                            onClick={handleGridOnClick}
                            isMouseDownRef={isMouseDownRef}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

type CellProps = {
    i: number;
    j: number;
    cols: number;
    rows: number;
    node: CellType;
    onClick: (row: number, col: number) => void;
    isMouseDownRef: React.RefObject<boolean>;
};

const Cell = React.memo(
    ({ i, j, cols, rows, node, onClick, isMouseDownRef }: CellProps) => {
        const cellColor = (state: CellState) => {
            switch (state) {
                case 'start':
                    return 'bg-start';
                case 'end':
                    return 'bg-end';
                case 'path':
                    return 'bg-path';
                case 'unvisited':
                    return 'bg-white';
                case 'visited':
                    return 'bg-visited';
                case 'wall':
                    return 'bg-wall';
                default:
                    throw new Error('State not found');
            }
        };
        return (
            <div
                onMouseDown={() => {
                    isMouseDownRef.current = true;
                    onClick(i, j);
                }}
                onMouseEnter={() => {
                    if (isMouseDownRef.current) onClick(i, j);
                }}
                onMouseUp={() => (isMouseDownRef.current = false)}
                className={`w-full h-full border border-brdr-1 cursor-pointer
                                ${i === 0 && j === 0 ? 'rounded-tl-lg' : i === 0 && j === cols - 1 ? 'rounded-tr-lg' : i === rows - 1 && j === 0 ? 'rounded-bl-lg' : i === rows - 1 && j === cols - 1 ? 'rounded-br-lg' : ''}
                                ${cellColor(node.state)}`}
            ></div>
        );
    },
    (prev, next) => {
        return prev.node.state === next.node.state;
    }
);

export default Maze;
