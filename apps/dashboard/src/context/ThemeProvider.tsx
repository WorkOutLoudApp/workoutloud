import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
  } from 'react'
  
  interface ThemeInterface {
    theme : {
        darkMode: boolean
    }
    setTheme: React.Dispatch<React.SetStateAction<any>>
  }

  interface Theme {
    darkMode: boolean
  }

  const defaultTheme = {darkMode: false}
  
  const ThemeContext = createContext({} as ThemeInterface)
  
  export const ThemeProvider = ({ children }: any) => {
    const [theme, setTheme] = useState(undefined)
    // check if theme is in local storage
    useEffect(() => {
      const storedTheme = JSON.parse(localStorage.getItem('theme'))
      if (storedTheme) {
        setTheme(storedTheme)
      } else {
        setTheme(defaultTheme)
        localStorage.setItem('theme', JSON.stringify(defaultTheme))
      }
    }, [])
  
    const value = useMemo(
      () => ({ theme, setTheme}),
      [theme, setTheme]
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
  