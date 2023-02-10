import React from 'react'
import { useAuth } from '@src/context/AuthProvider'
import Routine from '@src/components/Workout/Routine'
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
const Index = () => {
  const { auth } = useAuth()

  return (
    <div className="w-full">
      {auth ? (
        <div className="space-y-3 p-3">
          <div className="border-b border-black pb-5">
            <p className="text-3xl font-bold">Your Routines</p>
            <div className="grid grid-cols-2 gap-3">
              {routines.map((routine: any, i: number) => (
                <Routine
                  // eslint-disable-next-line react/no-array-index-key
                  key={i}
                  name={routine.name}
                  description={routine.description}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold">Favorite Routines</p>
            <div className="grid grid-cols-2 gap-3">
              {routines.map((routine: any, i: number) => (
                <Routine
                  // eslint-disable-next-line react/no-array-index-key
                  key={i}
                  name={routine.name}
                  description={routine.description}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  )
}

export default Index
