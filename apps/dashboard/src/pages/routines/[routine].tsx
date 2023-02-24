import React, {useEffect, useState} from 'react'
import { useAuth } from '@src/context/AuthProvider'
import RoutineHeader from '@src/components/Workout/Header'
import Login from '../login'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import AddExerciseModal from '@src/components/Workout/Exercises/AddExerciseModal'
import { Exercise } from '@src/types/Workout'
import axios from 'axios'
import { GetServerSideProps } from 'next'

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

interface RoutinePageProps {
  routine: string
}
const RoutinePage = ({
                       routine
                     }: RoutinePageProps) => {
  console.log(routine)
  const { auth } = useAuth()
  const [currentTab, setCurrentTab] = useState(headerTabs[0])
  const [addExerciseModalOpen, setAddExerciseModalOpen] = useState(false)

  const [data, setData] = useState<any>(null)
  useEffect(() => {
    axios.get(`http://localhost:4000/v1/routine/get/${routine}`).then((res) => setData(res.data))
  }, [])

  const [exercises, setExercises] = useState([])

  const onAddExercise = (exercise: Exercise) => {
    setExercises([...exercises, exercise])
    axios.post('http://localhost:4000/v1/routine/add', {
        name: 'Routine Name',
        description: 'Description',
    })
  }
  console.log(data)

  return (
    <div className="w-full">
      {auth ? (
        <div className="space-y-3">
          {data ? <RoutineHeader
              name={data.name}
              description={data.description}
              tabs={headerTabs}
              currentTab={currentTab}
              setTab={setCurrentTab}
          /> : null}
          {currentTab === 'Exercises' ? (
            <div>
              <AddExerciseModal
                open={addExerciseModalOpen}
                setOpen={setAddExerciseModalOpen}
                onAdd={onAddExercise}
              />
              <button
                type="button"
                className="rounded border border-black bg-[#d9d9d9] px-2 py-1"
                onClick={() => setAddExerciseModalOpen(true)}
              >
                <FontAwesomeIcon icon={faPlus} className="fa-md" /> Add Exercise
              </button>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { routine } = context.params
  console.log(context.params)
  return {
    props: {
      routine,
    },
  }
}

export default RoutinePage
