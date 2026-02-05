import Header from './components/Header';
import Layout from './components/Layout';

function App() {
    return (
        <div className='h-screen grid grid-rows-[64px_1fr]'>
            <Header />
            <Layout />
        </div>
    );
}

export default App;
