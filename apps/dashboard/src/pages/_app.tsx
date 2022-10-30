import type { AppProps } from 'next/app'
import React from 'react'
// import 'tailwindcss/tailwind.css'
import '../styles/index.css'

import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="font-inter">
      <Navbar />
      <div className='flex gap-6'>
        <div className='h-[92vh] overflow-hidden xl:hover:overflow-auto'>
          <Sidebar />
        </div>
        <div >
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  )
}

export default App
