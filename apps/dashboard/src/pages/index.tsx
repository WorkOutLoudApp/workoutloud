import React from 'react';
import Link from 'next/link';
import Homepage from '../assets/Homepage.png';
import Navbar from '@src/components/Navbar';
import Footer from '@src/pages/footer/index';

const Home = () => {
  return (
    <div style={{
      background: `linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)`,
      height: `100vh`,
      width: `100vw`
    }}>
      <section id="home" className="flex flex-col gap-16 py-10 md:h-full md:pb-0">
        {/* IMAGE AND MAIN HEADER */}
        <div className="mx-auto w-5/6 items-left justify-left md:flex md:h-5/6">
          {/* MAIN HEADER */}
          <div className="z-10 mt-32 md:basis-3/5">
            {/* HEADINGS */}
            <div className="relative md:-mt-20">
              <div className="before:absolute before:-top-20 before:-left-20 before:z-[-1] md:before:content-evolvetext">
                <img src={Homepage.src} alt="Homepage"/>
              </div>
              <h1 className="mt-8 text-3xl font-bold text-gray-900">Get Fit with Ease</h1>
              <p className="mt-2 text-sm text-gray-700">
                A gym right at your fingertips. Convenient and accessible training sessions to help you get the body you've always wanted.
              </p>
            </div>
            {/* ACTIONS */}
            <div className='mt-8 flex items-center gap-8'>
              <Link href='/register'>
                <button type='submit' className='font-["Poppins", San-serif] font-san text-white text-lg rounded cursor-pointer bg-indigo-500 hover:bg-indigo-600 px-2 py-1'>Join Today</button>
              </Link>
            </div>
          </div>
        </div>
        <Footer/>
      </section>
    </div>
  );
};

export default Home