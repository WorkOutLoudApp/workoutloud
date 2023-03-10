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

// import PUBLIC_GOOGLE_API_TOKEN from '@src/utils/keys'

let PUBLIC_GOOGLE_API_TOKEN = ''
axios
  .get(`http://localhost:4000/v1/key/google`)
  .then((response) => {
    PUBLIC_GOOGLE_API_TOKEN = response.data.key
  })
  .catch((error) => {
    console.log(error)
  })

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
          <div className="font-poppins h-screen">
              <Navbar/>
              {isMobile ? (
                <div className='flex pt-20 w-full' >
                <Component {...pageProps} />
                </div>
              ) : (
                <div className='flex flex-row h-full pt-14'>
                  <div className='flex fixed w-52 border-r-2 border-gray-300 h-full overflow-hidden hover:overflow-auto'>
                    <Sidebar />
                  </div>
                  <div className='flex pl-52 w-full' >
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
