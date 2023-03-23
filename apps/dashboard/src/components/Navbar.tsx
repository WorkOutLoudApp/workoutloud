import React from 'react'
import Link from 'next/link'
import { FaUserCircle } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
import { HiUser } from 'react-icons/hi'
import { IoLogOut, IoNotifications } from 'react-icons/io5'
import { MdDarkMode, MdLightMode } from 'react-icons/md'

import { navbarItems, navbarItemsMobile} from '@src/utils/constants/navbar'
import { googleLogout } from '@react-oauth/google'
import { useContext, useEffect, useRef, useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import WindowTypeContext from '../context/WindowTypeProvider'
import MobileMenuModal from './Mobilemodal'
import { saveTheme } from '../context/ThemeProvider'

const Navbar = (props :any) => {
  //testing
  const {isDark, setIsDark} = props
  ///
  const isMobile = useContext(WindowTypeContext)
  const { auth, setAuth, user, setUser } = useAuth()
  const [showUserTooltip, setShowUserTooltip] = useState(false)
  const wrapperRef = useRef(null)
  const wrapperNotificationRef = useRef(null)
  const userButtonRef = useRef(null)
  const notificationButtonRef = useRef(null)
  const [showNotificationTooltip, setShowNotificationTooltip] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const itemStyle = `grid justify-items-center cursor-pointer py-1 hover:rounded-lg hover:bg-background dark:hover:bg-gray-700`
  const itemStyleActive = `grid justify-items-center cursor-pointer py-1 rounded-lg bg-background dark:bg-transparent dark:hover:bg-background-dark`
  const styleTooltips = 'flex items-center rounded-md px-2 py-1 hover:bg-background dark:hover:bg-background-dark'
  const styleTooltipsIconBgr = 'rounded-full bg-background dark:bg-transparent px-1 py-1 mr-2'
  const styleTooltipsIcon = 'fill-icon dark:fill-icon-dark'

  const handleUserOnClick = () => {
    setShowUserTooltip(!showUserTooltip)
  }

  const handleNotificationOnClick = () => {
    setShowNotificationTooltip(!showNotificationTooltip)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      (wrapperRef.current &&
        userButtonRef.current &&
        !wrapperRef.current.contains(event.target) &&
        !userButtonRef.current.contains(event.target)) ||
      (wrapperRef.current &&
        !userButtonRef.current &&
        !wrapperRef.current.contains(event.target))
    ) {
      setShowUserTooltip(false)
    }
    if (
      (wrapperNotificationRef.current &&
        notificationButtonRef.current &&
        !wrapperNotificationRef.current.contains(event.target) &&
        !notificationButtonRef.current.contains(event.target)) ||
      (wrapperNotificationRef.current &&
        !notificationButtonRef.current &&
        !wrapperNotificationRef.current.contains(event.target))
    ) {
      setShowNotificationTooltip(false)
    }
  }

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu)
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, false)
    return () => {
      document.removeEventListener('click', handleClickOutside, false)
    }
  }, [])

  return (
    <div className="z-50">
      {isMobile ? (
        // Mobile
        // <nav className='fixed block flex-wrap w-full justify-between items-center border-b-2 border-gray-300 py-2 px-2 text-2xl h-20 bg-white'> //current
        <nav className={`fixed block flex-wrap w-full justify-between items-center border-b-2 border-gray-300 dark:border-primary-variant-dark py-2 px-2 text-2xl h-20 bg-primary-variant dark:bg-primary-variant-dark`}>
          <div className='flex justify-between'>
            {/* Logo */}
            <div className='flex basis-1/5'>
              <Link href='/'>
                <p className={`font-poppins text-secondary dark:text-secondary-dark font-bold cursor-pointer`}>
                  WorkOutLoud
                </p>
              </Link>
            </div>

            {/* Login / Menu */}
            <div className="flex basis-1/5 justify-end">
              {/* Login */}
              {!user && (
                <Link href="/login">
                  <div className="item-center flex">
                    <p className="font-poppins cursor-pointer rounded bg-indigo-500 px-2 py-1 text-xl  text-white hover:bg-indigo-600">
                      Login
                    </p>
                  </div>
                </Link>
              )}

              {/* Menu */}
              <div className="flex items-center">
                <GiHamburgerMenu
                  onClick={toggleMobileMenu}
                  className="cursor-pointer rounded-full bg-background dark:bg-transparent px-1 text-3xl"
                />
              </div>
            </div>
          </div>

          {/* Home / Workout / Friends / Noti */}
          {user && (
            <div className="mt-1 grid grid-cols-4 items-center justify-items-stretch">
              {navbarItemsMobile.map((item) => (
                <Link key={item.name} href={item.path}>
                  <div
                    className={`${
                      item.path === window.location.pathname ||
                      window.location.pathname.match(item.name)
                        ? itemStyleActive
                        : itemStyle
                    }`}
                  >
                    {item.path === window.location.pathname ||
                    window.location.pathname.match(item.name)
                      ? item.iconActive
                      : item.icon}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </nav>
      ) : (
        // Desktop
        <nav className={`fixed block w-full justify-between items-center border-b-2 border-gray-300 dark:border-primary-dark py-2 px-2 text-2xl h-14 bg-primary-variant dark:bg-primary-variant-dark`}>
          <div className='flex items-center h-full justify-between'>
            {/* Logo */}
            <div className="flex basis-1/4">
              <Link href="/">
                <p className="font-poppins cursor-pointer font-bold text-secondary dark:text-secondary-dark">
                  WorkOutLoud
                </p>
              </Link>
            </div>

            {/* Home / Workout / Friends */}
            {user && (
              <div className="grid basis-2/4 grid-cols-3 items-center">
                {navbarItems.map((item) => (
                  <Link key={item.name} href={item.path}>
                    <div className={`${((window.location.pathname === item.path) || (window.location.pathname.match(item.name))) ? itemStyleActive : itemStyle}`}>
                      {((window.location.pathname === item.path) || (window.location.pathname.match(item.name))) ? item.iconActive : item.icon}
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Noti / User || Login / Menu */}
            <div className="flex h-full basis-1/4 justify-end">
              <div className="flex h-full items-center justify-end">
                {user ? (
                  <div className="flex h-full flex-row items-center space-x-4 py-0.5">
                    {/* Currenly only working for Desktop */}
                    <button
                      ref={notificationButtonRef}
                      type="button"
                      className="flex h-full"
                      onClick={handleNotificationOnClick}
                    >
                      <div className={`flex aspect-square h-full cursor-pointer place-content-center items-center rounded-full bg-background dark:bg-transparent`}>
                        <IoNotifications className={`p-0.5 fill-icon dark:fill-icon-dark`} />
                      </div>
                    </button>

                    <div className="flex aspect-square h-full place-content-center items-center rounded-full bg-gray-200 dark:bg-transparent">
                      <button
                        ref={userButtonRef}
                        type="button"
                        onClick={handleUserOnClick}
                        className="cursor-pointer"
                      >
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt="avatar"
                            className="h-auto rounded-full align-middle"
                          />
                        ) : (
                          <HiUser className="p-0.5" />
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link href="/login">
                    <p className="font-poppins cursor-pointer rounded bg-indigo-500 px-2 py-1 text-xl  text-white hover:bg-indigo-600">
                      Login
                    </p>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Tooltips */}
          <aside className="relative ">
            {showUserTooltip && (
              <menu
                ref={wrapperRef}
                className="absolute top-0 right-0 mt-2 flex flex-col rounded-md border-2 dark:border-primary-variant-dark px-2 py-2 text-lg drop-shadow-md bg-primary-variant dark:bg-primary-variant-dark"
              >
                <Link href="/profile">
                  <button
                    type="button"
                    onClick={() => setShowUserTooltip(false)}
                  >
                    <li className={styleTooltips}>
                      <div className={styleTooltipsIconBgr}>
                        <FaUserCircle className={styleTooltipsIcon}/>
                      </div>
                      Profile
                    </li>
                  </button>
                </Link>
                {/* Dark Mode */}
                <button type='button' onClick={() => {
                  saveTheme(isDark? {isDark: false} : {isDark: true})
                  setIsDark(!isDark)
                }}>
                  <li className={styleTooltips}>
                    <div className={styleTooltipsIconBgr}>
                      {isDark ? <MdLightMode className={styleTooltipsIcon}/> : <MdDarkMode className={styleTooltipsIcon}/>}
                    </div>
                    {isDark ? `Light mode` : `Dark mode`}
                  </li>
                </button>
                <Link href='/'>
                  <button type='button' onClick={() => {
                    localStorage.removeItem('user')
                    setShowUserTooltip(false)
                    googleLogout()
                    setUser(null)
                    setAuth(false)
                  }}>
                    <li className={styleTooltips}>
                      <div className={styleTooltipsIconBgr}>
                        <IoLogOut className={styleTooltipsIcon}/>
                      </div>
                      Logout
                    </li>
                  </button>
                </Link>
              </menu>
            )}
          </aside>
          <aside className="relative">
            {showNotificationTooltip && (
              <menu
                ref={wrapperNotificationRef}
                className="absolute top-0 right-0 mt-2 flex flex-col rounded-md border-2  dark:border-primary-variant-dark px-2 py-2 text-lg drop-shadow-md bg-primary-variant dark:bg-primary-variant-dark"
              >
                <Link href="/notifications">
                  <div className="notification-dropdown">
                    {/* Testing purposes. Need to add live data in the future */}
                    <p className={styleTooltips}>
                      Notifcation 1
                    </p>
                    <p className={styleTooltips}>
                      Notifcation 2
                    </p>
                    <p className={styleTooltips}>
                      Notifcation 3
                    </p>
                  </div>
                </Link>
              </menu>
            )}
          </aside>
        </nav>
      )}
      {showMobileMenu && (
        <MobileMenuModal
          toggleMobileMenu={toggleMobileMenu}
          isOpen={showMobileMenu}
          setShowMobileMenu={setShowMobileMenu}
          isDark={isDark}
          setIsDark={setIsDark}
        />
      )}
    </div>
  )
}

export default Navbar