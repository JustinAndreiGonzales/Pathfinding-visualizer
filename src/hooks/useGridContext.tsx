import { useContext } from 'react';
import { GridContext } from '../context/GridContext';

export const useGridContext = () => {
    const context = useContext(GridContext);

    if (!context) {
        throw new Error('useGridContext must be used within GridProvider');
    }

    return context;
};
