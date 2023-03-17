import React, { useState } from 'react'
import { useAuth } from '@src/context/AuthProvider'
import RoutineHeader from '@src/components/Workout/Header'
import Login from '../login'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import AddExerciseModal from '@src/components/Workout/Exercises/AddExerciseModal'
import SearchExercisesModal from '@src/components/Workout/Exercises/SearchExerciseModal'
import { IExercise } from '@src/types/Workout'

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
const headerTabs = ['Exercises', 'History', 'Settings']
const RoutinePage = () => {
  const { auth } = useAuth()
  const [currentTab, setCurrentTab] = useState(headerTabs[0])
  const [addExerciseModalOpen, setAddExerciseModalOpen] = useState(false)
  const [searchExerciseModalOpen, setSearchExerciseModalOpen] = useState(false)
  const [exercises, setExercises] = useState([])

  const onAddExercise = (exercise: IExercise) => {
    setExercises([...exercises, exercise])
  }

  const onAddSearchExercise = (exercise: IExercise) => {
    setExercises([...exercises, exercise])
  }

  return (
    <div className="w-full">
      {auth ? (
        <div className="space-y-3">
          <RoutineHeader
            name="Routine Name"
            description="Description"
            tabs={headerTabs}
            currentTab={currentTab}
            setTab={setCurrentTab}
          />
          {currentTab === 'Exercises' ? (
            <div className="flex">
              <AddExerciseModal
                open={addExerciseModalOpen}
                setOpen={setAddExerciseModalOpen}
                onAdd={onAddExercise}
              />
              <button
                type="button"
                className="mr-2 rounded border border-black bg-[#d9d9d9] px-2 py-1"
                onClick={() => setAddExerciseModalOpen(true)}
              >
                <FontAwesomeIcon icon={faPlus} className="fa-md" /> Add Exercise
              </button>
              <div>
                <SearchExercisesModal
                  open={searchExerciseModalOpen}
                  setOpen={setSearchExerciseModalOpen}
                  onAdd={onAddSearchExercise}
                />
                <button
                  type="button"
                  className="rounded border border-black bg-[#d9d9d9] px-2 py-1"
                  onClick={() => setSearchExerciseModalOpen(true)}
                >
                  <FontAwesomeIcon icon={faPlus} className="fa-md" /> Search
                  Exercises
                </button>
              </div>
              <div>{JSON.stringify(exercises)}</div>
            </div>
          ) : null}
          <p>{currentTab} goes here</p>
        </div>
      ) : (
        <Login />
      )}
    </div>
  )
}

export default RoutinePage
