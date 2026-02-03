import type { IconProps } from '../types';

export const LogoIcon = ({ className = '' }: IconProps) => {
    return (
        <svg
            // width='40'
            // height='40'
            viewBox='0 0 40 40'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className={className}
        >
            <path
                d='M12.3077 24.6154V6.15385H21.5385V9.23077H15.3846V24.6154H21.5385V27.6923H3.07692V36.9231H12.3077V33.8462H6.15385V30.7692H21.5385V33.8462H15.3846V36.9231H33.8462V40H0V0H3.07692V15.3846H9.23077V21.5385H6.15385V18.4615H3.07692V24.6154H12.3077ZM40 0V40H36.9231V33.8462H24.6154V24.6154H33.8462V27.6923H27.6923V30.7692H36.9231V21.5385H24.6154V15.3846H21.5385V21.5385H18.4615V12.3077H30.7692V9.23077H24.6154V6.15385H33.8462V15.3846H27.6923V18.4615H36.9231V3.07692H9.23077V12.3077H6.15385V0H40Z'
                fill='currentColor'
            />
        </svg>
    );
};
