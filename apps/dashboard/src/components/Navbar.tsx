import Link from 'next/link'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoNotifications, IoLogOut } from 'react-icons/io5'
import { HiUser } from 'react-icons/hi'
import { FaUserCircle } from 'react-icons/fa'

import React, { useRef, useEffect, useState, useContext } from 'react'
import WindowTypeContext from '../context/WindowTypeProvider'
import { useAuth } from '../context/AuthProvider'
import { navbarItemsMobile, navbarItems } from '@src/utils/constants'

const Navbar = () => {
  const isMobile = useContext(WindowTypeContext)
  const { auth, setAuth } = useAuth()
  const [showUserTooltip, setShowUserTooltip] = useState(false)
  const wrapperRef = useRef(null)
  const userButtonRef = useRef(null)

  const itemStyle = "grid justify-items-center cursor-pointer py-1 hover:rounded-lg hover:bg-gray-200"
  const itemStyleActive = "grid justify-items-center cursor-pointer py-1 rounded-lg bg-gray-200"

  const handleUserOnClick = () => {
    setShowUserTooltip(!showUserTooltip)
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, [])

  const handleClickOutside = (event: MouseEvent) => {
    if ((wrapperRef.current && userButtonRef.current && !wrapperRef.current.contains(event.target) && !userButtonRef.current.contains(event.target)) || (wrapperRef.current && !userButtonRef.current && !wrapperRef.current.contains(event.target))) {
      setShowUserTooltip(false);
    }
  }

  return (
    <body>
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
            <div className='flex basis-1/5 justify-end gap-[2vw]'>
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
              {/* <Link href='/'>
                <div className={itemStyle}>
                  <AiFillHome />
                </div>
              </Link>

              <Link href='/workout'>
                <div className={itemStyle}>
                  <IoBarbell />
                </div>
              </Link>

              <Link href='/friends'>
                <div className={itemStyle}>
                  <MdGroups />
                </div>
              </Link>

              <Link href='/notifications'>
                <div className={itemStyle}>
                  <IoNotifications />
                </div>
              </Link> */}

            </div>
          }
        </nav>
      ) : (
        // Desktop
        <nav className='block w-full justify-between items-center border-b-2 border-gray-300 py-2 px-2 text-2xl '>
          <div className='flex justify-between'>
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
                {/* <Link href='/'>
                  <div className={itemStyle}>
                    <AiFillHome />
                  </div>
                </Link>

                <Link href='/workout'>
                  <div className={itemStyle}>
                    <IoBarbell />
                  </div>
                </Link>

                <Link href='/friends'>
                  <div className={itemStyle}>
                    <MdGroups />
                  </div>
                </Link> */}
              </div>
            }

            {/* Noti / User || Login / Menu */}
            <div className='flex basis-1/4 justify-end gap-[2vw]'>
              <div className='flex items-center'>
                {auth ? (
                  <div className='flex gap-[2vw]'>
                    <Link href='/notifications'>
                      <div className='flex bg-gray-200 rounded-full items-center px-1 py-1 cursor-pointer'>
                        <IoNotifications className='px-0.5' />
                      </div>
                    </Link>

                    <button ref={userButtonRef} type='button' onClick={handleUserOnClick}>
                      <div className='flex bg-gray-200 rounded-full items-center px-1 py-1 cursor-pointer'>
                        {/* TODO: replace with user's avatar */}
                        <HiUser className='px-0.5' />
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
              <menu ref={wrapperRef} className='absolute flex flex-col top-0 right-0 mt-2 border-2 rounded-md bg-white drop-shadow-md px-2 py-2 gap-1 text-lg'>
                <li className='flex items-center rounded-md px-2 py-1 hover:bg-gray-200'>
                  <div className='rounded-full bg-gray-300 px-1 py-1 mr-2'>
                    <FaUserCircle />
                  </div>
                  <Link href='/profile'>
                    <button type='button' onClick={() => setShowUserTooltip(false)}>
                      Profile

                    </button>
                  </Link>
                </li>

                <li className='flex items-center rounded-md px-2 py-1 hover:bg-gray-200'>
                  <div className='rounded-full bg-gray-300 px-1 py-1 mr-2'>
                    <IoLogOut />
                  </div>
                  <Link href='/'>
                    <button type='button' onClick={() => {
                      setShowUserTooltip(false)
                      setAuth(false)
                    }}>Logout</button>
                  </Link>
                </li>
              </menu>
            )}
          </aside>
        </nav>

      )}

    </body>
  )

}

export default Navbar

