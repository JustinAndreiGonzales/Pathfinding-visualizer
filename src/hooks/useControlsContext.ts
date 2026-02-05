import { useContext } from 'react';
import { ControlsContext } from '../context/ControlsContext';

export const useControlsContext = () => {
    const context = useContext(ControlsContext);

    if (!context) {
        throw new Error(
            'useControlsContext must be used within ControlsProvider'
        );
    }

    return context;
};
