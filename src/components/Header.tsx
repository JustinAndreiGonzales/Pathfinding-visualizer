import { GithubIcon } from '../icons/GithubIcon';
import { HelpIcon } from '../icons/HelpIcon';
import { LogoIcon } from '../icons/LogoIcon';

const Header = () => {
    // TODO: hover icons
    // TODO: link to github
    // TODO: help icon
    return (
        <div className='flex items-center justify-between px-6 py-3 border-b border-brdr-1 col-span-2'>
            <div className='flex items-center justify-center gap-6 inter font-bold text-[20px]'>
                <LogoIcon className='w-10 h-10 text-primary-1' />
                Pathfinding Visualizer
            </div>
            <div className='flex items-center justify-center gap-6'>
                <GithubIcon className='w-8 h-8 text-secondary cursor-pointer' />
                <HelpIcon className='w-8 h-8 text-secondary cursor-pointer' />
            </div>
        </div>
    );
};

export default Header;
