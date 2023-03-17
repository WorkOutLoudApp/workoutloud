import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
  } from 'react'
import {lightModeColors, darkModeColors} from '@src/utils/constants/theme'


  interface ThemeInterface {
    theme : {
      darkMode: boolean
    }
    setTheme: React.Dispatch<React.SetStateAction<any>>
    colors: any
    setColors: React.Dispatch<React.SetStateAction<any>>
  }

  interface Theme {
    darkMode: boolean
  }

  const defaultTheme = {darkMode: false}
  
  const ThemeContext = createContext({} as ThemeInterface)
  
  export const ThemeProvider = ({ children }: any) => {
    const [theme, setTheme] = useState(defaultTheme)
    const [colors, setColors] = useState(lightModeColors)

    // check if theme is in local storage
    useEffect(() => {
      const storedTheme = JSON.parse(localStorage.getItem('theme'))
      if (storedTheme) {
        setTheme(storedTheme)
        setColors(storedTheme.darkMode? darkModeColors : lightModeColors)
      } else {
        localStorage.setItem('theme', JSON.stringify(defaultTheme))
      } 
    }, [])
  
    const value = useMemo(
      () => ({ theme, setTheme, colors, setColors}),
      [theme, setTheme, colors, setColors]
    )
  
    return (
      // return template
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    )
  }

  export default ThemeContext
  
  export const saveTheme = (newTheme: Theme) => {
    localStorage.setItem('theme', JSON.stringify(newTheme))
  }
  
  export const useTheme = () => useContext(ThemeContext)