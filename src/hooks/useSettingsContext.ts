import { useContext } from 'react';
import { SettingsContext } from '../context/SettingsContext';

export const useSettingsContext = () => {
    const context = useContext(SettingsContext);

    if (!context) {
        throw new Error(
            'useSettingsContext must be used within SettingsProvider'
        );
    }

    return context;
};
