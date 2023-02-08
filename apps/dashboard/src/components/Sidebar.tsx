import React, { useContext } from 'react'
import Link from 'next/link'

import { HiUser, HiClipboardList } from 'react-icons/hi'
import { GrYoga, GrPowerCycle } from 'react-icons/gr'
import { FaStar } from 'react-icons/fa'
import { RiHistoryFill } from 'react-icons/ri'

import sidebarWorkoutItems from '@src/utils/constants/sidebar'
import { useAuth } from '../context/AuthProvider'


export const HomeSidebar = (props: any) => {
  const { avatar, user } = props
  return (
    <div className='flex mt-2 ml-2 items-center space-x-2 h-[2vw]'>
      {avatar ? (
        <div className='flex aspect-square items-center place-content-center h-full rounded-full'>
          <img src={avatar} alt='avatar' className='rounded-full' />
        </div>
      ) : (
        <div className='flex aspect-square items-center place-content-center h-full rounded-full bg-gray-200'>
          <HiUser className='' />
        </div>
      )}
      <h1 className='font-bold'>{user.firstName} {user.lastName}</h1>
    </div>
  )
}

export const WorkoutSidebar = (props: any) => {
  const styleWorkoutItem = `flex w-full items-center align-middle space-x-2 rounded hover:bg-gray-200 cursor-pointer`
  const styleWorkoutLogo = `flex aspect-square items-center place-content-center h-full`
  return (
    <div className='flex flex-col items-center space-y-2 px-2 text-[2vw]'>
      <h1 className='w-full font-bold  rounded'>Workouts</h1>
      <div className='w-full flex flex-col space-y-2'>
        { sidebarWorkoutItems.map((item) => (
          <Link key={item.name} href={item.path} >
            <div className={`${styleWorkoutItem} ${item.path === window.location.pathname && 'bg-gray-200'}`}>
              <div className={styleWorkoutLogo}>
              {item.path === window.location.pathname ? item.iconActive : item.icon}
              </div>
              <span className=''>{item.name}</span>
            </div>
          </Link>

        ))}
      </div>
    </div>
  )
}

const Sidebar = () => {
  const style = 'flex flex-col'
  const { auth, setAuth, user, setUser } = useAuth()


  const styleWorkoutItem = `flex w-full items-center align-middle space-x-2 rounded hover:bg-gray-200 cursor-pointer`
  const styleWorkoutLogo = `flex aspect-square items-center place-content-center h-full`
  if (!user) {
    return (
      <div className='p-2'>Hi there!<br />Please login to start workout</div>
    )
  }
  return (
    <div className='w-full mt-2 text-[1.5vw]'>
      {window.location.pathname === '/' && (
        <HomeSidebar avatar={user.avatar} user={user} />
      )}

      {/workout.*/.test(window.location.pathname) && (
        <WorkoutSidebar />
      )}
    </div>
  )


}




export default Sidebar