import { useEffect, useState } from "react";
import { ThemeContext } from "./theme.context";


export const STORAGE_KEY = 'key-theme';

function ThemeProvider({children}){

    const [theme,setTheme] = useState(() => localStorage.getItem(STORAGE_KEY))

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, theme)
    }, [theme])

    return (

        <ThemeContext.Provider value={[theme,setTheme]}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;