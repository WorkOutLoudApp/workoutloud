import React from 'react'
import Link from 'next/link'
import Homepage from '../assets/Homepage.png'
import backgroundworkout from '../assets/backgroundworkout.png'
import homeworkout from '../assets/homeworkout.png'
import Navbar from '@src/components/Navbar'
import { useAuth } from '@src/context/AuthProvider'
import FooterImg from '@src/assets/FooterImg.png'

const Home = () => {
  const { auth, setAuth, user, setUser } = useAuth()

  return (
    <div
      style={{
        background: `linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)`,
        height: `100vh`,
        width: `100vw`,
      }}
    >
      <section
        id="home"
        className="flex flex-col gap-16 py-10 md:h-full md:pb-0"
      >
        {/* IMAGE AND MAIN HEADER */}
        <div className="items-left justify-left mx-auto flex w-5/6 md:flex md:h-5/6">
          {/* MAIN HEADER */}
          <div className="z-10 mt-32 md:basis-3/5">
            <div className="relative">
              <div className="md:before:content-workoutloudtext before:absolute before:-top-20 before:-left-20 before:z-[-1]">
                <img src={backgroundworkout.src} alt="backgroundworkout" />
              </div>
            </div>
            {/* HEADINGS */}
            <div className="relative md:-mt-20">
              <div className="md:before:content-evolvetext before:absolute before:-top-20 before:-left-20 before:z-[-1]">
                <img src={Homepage.src} alt="Homepage" />
              </div>
              <h1 className="mt-8 text-3xl font-bold text-gray-900">
                Get Fit with Ease
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                A gym right at your fingertips. Convenient and accessible
                training sessions to help you get the body you've always wanted.
              </p>
            </div>
            {/* ACTIONS */}
            {!auth && (
              <div className="mt-8 flex items-center gap-8">
                <Link href="/register">
                  <button
                    type="submit"
                    className='font-["Poppins", San-serif] font-san cursor-pointer rounded bg-indigo-500 px-2 py-1 text-lg text-white hover:bg-indigo-600'
                  >
                    Join Today
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      <footer className="bg-primary-100 py-16">
        <div className="mx-auto w-5/6 gap-16 md:flex">
          <div className="mt-16 basis-1/4 md:mt-0">
            <h4 className="font-bold">Links</h4>
            <p className="my-5">About us</p>
            <p className="my-5">FAQ</p>
            <p>Careers</p>
          </div>
          <div className="mt-16 basis-1/4 md:mt-0">
            <h4 className="font-bold">Contact Us</h4>
            <p className="my-5">support@workoutloud.com</p>
            <p>(123)456-7890</p>
          </div>
          <div className="mt-16 basis-1/2 md:mt-0">
            <img src={FooterImg.src} alt="Bottom" />
            <p className="my-5"></p>
            <p>© 2023-2024 WorkOutLoud All Rights Reserved.</p>
          </div>
        </div>
      </footer>
      </section>
    </div>
  )
}

export default Home
