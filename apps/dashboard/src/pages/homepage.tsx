import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Homepage from '../assets/Homepage.png'
import HomepageGraphic from '../assets/HomepageGraphic.png'
import Navbar from '@src/components/Navbar'
import Footer from '@src/pages/footer/index'

function Home() {

  return (
    
    <section id="home" className="gap-16 bg-gray-20 py-10 md:h-full md:pb-0">
      {/* IMAGE AND MAIN HEADER */}
      <div
        className="mx-auto w-5/6 items-center justify-center md:flex md:h-5/6"      >
        {/* MAIN HEADER */}
        <div className="z-10 mt-32 md:basis-3/5">
          {/* HEADINGS */}
          <div
            className="md:-mt-20"
          >
            <div className="relative">
              <div className="before:absolute before:-top-20 before:-left-20 before:z-[-1] md:before:content-evolvetext">
                <img src={Homepage.src} alt='Homepage'/>
              </div>
            </div>

            <p className="mt-8 text-sm">
              A Gym Right at Your Figertips. Training Sessions Convenient and Accessible. Get Your Dream
              Body Today.
            </p>
          </div>

          {/* ACTIONS */}
            <div className='mt-8 flex items-center gap-8'>
            <Link href='/register'>
              <button type='submit' className='font-["Roboto"] font-san text-white text-xl rounded cursor-pointer bg-indigo-500 hover:bg-indigo-600 px-2 py-1'>Join Today</button>
            </Link>
            </div>
          </div>
        </div>

        {/* IMAGE */}
        <div
          className="flex basis-3/5 justify-center md:z-10
              md:ml-40 md:mt-16 md:justify-items-end"
        >
          <img alt='HomepageGraphic' />
        </div>
      <Footer />
    </section>

  )
}

export default Home
