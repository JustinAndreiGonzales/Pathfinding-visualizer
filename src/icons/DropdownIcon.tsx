import type { IconProps } from '../types';

export const DropdownIcon = ({ className = '' }: IconProps) => {
    return (
        <svg
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            className={className}
        >
            <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M19 9l-7 7-7-7'
            />
        </svg>
    );
};
