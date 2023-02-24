import Link from 'next/link'
import React from 'react'

import { AiFillHome } from 'react-icons/ai'
import { IoBarbell } from 'react-icons/io5'
import { MdGroups } from 'react-icons/md'
import { BsFillBellFill } from 'react-icons/bs'

const NavbarItems = () => {
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
  )
}

export default NavbarItems