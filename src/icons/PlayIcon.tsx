import type { IconProps } from '../types';

export const PlayIcon = ({ className = '' }: IconProps) => {
    return (
        <svg
            // width='12'
            // height='16'
            viewBox='0 0 12 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className={className}
        >
            <path
                d='M11.444 6.88963C11.615 7.01172 11.7553 7.17691 11.8523 7.37058C11.9493 7.56425 12 7.78043 12 8C12 8.21957 11.9493 8.43575 11.8523 8.62942C11.7553 8.82309 11.615 8.98828 11.444 9.11037L1.84207 15.7934C1.04254 16.3486 0 15.7198 0 14.6814V1.31857C0 0.280195 1.04254 -0.348589 1.84207 0.206597L11.444 6.88963Z'
                fill='currentColor'
            />
        </svg>
    );
};
