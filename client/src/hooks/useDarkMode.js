import {useEffect} from 'react';
import {useLocalStorage} from './useLocalStorage'

export const useDarkMode = (initialMode) => {
    const [darkMode, setDarkMode] = useLocalStorage("darkMode", initialMode);

    useEffect(() => {
        darkMode ? document.body.classList.add("dark-mode") : document.body.classList.remove("dark-mode");
    }, [darkMode] )

return [darkMode, setDarkMode]
};