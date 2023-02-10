import React, { useState } from 'react'
import { useAuth } from '@src/context/AuthProvider'
import Routine from '@src/components/Workout/Routine'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
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
  const [isOpen, setIsOpen] = useState(false)
  const { auth } = useAuth()

  return (
    <div className="w-full">
      {auth ? (
        <div className="space-y-3 p-3">
          {isOpen && (
            <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center bg-black bg-opacity-60">
              <div className="mx-auto max-w-lg rounded-md bg-white p-4 shadow-xl">
                <div className="flex justify-between">
                  <h3 className="text-xl font-medium">Add Routine</h3>
                  <button
                    type="button"
                    className="font-medium text-gray-800"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    X
                  </button>
                </div>
                <form className="mt-6 space-y-3">
                  <input
                    className="w-full rounded-md border border-gray-400 p-2"
                    placeholder="Routine Name"
                  />
                  <input
                    className="w-full rounded-md border border-gray-400 p-2"
                    placeholder="Description"
                  />
                  <button
                    type="submit"
                    className="rounded bg-blue-400/20 py-2 px-2 font-semibold text-gray-800"
                  >
                    Add
                  </button>
                </form>
              </div>
            </div>
          )}
          <button
            type="button"
            className="rounded border border-black bg-[#d9d9d9] px-2 py-1"
          >
            <button type="button" onClick={() => setIsOpen(true)}>
              <p>
                <FontAwesomeIcon icon={faPlus} className="fa-md" /> Add Workout
              </p>
            </button>
          </button>
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
