import React from 'react'

import { AiFillHome } from 'react-icons/ai'
import { IoBarbell } from 'react-icons/io5'
import { MdGroups } from 'react-icons/md'
import { BsFillBellFill } from 'react-icons/bs'
import { GiHamburgerMenu } from 'react-icons/gi'
import Link from 'next/link'
import Image from 'next/image'
import userLogo from '../utils/user.png'
import NavbarItems from './NavbarItems'
const Navbar = () => {
  const user = true
  return (
    <div className='flex-wrap w-full justify-between items-center border-b-2 border-gray-300 py-2 px-2 text-2xl'>
      <div className='flex justify-between'>
        <div className=''>
          <Link href='/'>
            <p className='text-indigo-600 font-bold cursor-pointer'>
              WorkOutLoud
            </p>
          </Link>
        </div>


        {/* Home / Workout / Friends / Noti */}
        {user &&
          <div className='hidden xl:flex'>
            <NavbarItems />
          </div>
        }

        {/* Menu / User / Login */}
        <div className='flex justify-end gap-[2vw]'>
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
          <div className='xl:hidden'>
            <Link href='/menu'>
              <GiHamburgerMenu className='cursor-pointer rounded-full px-1 text-4xl bg-gray-200' />
            </Link>
          </div>
        </div>
      </div>


      {user &&
        <div className='flex-wrap xl:hidden'>
          <NavbarItems />
        </div>
      }
    </div>

    // <div className='flex-wrap w-full justify-between items-center border-b-2 border-gray-300 py-2 px-2 text-2xl'>
    //   <div className='flex'> 
    //     <div className=''>
    //       <Link href='/'>
    //         <p className='text-indigo-600 font-bold cursor-pointer'>
    //           WorkOutLoud
    //         </p>
    //       </Link>
    //     </div>

    //     {/* Menu / User / Login */}
    //     <div className=''>
    //       {/* User / Login */}
    //       <div className=''>

    //         {user ? (
    //           <div className='hidden xl:block'>
    //             <Link href='/profile'>
    //               <Image
    //                 src={userLogo}
    //                 alt='user'
    //                 width={25}
    //                 height={25}
    //                 className='rounded-full cursor-pointer'

    //               />
    //             </Link>

    //           </div>

    //         ) : (
    //           <Link href='/login'>
    //             <p className='font-["Roboto"] font-san text-white text-xl font-bold rounded cursor-pointer bg-indigo-500 hover:bg-indigo-600  px-2 py-1'>Login</p>
    //           </Link>
    //         )}
    //       </div>

    //       {/* Menu */}
    //       <div className='xl:hidden'>
    //         <Link href='/menu'>
    //           <GiHamburgerMenu className='cursor-pointer rounded-full px-1 text-4xl bg-gray-200' />
    //         </Link>
    //       </div>
    //     </div>

    //   </div>


    //   {/* Home / Workout / Friends / Noti */}
    //   <div className={`flex flex-wrap justify-between`}>
    //     <Link href='/'>
    //       <p>
    //         <AiFillHome className='cursor-pointer' />
    //       </p>
    //     </Link>

    //     <Link href='/workout'>
    //       <p>
    //         <IoBarbell className='cursor-pointer' />
    //       </p>
    //     </Link>

    //     <Link href='/friends'>
    //       <p>
    //         <MdGroups className='cursor-pointer' />
    //       </p>
    //     </Link>
    //     <Link href='/notifications'>
    //       <p>
    //         <BsFillBellFill className='cursor-pointer text-md' />
    //       </p>
    //     </Link>
    //   </div>


    // </div>
  )
}

export default Navbar