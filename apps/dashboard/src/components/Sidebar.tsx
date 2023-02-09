import React, { useContext } from 'react'
import Link from 'next/link'

import { HiUser} from 'react-icons/hi'
import { GrNext } from 'react-icons/gr'

import sidebarWorkoutItems from '@src/utils/constants/sidebar'
import { useAuth } from '../context/AuthProvider'


export const HomeSidebar = (props: any) => {
  const { avatar, user } = props
  return (
    <div className='w-full flex flex-col justify-start items-center space-y-2 px-2 text-md'>
      <div className='w-full flex justify-start mt-2 items-center space-x-2 h-10 '>
        {avatar ? (
          <div className='flex aspect-square items-center place-content-center h-full rounded-full'>
            <img src={avatar} alt='avatar' className='rounded-full' />
          </div>
        ) : (
          <div className='flex aspect-square items-center place-content-center h-full rounded-full bg-gray-200'>
            <HiUser className='' />
          </div>
        )}
        <h1 className='font-poppins text-md'>{user.firstName} {user.lastName}</h1>
      </div>
    </div>
  )
}

export const WorkoutSidebar = (props: any) => {
  const styleWorkoutItem = `flex w-full items-center align-middle space-x-2 rounded hover:bg-gray-200 cursor-pointer`
  const styleWorkoutLogo = `flex aspect-square items-center place-content-center h-full`
  return (
    <div className='flex flex-col items-center space-y-2 px-2 text-xl'>
      <h1 className='w-full font-bold'>Workouts</h1>
      <div className='w-full flex flex-col space-y-2'>
        {sidebarWorkoutItems.map((item) => (
          <Link key={item.name} href={item.path} >
            <div className={`${styleWorkoutItem} ${item.path === window.location.pathname && 'bg-gray-200'}`}>
              <div className={styleWorkoutLogo}>
                {item.path === window.location.pathname ? item.iconActive : item.icon}
              </div>
              <span className='font-poppins text-md'>{item.name}</span>
              {item.name !== 'Home' && (
                <span className='flex w-full justify-end'>
                  <GrNext/>
                </span>
              )}
            </div>
          </Link>

        ))}
      </div>
    </div>
  )
}

export const FriendsSidebar = (props: any) => {
  const styleWorkoutItem = `flex w-full items-center align-middle space-x-2 rounded hover:bg-gray-200 cursor-pointer`
  const styleWorkoutLogo = `flex aspect-square items-center place-content-center h-full`
  return (
    <div className='flex flex-col items-center space-y-2 px-2 text-xl'>
      <h1 className='w-full font-bold'>Friends</h1>
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
      <div className='font-poppins p-2'>Hi there!<br />Please login to continue</div>
    )
  }
  return (
    <div className='w-full mt-2 text-[1.5vw]'>
      {window.location.pathname === '/homepage' && (
        <HomeSidebar avatar={user.avatar} user={user} />
      )}

      {window.location.pathname === '/workout' && (
        <WorkoutSidebar />
      )}

      {window.location.pathname === '/friends' && (
        <FriendsSidebar/>
      )}
    </div>
  )


}




export default Sidebar