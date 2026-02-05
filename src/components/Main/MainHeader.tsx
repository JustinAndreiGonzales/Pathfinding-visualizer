import { useState } from 'react';
import { DropdownIcon } from '../../icons/DropdownIcon';
import Toggle from '../simple/Toggle';
import { useSettingsContext } from '../../hooks/useSettingsContext';

const MainHeader = () => {
    const { isDiagonal, setIsDiagonal } = useSettingsContext();
    return (
        <div className='w-full flex items-center justify-between py-3 px-6 inter font-normal text-[14px] text-tertiary bg-white border-b border-brdr-1'>
            <div className='flex flex-col gap-2'>
                <span className='text-black font-semibold text-lg'>
                    Grid Visualization
                </span>
                Click and drag to draw walls. Move start (green) and end (red)
                nodes.
            </div>
            <div className='flex gap-6 text-lg'>
                <div className='flex items-center justify-center whitespace-nowrap gap-2'>
                    Grid Size:
                    <Dropdown />
                </div>
                <div className='flex items-center justify-center font-medium gap-2'>
                    <Toggle
                        isToggled={isDiagonal}
                        onClick={() => setIsDiagonal((prev) => !prev)}
                    />
                    Diagonal
                </div>
            </div>
        </div>
    );
};

// TODO: check if can convert to component
const Dropdown = () => {
    const { gridSizes, currGridSize, setGridSize } = useSettingsContext();

    const [isDropDownShowing, setIsDropDownShowing] = useState(false);
    return (
        <div className='relative w-full cursor-pointer'>
            <div onClick={() => setIsDropDownShowing((prev) => !prev)}>
                <div className='w-full font-medium text-[16px] rounded-lg p-4 py-2 pr-10 inter text-secondary bg-white border border-brdr-2'>
                    {currGridSize}
                </div>
                <div className='absolute flex items-center inset-y-0 right-0 pr-3'>
                    <DropdownIcon className='w-4 h-4 text-gray-500' />
                </div>
            </div>
            {isDropDownShowing && (
                <div className='absolute flex flex-col top-[80%] p-4 pb-2 bg-white border border-t-0 border-brdr-2 rounded-b-lg w-full font-medium text-[16px] text-secondary'>
                    {gridSizes
                        .filter((size) => size !== currGridSize)
                        .map((size, _) => (
                            <div
                                className='cursor-pointer'
                                key={size}
                                onClick={() => {
                                    setGridSize(size);
                                    setIsDropDownShowing(false);
                                }}
                            >
                                {size}
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default MainHeader;
