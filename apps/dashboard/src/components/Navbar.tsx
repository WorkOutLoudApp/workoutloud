import React from 'react'

import { GiHamburgerMenu } from 'react-icons/gi'
import Link from 'next/link'
import Image from 'next/image'
import userLogo from '../utils/user.png'
import NavbarItems from './NavbarItems'
const Navbar = () => {
  const user = true
  return (
    <div className='block flex-wrap w-full justify-between items-center border-b-2 border-gray-300 py-2 px-2 text-2xl '>
      <div className='flex justify-between'>
        <div className='flex basis-1/5'>
          <Link href='/'>
            <p className='text-indigo-600 font-bold cursor-pointer'>
              WorkOutLoud
            </p>
          </Link>
        </div>


        {/* Home / Workout / Friends / Noti */}
        {user &&
          <div className='hidden basis-3/5 justify-between xl:flex'>
            <div className='basis-full'>
              <NavbarItems />
            </div>
          </div>
        }

        {/* Menu / User / Login */}
        <div className='flex basis-1/5 justify-end gap-[2vw]'>
          {/* User / Login */}
          <div className='flex items-center gap-[2vw]'>

            {user ? (
              <div className='justify-end hidden xl:flex'>
                <Link href='/profile'>
                  <Image
                    src={userLogo}
                    alt='user'
                    width={25}
                    height={25}
                    className='rounded-full cursor-pointer'

                  />
                </Link>

              </div>

            ) : (
              <Link href='/login'>
                <p className='font-["Roboto"] font-san text-white text-xl font-bold rounded cursor-pointer bg-indigo-500 hover:bg-indigo-600  px-2 py-1'>Login</p>
              </Link>
            )}
          </div>

          {/* Menu */}
          <div className='flex items-center xl:hidden'>
            <Link href='/menu'>
              <GiHamburgerMenu className='cursor-pointer rounded-full px-1 text-3xl bg-gray-200' />
            </Link>
          </div>
        </div>
      </div>


      {user &&
        <div className='mt-1 xl:hidden'>
            <NavbarItems />       
        </div>
      }
    </div>
  )
}

export default Navbar
