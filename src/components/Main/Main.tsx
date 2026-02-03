import type { CellState } from '../../types';
import MainHeader from './MainHeader';
import Maze from './Maze';

const Main = () => {
    const { x, y } = { x: 25, y: 50 };
    const grid = Array.from({ length: x }, () =>
        Array.from({ length: y }, () => 'unvisited' as CellState)
    );
    return (
        <div className='bg-bg-2 w-full flex flex-col'>
            <MainHeader />
            <Maze size={[x, y]} grid={grid} />
        </div>
    );
};

export default Main;
