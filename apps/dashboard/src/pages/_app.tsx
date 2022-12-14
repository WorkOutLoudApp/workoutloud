import type { AppProps } from 'next/app'
import React, { useEffect, useState } from 'react'
import '../styles/index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { AuthProvider } from '../context/AuthProvider'
import WindowTypeContext from '../context/WindowTypeProvider'

import PUBLIC_GOOGLE_API_TOKEN from '../utils/keys'

function App({ Component, pageProps }: AppProps) {
  const [width, setWidth] = useState(undefined)

  useEffect(() => {
    // to be called on window resize
    const handleWindowResize = () => {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleWindowResize)

    handleWindowResize()

    // Remove event listener on clean up
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  const isMobile = width <= 768

  return (
    <WindowTypeContext.Provider value={isMobile}>
      <AuthProvider>
        <GoogleOAuthProvider clientId={PUBLIC_GOOGLE_API_TOKEN}>
          <div className="font-inter">
            <Navbar/>
            {isMobile ? (
              <Component {...pageProps} />
            ) : (
              <div className='flex gap-6'>
                <div className='flex basis-1/5 h-[92vh] overflow-hidden hover:overflow-auto'>
                  <Sidebar />
                </div>
                <div className='flex basis-4/5' >
                  <Component {...pageProps} />
                </div>
              </div>
            )}
          </div>
        </GoogleOAuthProvider>
      </AuthProvider>
    </WindowTypeContext.Provider>
  )
}

export default App
