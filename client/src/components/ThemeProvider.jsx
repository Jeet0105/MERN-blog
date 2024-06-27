import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function ThemeProvider({ children }) {
    const { theme } = useSelector(state => state.theme);

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (
        <div>
            <div className='bg-white text-gray-700 dark:text-gray-200 dark:bg-gray-900 min-h-screen'>
                {children}
            </div>
        </div>
    );
}
