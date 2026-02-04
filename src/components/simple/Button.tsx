import type React from 'react';
import type { IconProps } from '../../types';

type ButtonProps = {
    type: 'primary' | 'secondary';
    text: string;
    Icon: React.ComponentType<IconProps>;
    onClick: () => void;
};

const Button = ({ type, text, Icon, onClick }: ButtonProps) => {
    const { textColor, bgColor, border } =
        type === 'primary'
            ? {
                  textColor: 'text-white',
                  bgColor: 'bg-linear-to-r from-primary-2 to-primary-1',
                  border: '',
              }
            : {
                  textColor: 'text-secondary',
                  bgColor: 'bg-white',
                  border: 'border border-brdr-2',
              };
    return (
        <div
            onClick={onClick}
            className={`flex justify-center items-center w-full gap-2 inter font-medium text-[16px] py-4 rounded-lg ${bgColor} ${border} ${textColor} cursor-pointer`}
        >
            <Icon className='w-5 h-5' />
            {text}
        </div>
    );
};

export default Button;
