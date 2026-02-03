import type { CellState } from '../../types';

type MazeProps = {
    size: [number, number];
    grid: CellState[][];
};

const Maze = ({ size, grid }: MazeProps) => {
    const gridRowCol = (() => {
        switch (size[0]) {
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
                {grid.map((row, i) =>
                    row.map((cell, j) => (
                        <div
                            key={`${i}-${j}`}
                            className={`w-full h-full border border-brdr-1 bg-white cursor-pointer
                                ${i === 0 && j === 0 ? 'rounded-tl-lg' : i === 0 && j === size[1] - 1 ? 'rounded-tr-lg' : i === size[0] - 1 && j === 0 ? 'rounded-bl-lg' : i === size[0] - 1 && j === size[1] - 1 ? 'rounded-br-lg' : ''}
                                `}
                        ></div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Maze;
