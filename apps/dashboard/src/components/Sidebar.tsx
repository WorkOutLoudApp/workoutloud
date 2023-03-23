import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { HiUser } from 'react-icons/hi'
import { GrNext } from 'react-icons/gr'
import { BiArrowBack } from 'react-icons/bi'
import favoriteIcon from '../assets/heart.svg'
import routineIcon from '../assets/task-clock.svg'
import exerciseIcon from '../assets/dumbbell.svg'

import sidebarWorkoutItems from '@src/utils/constants/sidebar'
import SidebarRoutines from './Workout/SidebarRoutines'
import SidebarExercises from './Workout/SidebarExercises'
import SidebarHistory from './Workout/SidebarHistory'

import { useAuth } from '../context/AuthProvider'
import axios from 'axios'
import { Router } from 'next/router'
import { RiArrowRightSLine } from 'react-icons/ri'

const fetchRoutines = async (token: String, setState: React.Dispatch<React.SetStateAction<any[]>>) => {
  axios.get(`http://localhost:4000/v1/routine/getRoutines`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setState(res.data)
    }).catch((err) => {
      console.log(err)
    })
}

const fetchFavorites = async (token: String, setState: React.Dispatch<React.SetStateAction<any[]>>) => {
  axios.get(`http://localhost:4000/v1/routine/getFavorites`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setState(res.data)
    }).catch((err) => {
      console.log(err)
    })
}

const fetchExercises = async (token: String, setState: React.Dispatch<React.SetStateAction<any[]>>) => {
  const response = await axios.get(`http://localhost:4000/v1/routine/getAllExercises`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  setState(response.data)
}

const history = [
  {
    name: 'Timestamp',
  },
  {
    name: 'Timestamp',
  },

]

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
          <div className='flex aspect-square items-center place-content-center h-full rounded-full bg-gray-200 dark:bg-transparent'>
            <HiUser className='' />
          </div>
        )}
        <h1 className='font-poppins'>{user.firstName} {user.lastName}</h1>
      </div>
    </div>
  )
}

export const WorkoutSidebar = (props: any) => {
  const setCurrentSidebar = props.function
  const router = useRouter()

  const styleWorkoutItem = `flex w-full items-center align-middle space-x-2 rounded hover:bg-background dark:hover:bg-background-dark cursor-pointer`
  const styleWorkoutLogo = `flex aspect-square items-center place-content-center h-full`
  return (
    <div className='flex flex-col items-center space-y-2 px-2 text-xl'>
      <h1 className='w-full font-bold'>Workouts</h1>
      <div className='w-full flex flex-col space-y-2'>
        {sidebarWorkoutItems.map((item) => (
          <button type='button' key={item.name} onClick={() => {
            if (item.name === 'Home') {
              router.push('/routines')
            } if(item.name ==='Exercises') {
              router.push('/exercises')
            } else {
              setCurrentSidebar(item.name)
            }
          }
          } >
            <div className={`${styleWorkoutItem} ${item.path === window.location.pathname && 'bg-background dark:bg-background-dark'}`}>
              <div className={styleWorkoutLogo}>
                {item.path === window.location.pathname ? item.iconActive : item.icon}
              </div>
              <span className={`font-poppins text-md ${item.path === window.location.pathname && 'text-secondary dark:text-secondary-dark'}`}>{item.name}</span>
              {item.name !== 'Home' && (
                <span className='flex w-full justify-end'>
                  <RiArrowRightSLine className='fill-icon dark:fill-icon-dark'/>
                </span>
              )}
            </div>
          </button>

        ))}
      </div>
    </div>
  )
}

const RoutinesSidebar = (props: any) => {
  const setCurrentSidebar = props.function
  const { token } = useAuth()
  const [routines, setRoutines] = useState([])

  useEffect(() => {
    fetchRoutines(token, setRoutines)
  }, [])

  const styleWorkoutItem = `flex w-full items-center align-middle space-x-2 rounded hover:bg-gray-200 cursor-pointer`
  const styleWorkoutLogo = `flex aspect-square items-center place-content-center h-full`
  return (
    <div className='flex flex-col items-center space-y-2 px-2 text-xl w-full'>
      <div className='flex items-center w-full space-x-2'>
        {/* <Link href={'/routines'}> */}
        <button type='button' onClick={() => { setCurrentSidebar('Workout') }}>
          <div className='cursor-pointer rounded-full p-0.5 bg-background dark:bg-background-dark'>
            <BiArrowBack />
          </div>
        </button>
        {/* </Link> */}
        <div className='flex flex-col'>
          <div className='text-sm'>Workouts</div>
          <div className='font-bold'>Routines</div>
        </div>

      </div>
      <div className='flex flex-col h-full w-full'>
        <div className='w-full font-bold'>Your Routines</div>
        <div className='flex flex-col'>
          {routines.length ? (
            routines.map((routine: any, i: number) => (
              <SidebarRoutines
                key={i}
                id={routine.id}
                name={routine.name}
                description={routine.description}
                icon={sidebarWorkoutItems.find(item => item.name === 'Routines').icon}
              />
            ))
          ) : (
            ``
          )}
        </div>
      </div>
    </div>
  )
}



const FavoritesSidebar = (props: any) => {
  const setCurrentSidebar = props.function
  const { token } = useAuth()
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    fetchFavorites(token, setFavorites)
  }, [])

  const styleWorkoutItem = `flex w-full items-center align-middle space-x-2 rounded hover:bg-gray-200 cursor-pointer`
  const styleWorkoutLogo = `flex aspect-square items-center place-content-center h-full`
  return (
    <div className='flex flex-col items-center space-y-2 px-2 text-xl w-full'>
      <div className='flex items-center w-full space-x-2'>
        {/* <Link href={'/routines'}> */}
        <button type='button' onClick={() => { setCurrentSidebar('Workout') }}>
          <div className='cursor-pointer'>
            <BiArrowBack />
          </div>
        </button>
        {/* </Link> */}
        <div className='flex flex-col'>
          <div className='text-sm'>Workouts</div>
          <div className='font-bold'>Favorites</div>
        </div>

      </div>
      <div className='flex flex-col h-full w-full'>
        <div className='w-full font-bold'>Your Favorites</div>
        <div className='flex flex-col'>
          {favorites.map((favorite: any, i: number) => (
            <SidebarRoutines
              key={i}
              id={favorite.id}
              name={favorite.name}
              description={favorite.description}
              icon={sidebarWorkoutItems.find(item => item.name === 'Favorites').icon}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const ExercisesSidebar = (props: any) => {
  const setCurrentSidebar = props.function
  const { token } = useAuth()
  const [exercises, setExercises] = useState([])

  useEffect(() => {
    fetchExercises(token, setExercises)
  }, [])

  const styleWorkoutItem = `flex w-full items-center align-middle space-x-2 rounded hover:bg-gray-200 cursor-pointer`
  const styleWorkoutLogo = `flex aspect-square items-center place-content-center h-full`
  return (
    <div className='flex flex-col items-center space-y-2 px-2 text-xl w-full'>
      <div className='flex items-center w-full space-x-2'>
        {/* <Link href={'/routines'}> */}
        <button type='button' onClick={() => { setCurrentSidebar('Workout') }}>
          <div className='cursor-pointer'>
            <BiArrowBack />
          </div>
        </button>
        {/* </Link> */}
        <div className='flex flex-col'>
          <div className='text-sm'>Workouts</div>
          <div className='font-bold'>Exercises</div>
        </div>

      </div>
      <div className='flex flex-col h-full w-full'>
        <div className='w-full font-bold'>Exercises</div>
        <div className='flex flex-col'>
          {exercises.map((exercise: any, i: number) => (
            <SidebarExercises
              key={i}
              name={exercise.name}
              image={exerciseIcon}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const HistorySidebar = (props: any) => {
  const setCurrentSidebar = props.function
  const styleWorkoutItem = `flex w-full items-center align-middle space-x-2 rounded hover:bg-gray-200 cursor-pointer`
  const styleWorkoutLogo = `flex aspect-square items-center place-content-center h-full`
  return (
    <div className='flex flex-col items-center space-y-2 px-2 text-xl w-full'>
      <div className='flex items-center w-full space-x-2'>
        {/* <Link href={'/routines'}> */}
        <button type='button' onClick={() => { setCurrentSidebar('Workout') }}>
          <div className='cursor-pointer'>
            <BiArrowBack />
          </div>
        </button>
        {/* </Link> */}
        <div className='flex flex-col'>
          <div className='text-sm'>Workouts</div>
          <div className='font-bold'>History</div>
        </div>

      </div>
      <div className='flex flex-col h-full w-full'>
        {/* <div className='w-full font-bold'>Routines</div> */}
        <div className='flex flex-col'>
          {history.map((history: any, i: number) => (
            <SidebarHistory
              name={history.name}
            />
          ))}
        </div>
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
  const { auth, user } = useAuth()
  const [currentSidebar, setCurrentSidebar] = useState('Homepage')

  if (typeof window !== 'undefined') {
    useEffect(() => {
      if (window.location.pathname === '/routines') {
        setCurrentSidebar('Workout')
      } else if (window.location.pathname === '/homepage') {
        setCurrentSidebar('Homepage')
      } else if (window.location.pathname === '/friends') {
        setCurrentSidebar('Friends')
      }
    }, [location.pathname])
  }

  const styleWorkoutItem = `flex w-full items-center align-middle space-x-2 rounded hover:bg-gray-200 cursor-pointer`
  const styleWorkoutLogo = `flex aspect-square items-center place-content-center h-full`
  if (!user) {
    return (
      <div className='font-poppins p-2'>Hi there!<br />Please login to continue</div>
    )
  }
  return (
    <div className='w-full mt-2 text-[1.5vw]'>
      {currentSidebar === 'Homepage' && (
        <HomeSidebar avatar={user.avatar} user={user} />
      )}
      {currentSidebar === ('Workout' || 'Home') && (
        <WorkoutSidebar function={setCurrentSidebar} />
      )}
      {currentSidebar === ('Friends') && (
        <FriendsSidebar function={setCurrentSidebar} />
      )}
      {currentSidebar === 'Routines' && (
        <RoutinesSidebar function={setCurrentSidebar} />
      )}
      {currentSidebar === 'Favorites' && (
        <FavoritesSidebar function={setCurrentSidebar} />
      )}
      {currentSidebar === 'Exercises' && (
        <ExercisesSidebar function={setCurrentSidebar} />
      )}
      {currentSidebar === 'History' && (
        <HistorySidebar function={setCurrentSidebar} />
      )}
    </div>
  )


}




export default Sidebar