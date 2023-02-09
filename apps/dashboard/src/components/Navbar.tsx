import React from 'react'
import Link from 'next/link'
import { FaUserCircle } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
import { HiUser } from 'react-icons/hi'
import { IoLogOut, IoNotifications } from 'react-icons/io5'

import { navbarItems, navbarItemsMobile } from '@src/utils/constants/navbar'
import { googleLogout } from '@react-oauth/google'
import { useContext, useEffect, useRef, useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import WindowTypeContext from '../context/WindowTypeProvider'

const Navbar = () => {
  const isMobile = useContext(WindowTypeContext)
  const { auth, setAuth, user, setUser } = useAuth()
  const [showUserTooltip, setShowUserTooltip] = useState(false)
  const wrapperRef = useRef(null)
  const wrapperNotificationRef = useRef(null)
  const userButtonRef = useRef(null)
  const notificationButtonRef = useRef(null)
  const [showNotificationTooltip, setShowNotificationTooltip] = useState(false)

  const itemStyle = "grid justify-items-center cursor-pointer py-1 hover:rounded-lg hover:bg-gray-200"
  const itemStyleActive = "grid justify-items-center cursor-pointer py-1 rounded-lg bg-gray-200"

  const handleUserOnClick = () => {
    setShowUserTooltip(!showUserTooltip)
  }

  const handleNotificationOnClick = () => {
    setShowNotificationTooltip(!showNotificationTooltip)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if ((wrapperRef.current && userButtonRef.current && !wrapperRef.current.contains(event.target) && !userButtonRef.current.contains(event.target)) || (wrapperRef.current && !userButtonRef.current && !wrapperRef.current.contains(event.target))) {
      setShowUserTooltip(false);
    }
    if ((wrapperNotificationRef.current && notificationButtonRef.current && !wrapperNotificationRef.current.contains(event.target) && !notificationButtonRef.current.contains(event.target)) || (wrapperNotificationRef.current && !notificationButtonRef.current && !wrapperNotificationRef.current.contains(event.target))) {
      setShowNotificationTooltip(false)
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, [])

  return (
    <div className='z-50'>
      {isMobile ? (
        // Mobile
        <nav className='block flex-wrap w-full justify-between items-center border-b-2 border-gray-300 py-2 px-2 text-2xl '>
          <div className='flex justify-between'>
            {/* Logo */}
            <div className='flex basis-1/5'>
              <Link href='/'>
                <p className='font-poppins text-indigo-600 font-bold cursor-pointer'>
                  WorkOutLoud
                </p>
              </Link>
            </div>

            {/* Login / Menu */}
            <div className='flex basis-1/5 justify-end'>
              {/* Login */}
              {!user && (
                <Link href='/login'>
                  <div className='flex item-center'>
                    <p className='font-poppins text-white text-xl rounded cursor-pointer bg-indigo-500 hover:bg-indigo-600  px-2 py-1'>Login</p>
                  </div>
                </Link>
              )}

              {/* Menu */}
              <Link href='/menu'>
                <div className='flex items-center'>
                  <GiHamburgerMenu className='cursor-pointer rounded-full px-1 text-3xl bg-gray-200' />
                </div>
              </Link>
            </div>
          </div>

          {/* Home / Workout / Friends / Noti */}
          {user &&
            <div className='grid grid-cols-4 justify-items-stretch items-center mt-1'>
              {navbarItemsMobile.map((item) => (
                <Link key={item.name} href={item.path}>
                  <div className={`${(item.path === window.location.pathname) || (window.location.pathname.match(item.name)) ? itemStyleActive : itemStyle}`}>
                    {(item.path === window.location.pathname) || (window.location.pathname.match(item.name)) ? item.iconActive : item.icon}
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
                <p className='font-poppins text-indigo-600 font-bold cursor-pointer'>
                  WorkOutLoud
                </p>
              </Link>
            </div>

            {/* Home / Workout / Friends */}
            {user &&
              <div className='grid basis-2/4 grid-cols-3 items-center'>
                {navbarItems.map((item) => (
                  <Link key={item.name} href={item.path}>
                    <div className={`${(item.path === window.location.pathname) || (window.location.pathname.match(item.name)) ? itemStyleActive : itemStyle}`}>
                      {(item.path === window.location.pathname) || (window.location.pathname.match(item.name)) ? item.iconActive : item.icon}
                    </div>
                  </Link>
                ))}
              </div>
            }

            {/* Noti / User || Login / Menu */}
            <div className='flex basis-1/4 justify-end h-full'>
              <div className='flex justify-end items-center h-full'>
                {user ? (
                  <div className='flex flex-row items-center space-x-4 h-full py-0.5'>
                    {/* Currenly only working for Desktop */}
                    <button ref={notificationButtonRef} type='button' className='flex h-full' onClick={handleNotificationOnClick}>
                      <div className='flex aspect-square items-center place-content-center h-full rounded-full bg-gray-200 cursor-pointer'>
                        <IoNotifications className='p-0.5' />
                      </div>
                    </button>


                    <div className='flex aspect-square items-center place-content-center h-full rounded-full bg-gray-200'>
                      <button ref={userButtonRef} type='button' onClick={handleUserOnClick}
                        className='cursor-pointer'
                      >
                        {user.avatar ? (
                          <img src={user.avatar} alt='avatar' className='rounded-full h-auto align-middle' />
                        ) : (
                          <HiUser className='p-0.5' />
                        )}
                      </button>
                    </div>
                  </div>

                ) : (
                  <Link href='/login'>
                    <p className='font-poppins text-white text-xl rounded cursor-pointer bg-indigo-500 hover:bg-indigo-600  px-2 py-1'>Login</p>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Tooltips */}
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
                    localStorage.removeItem('user')
                    setShowUserTooltip(false)
                    googleLogout()
                    setUser(null)
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
          <aside className='relative'>
            {showNotificationTooltip && (
              <menu ref={wrapperNotificationRef} className='absolute flex flex-col top-0 right-0 mt-2 border-2 rounded-md bg-white drop-shadow-md px-2 py-2 text-lg'>
                <Link href='/notifications'>
                  <div className='notification-dropdown'>
                    {/* Testing purposes. Need to add live data in the future */}
                    <p className='flex items-center rounded-md px-2 py-1 hover:bg-gray-200'>Notifcation 1</p>
                    <p className='flex items-center rounded-md px-2 py-1 hover:bg-gray-200'>Notifcation 2</p>
                    <p className='flex items-center rounded-md px-2 py-1 hover:bg-gray-200'>Notifcation 3</p>
                  </div>
                </Link>
              </menu>
            )}
          </aside>
        </nav>

      )}

    </div>
  )

}

export default Navbar

