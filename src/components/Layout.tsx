import Main from './Main/Main';
import Sidebar from './Sidebar';

const Layout = () => {
    return (
        <div
            className='grid grid-cols-[320px_1fr] w-screen'
            style={{ height: 'calc(100vh - 64px)' }}
        >
            <Sidebar />
            <Main />
        </div>
    );
};

export default Layout;
