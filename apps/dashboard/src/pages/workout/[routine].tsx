import React from 'react'
import { useAuth } from '@src/context/AuthProvider'
import RoutineHeader from '@src/components/Workout/Header'
import Login from '../login'

const routines = [
  {
    name: 'Routine Name',
    description: 'Description',
  },
  {
    name: 'Routine Name',
    description: 'Description',
  },
]
const RoutinePage = () => {
  const { auth } = useAuth()

  return (
    <div className="w-full">
      {auth ? (
        <div className="space-y-3">
          <RoutineHeader name="Routine Name" description="Description" />
          <p>EXERCISES GO HERE</p>
        </div>
      ) : (
        <Login />
      )}
    </div>
  )
}

export default RoutinePage
