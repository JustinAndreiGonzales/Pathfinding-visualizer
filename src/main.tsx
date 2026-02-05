import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { VisualizerProvider } from './context/VisualizerProvider.tsx';

createRoot(document.getElementById('root')!).render(
    <VisualizerProvider>
        <App />
    </VisualizerProvider>
);
