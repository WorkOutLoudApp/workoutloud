import type { AppProps } from 'next/app'
import React from 'react'
// import 'tailwindcss/tailwind.css'
// import '../styles/index.css'

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="font-inter">
      <title>WorkOutLoud</title>
      <Component {...pageProps} />
    </div>
  )
}

export default App
