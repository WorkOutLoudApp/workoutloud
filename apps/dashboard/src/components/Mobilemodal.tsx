import React from 'react'
import Link from 'next/link'
import { AiOutlineClose, AiFillHome } from 'react-icons/ai'
import { useAuth } from '@src/context/AuthProvider'
import { googleLogout } from '@react-oauth/google'
import { useState, useEffect } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { IoLogIn, IoLogOut } from 'react-icons/io5'
import { TbHandFinger } from 'react-icons/tb'
import { MdOutlineDarkMode, MdDarkMode } from 'react-icons/md'

interface MobileMenuModalProps {
  toggleMobileMenu: () => void
  isOpen: boolean
  setShowMobileMenu: (value: boolean) => void
}

const MobileMenuModal: React.FC<MobileMenuModalProps> = ({
  toggleMobileMenu,
  isOpen,
  setShowMobileMenu,
}) => {
  const { auth, setAuth, user, setUser } = useAuth()

  const handleClickOutside = (event: MouseEvent) => {
    if (!event.target) return
    const target = event.target as HTMLElement
    if (target.closest('.mobile-menu')) return
    setShowMobileMenu(false)
  }

  const [showUserTooltip, setShowUserTooltip] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const handleDarkMode = () => {
    setIsDark(!isDark)
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div
      className={`fixed inset-0 left-auto right-0 z-50 h-full w-2/3 transition-all duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } mobile-menu bg-gray-100`}
    >
      <header className="flex items-center justify-end border-b-0 p-4">
        <button onClick={toggleMobileMenu} className="text-2xl">
          <AiOutlineClose />
        </button>
      </header>
      <nav className="p-4">
        <ul>
          {!user && (
            <>
              <li className="p-2">
                <Link href="/">
                  <a
                    onClick={toggleMobileMenu}
                    className="font-poppins hover:bg-gray-10 flex items-center rounded-lg p-2 text-xl text-indigo-600"
                  >
                    <AiFillHome className="mr-2" />
                    Home
                  </a>
                </Link>
              </li>
              <li className="p-2">
                <Link href="/login">
                  <a
                    onClick={toggleMobileMenu}
                    className="font-poppins flex items-center rounded-lg p-2 text-xl text-indigo-600 hover:bg-gray-100"
                  >
                    <IoLogIn className="mr-2" />
                    Login
                  </a>
                </Link>
              </li>
              <li className="p-2">
                <Link href="/register">
                  <a
                    onClick={toggleMobileMenu}
                    className="font-poppins flex items-center rounded-lg p-2 text-xl text-indigo-600 hover:bg-gray-100"
                  >
                    <TbHandFinger className="mr-2" />
                    Sign Up
                  </a>
                </Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li className="p-2">
                <Link href="/homepage">
                  <a
                    onClick={toggleMobileMenu}
                    className="font-poppins hover:bg-gray-10 flex items-center rounded-lg p-2 text-xl text-indigo-600"
                  >
                    <AiFillHome className="mr-2" />
                    Home
                  </a>
                </Link>
              </li>
              <li className="p-2">
                <Link href="/profile">
                  <a
                    onClick={toggleMobileMenu}
                    className="font-poppins flex items-center rounded-lg p-2 text-xl text-indigo-600 hover:bg-gray-100"
                  >
                    <FaUserCircle className="mr-2" />
                    Profile
                  </a>
                </Link>
              </li>
              <li className="p-2">
                <button
                  onClick={handleDarkMode || toggleMobileMenu}
                  className="font-poppins flex items-center rounded-lg p-2 text-xl text-indigo-600 hover:bg-gray-100"
                >
                  {isDark ? (
                    <MdDarkMode className="mr-2" />
                  ) : (
                    <MdOutlineDarkMode className="mr-2" />
                  )}
                  Dark Mode
                </button>
              </li>
              <li className="p-2">
                <Link href="/">
                  <button
                    className="font-poppins flex items-center rounded-lg p-2 text-xl text-indigo-600 hover:bg-gray-100"
                    onClick={() => {
                      localStorage.removeItem('user')
                      setShowUserTooltip(false)
                      googleLogout()
                      setUser(null)
                      setAuth(false)
                    }}
                  >
                    <IoLogOut className="mr-2" />
                    Logout
                  </button>
                </Link>
              </li>
              {/* Add more menu items for authenticated users as needed */}
            </>
          )}
          {/* Add more menu items as needed */}
        </ul>
      </nav>
    </div>
  );
};

export default MobileMenuModal;
