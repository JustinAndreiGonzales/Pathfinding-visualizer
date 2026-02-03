type ToggleProps = {
    isToggled: boolean;
    onClick: () => void;
};

const Toggle = ({ isToggled, onClick }: ToggleProps) => {
    return (
        <div
            onClick={onClick}
            className={`relative cursor-pointer w-12 h-7 p-0.75 rounded-3xl ${isToggled ? 'bg-primary-2' : 'bg-bg-2'} transition-color ease-in-out duration-200`}
        >
            <div
                className={`absolute ${isToggled ? 'right-0.5' : 'left-0.5 border border-brdr-2'} top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full transition-transform ease-in-out duration-300`}
            />
        </div>
    );
};

export default Toggle;
