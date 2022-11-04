import Link from 'next/link'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiFillHome } from 'react-icons/ai'
import { IoNotifications, IoBarbell } from 'react-icons/io5'
import { MdGroups } from 'react-icons/md'
import { HiUser } from 'react-icons/hi'

import React from 'react'
import { useEffect, useState } from 'react'

const Navbar = () => {
  const [width, setWidth] = useState(undefined)

  useEffect(() => {
    // to be called on window resize
    const handleWindowResize = () => {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleWindowResize)

    handleWindowResize()

    // Remove event listener on clean up
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  const isMobile = width <= 768

  const user = true

  const itemStyle = "grid justify-items-center cursor-pointer py-1 hover:rounded-lg hover:bg-gray-200"

  return (
    <div>
      {isMobile ? (
        <div className='block flex-wrap w-full justify-between items-center border-b-2 border-gray-300 py-2 px-2 text-2xl '>
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
              {!user && (
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
          {user &&
            <div className='grid grid-cols-4 justify-items-stretch items-center mt-1'>
              <div className={itemStyle}>
                <Link href='/'>
                  <AiFillHome />
                </Link>
              </div>

              <div className={itemStyle}>
                <Link href='/workout'>
                  <IoBarbell />
                </Link>
              </div>

              <div className={itemStyle}>
                <Link href='/friends'>
                  <MdGroups />
                </Link>
              </div>

              <div className={itemStyle}>
                <Link href='/notifications'>
                  <IoNotifications />
                </Link>
              </div>

            </div>
          }
        </div>
      ) : (
        <div className='block w-full justify-between items-center border-b-2 border-gray-300 py-2 px-2 text-2xl '>
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
            {user &&
              <div className='grid basis-2/4 grid-cols-3 items-center'>
                <div className={itemStyle}>
                  <Link href='/'>
                    <AiFillHome />
                  </Link>
                </div>

                <div className={itemStyle}>
                  <Link href='/workout'>
                    <IoBarbell />
                  </Link>
                </div>

                <div className={itemStyle}>
                  <Link href='/friends'>
                    <MdGroups />
                  </Link>
                </div>
              </div>
            }

            {/* Noti / Login / Menu */}
            <div className='flex basis-1/4 justify-end gap-[2vw]'>
              <div className='flex items-center'>
                {user ? (
                  <div className='flex gap-[2vw]'>
                    <div className='flex bg-gray-200 rounded-full items-center px-1 py-1'>
                      <Link href='/notifications'>
                        <IoNotifications className='px-0.5'/>
                      </Link>
                    </div>

                    <div className='flex bg-gray-200 rounded-full items-center px-1 py-1'>
                      <Link href='/profile'>
                        {/* TODO: replace with user's avatar */}
                        <HiUser className='px-0.5'/>
                      </Link>
                    </div>

                  </div>

                ) : (
                  <Link href='/login'>
                    <p className='font-["Roboto"] font-san text-white text-xl font-bold rounded cursor-pointer bg-indigo-500 hover:bg-indigo-600  px-2 py-1'>Login</p>
                  </Link>
                )}
              </div>
            </div>
          </div>


        </div>
      )
      }
    </div>
  )
}

export default Navbar
