import Header from './components/Header';
import Main from './components/Main/Main';
import Sidebar from './components/Sidebar';

function App() {
    return (
        <div className='h-screen overflow-hidden grid grid-cols-[320px_1fr] grid-rows-[64px_1fr]'>
            <Header />
            <Sidebar />
            <Main />
        </div>
    );
}

export default App;
