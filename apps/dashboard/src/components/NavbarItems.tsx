import Link from 'next/link'
import React from 'react'

import { AiFillHome } from 'react-icons/ai'
import { IoBarbell } from 'react-icons/io5'
import { MdGroups } from 'react-icons/md'
import { BsFillBellFill } from 'react-icons/bs'

const NavbarItems = () => {
<<<<<<< Updated upstream
  return (
    <div className={`flex justify-around items-center gap-[10vw] mt-2`}>
        <Link href='/'>
          <p>
            <AiFillHome className='cursor-pointer' />
          </p>
        </Link>

        <Link href='/workout'>
          <p>
            <IoBarbell className='cursor-pointer' />
          </p>
        </Link>

        <Link href='/friends'>
          <p>
            <MdGroups className='cursor-pointer' />
          </p>
        </Link>
        <Link href='/notifications'>
          <p>
            <BsFillBellFill className='cursor-pointer text-md' />
          </p>
        </Link>
      </div>
=======
  const itemStyle = "grid justify-items-center py-1 cursor-pointer hover:rounded-lg hover:bg-gray-200"
  return (
    <div className={`grid grid-cols-4 justify-items-stretch items-center`}>
      <div className={itemStyle}>
        <Link href='/'>
            <AiFillHome/>
        </Link>
      </div>

      <div className={itemStyle}>
        <Link href='/workout'>
            <IoBarbell/>
        </Link>
      </div>

      <div className={itemStyle}>
        <Link href='/friends'>
            <MdGroups/>
        </Link>
      </div>

      <div className={itemStyle}>
        <Link href='/notifications'>
            <BsFillBellFill className='text-xl'/>
        </Link>
      </div>
    </div>
>>>>>>> Stashed changes
  )
}

export default NavbarItems