import React from 'react'
import Link from 'next/link'
import { FaUserCircle } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
import { HiUser } from 'react-icons/hi'
import { IoLogOut, IoNotifications } from 'react-icons/io5'

import { navbarItems, navbarItemsMobile } from '@src/utils/constants'
import { googleLogout } from '@react-oauth/google'
import { useContext, useEffect, useRef, useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import WindowTypeContext from '../context/WindowTypeProvider'

const Navbar = () => {
  const isMobile = useContext(WindowTypeContext)
  const { auth, setAuth, picture, setPicture } = useAuth()
  const [showUserTooltip, setShowUserTooltip] = useState(false)
  const wrapperRef = useRef(null)
  const userButtonRef = useRef(null)

  const itemStyle = "grid justify-items-center cursor-pointer py-1 hover:rounded-lg hover:bg-gray-200"
  const itemStyleActive = "grid justify-items-center cursor-pointer py-1 rounded-lg bg-gray-200"

  const handleUserOnClick = () => {
    setShowUserTooltip(!showUserTooltip)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if ((wrapperRef.current && userButtonRef.current && !wrapperRef.current.contains(event.target) && !userButtonRef.current.contains(event.target)) || (wrapperRef.current && !userButtonRef.current && !wrapperRef.current.contains(event.target))) {
      setShowUserTooltip(false);
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, [])

  return (
    <>
      {isMobile ? (
        // Mobile
        <nav className='block flex-wrap w-full justify-between items-center border-b-2 border-gray-300 py-2 px-2 text-2xl '>
          <div className='flex justify-between'>
            {/* Logo */}
            <div className='flex basis-1/5'>
              <Link href='/'>
                <p className='text-indigo-600 font-bold cursor-pointer'>
                  WorkOutLoud
                </p>
              </Link>
            </div>

            {/* Login / Menu */}
            <div className='flex basis-1/5 justify-end'>
              {/* Login */}
              {!auth && (
                <div className='flex item-center'>
                  <Link href='/login'>
                    <p className='font-["Roboto"] font-san text-white text-xl font-bold rounded cursor-pointer bg-indigo-500 hover:bg-indigo-600  px-2 py-1'>Login</p>
                  </Link>
                </div>
              )}

              {/* Menu */}
              <div className='flex items-center'>
                <Link href='/menu'>
                  <GiHamburgerMenu className='cursor-pointer rounded-full px-1 text-3xl bg-gray-200' />
                </Link>
              </div>
            </div>
          </div>

          {/* Home / Workout / Friends / Noti */}
          {auth &&
            <div className='grid grid-cols-4 justify-items-stretch items-center mt-1'>
              {navbarItemsMobile.map((item) => (
                <Link href={item.path}>
                  <div className={`${item.path === window.location.pathname ? itemStyleActive : itemStyle}`}>
                    {item.path === window.location.pathname ? item.iconActive : item.icon}
                  </div>
                </Link>
              ))}
            </div>
          }
        </nav>
      ) : (
        // Desktop
        <nav className='block w-full justify-between items-center border-b-2 border-gray-300 py-2 px-2 text-2xl h-14'>
          <div className='flex items-center h-full justify-between'>
            {/* Logo */}
            <div className='flex basis-1/4'>
              <Link href='/'>
                <p className='text-indigo-600 font-bold cursor-pointer'>
                  WorkOutLoud
                </p>
              </Link>
            </div>

            {/* Home / Workout / Friends */}
            {auth &&
              <div className='grid basis-2/4 grid-cols-3 items-center'>
                {navbarItems.map((item) => (
                  <Link href={item.path}>
                    <div className={`${item.path === window.location.pathname ? itemStyleActive : itemStyle}`}>
                      {item.path === window.location.pathname ? item.iconActive : item.icon}
                    </div>
                  </Link>
                ))}
              </div>
            }

            {/* Noti / User || Login / Menu */}
            <div className='flex basis-1/4 justify-end h-full'>
              <div className='flex items-center'>
                {auth ? (
                  <div className='flex flex-row space-x-4'>
                    <Link href='/notifications'>
                      <div className='bg-gray-200 rounded-full items-center px-1 py-1 cursor-pointer w-8 h-8'>
                        <IoNotifications className='px-0.5' />
                      </div>
                    </Link>


                    <button ref={userButtonRef} type='button' onClick={handleUserOnClick}
                      className='flex items-center h-full'
                    >
                      {/* <div className='flex bg-gray-200 rounded-full items-center cursor-pointer h-full'> */}
                      {/* TODO: replace with user's avatar */}
                      {/* <HiUser className='px-0.5' /> */}
                      {/* </div> */}
                      <div className='flex h-8 w-8'>
                        <img src={picture} alt='avatar' className='object-fit rounded-full' />

                      </div>

                    </button>


                  </div>

                ) : (
                  <Link href='/login'>
                    <p className='font-["Roboto"] font-san text-white text-xl font-bold rounded cursor-pointer bg-indigo-500 hover:bg-indigo-600  px-2 py-1'>Login</p>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <aside className='relative'>
            {showUserTooltip && (
              <menu ref={wrapperRef} className='absolute flex flex-col top-0 right-0 mt-2 border-2 rounded-md bg-white drop-shadow-md px-2 py-2 text-lg'>
                <Link href='/profile'>
                  <button type='button' onClick={() => setShowUserTooltip(false)}>
                    <li className='flex items-center rounded-md px-2 py-1 hover:bg-gray-200'>
                      <div className='rounded-full bg-gray-300 px-1 py-1 mr-2'>
                        <FaUserCircle />
                      </div>
                      Profile
                    </li>
                  </button>
                </Link>

                <Link href='/'>
                  <button type='button' onClick={() => {
                    setShowUserTooltip(false)
                    googleLogout()
                    setAuth(false)
                  }}>
                    <li className='flex items-center rounded-md px-2 py-1 hover:bg-gray-200'>
                      <div className='rounded-full bg-gray-300 px-1 py-1 mr-2'>
                        <IoLogOut />
                      </div>
                      Logout
                    </li>
                  </button>
                </Link>
              </menu>
            )}
          </aside>
        </nav>

      )}

    </>
  )

}

export default Navbar

