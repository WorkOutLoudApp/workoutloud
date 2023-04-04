import { GoogleOAuthProvider } from '@react-oauth/google'
import axios from 'axios'
import type { AppProps } from 'next/app'
import React, { useEffect, useState } from 'react'
import '../styles/index.css'

import Playbar from '../components/Playbar'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { AuthProvider } from '../context/AuthProvider'
import WindowTypeContext from '../context/WindowTypeProvider'
import { ThemeProvider } from '@src/context/ThemeProvider'
import {SpeechProvider} from '@src/context/SpeechProvider'
import { PlayStatusProvider } from '@src/context/PlayStatus'

let PUBLIC_GOOGLE_API_TOKEN = ''
axios.get(`http://localhost:4000/v1/key/google`).then((response) => {
  PUBLIC_GOOGLE_API_TOKEN = response.data.key
}).catch((error) => {
  console.log(error)
})

function App({ Component, pageProps }: AppProps) {
  const [width, setWidth] = useState(undefined)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // to be called on window resize
    const handleWindowResize = () => {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleWindowResize)

    const storedTheme = JSON.parse(localStorage.getItem('theme'))
    if (storedTheme) {
      setIsDark(storedTheme.isDark)
    }
    // Remove event listener on clean up
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  const isMobile = width <= 768

  return (
    <WindowTypeContext.Provider value={isMobile}>
      <ThemeProvider theme={{ isDark }}>
        <AuthProvider>
          <GoogleOAuthProvider clientId={PUBLIC_GOOGLE_API_TOKEN}>
            <SpeechProvider>
              <PlayStatusProvider>
            <div className={`${isDark ? 'dark' : 'light'}`}>
              <div className="font-poppins h-screen bg-primary dark:bg-primary-dark text dark:text-dark">
                <Navbar {...{ isDark, setIsDark }} />
                <div className='bg-primary dark:bg-primary-dark'>
                {isMobile ? (
                  <div className='flex pt-20 w-full pb-14' >
                    <Component {...pageProps} />
                  </div>
                ) : (
                  <div className='flex flex-row pt-14 pb-14'>
                    <div className='flex fixed w-52 border-r-2 border-gray-300 dark:border-primary-variant-dark h-full overflow-hidden hover:overflow-auto'>
                      <Sidebar />
                    </div>
                    <div className='flex pl-52 w-full' >
                      <Component {...pageProps} />
                    </div>
                  </div>
                )}
                </div>
              </div>

            </div>
            </PlayStatusProvider>
            </SpeechProvider>
          </GoogleOAuthProvider>
        </AuthProvider>
      </ThemeProvider>
    </WindowTypeContext.Provider>
  )
}

export default App
