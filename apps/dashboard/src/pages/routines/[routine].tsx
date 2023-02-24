import React, {useEffect, useState} from 'react'
import { useAuth } from '@src/context/AuthProvider'
import RoutineHeader from '@src/components/Workout/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import AddExerciseModal from '@src/components/Workout/Exercises/AddExerciseModal'
import { IExercise } from '@src/types/Workout'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import Login from '../login'
import Exercise from "@src/components/Workout/Exercises/Exercise";

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
  const { auth } = useAuth()
  const [currentTab, setCurrentTab] = useState(headerTabs[0])
  const [exerciseModalOpen, setExerciseModalOpen] = useState(false)

  const [data, setData] = useState<any>(null)
  useEffect(() => {
    axios.get(`http://localhost:4000/v1/routine/${routine}/get`).then((res) => setData(res.data))
  }, [])

  const [exercises, setExercises] = useState([])
  useEffect(() => {
    axios.get(`http://localhost:4000/v1/routine/${routine}/getExercises`).then((res) => setExercises(res.data))
  }, [])
  const onAddExercise = async (exercise: IExercise) => {
    setExerciseModalOpen(false)
    axios.post(`http://localhost:4000/v1/routine/${routine}/addExercise`, exercise).then((res) => {
      setExercises([...exercises, res.data])
    })
  }

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
            <div className="px-3">
              <AddExerciseModal
                open={exerciseModalOpen}
                setOpen={setExerciseModalOpen}
                onAdd={onAddExercise}
              />
              <button
                type="button"
                className="rounded border border-black bg-[#d9d9d9] px-2 py-1"
                onClick={() => setExerciseModalOpen(true)}
              >
                <FontAwesomeIcon icon={faPlus} className="fa-md" /> Add Exercise
              </button>
              <div>{JSON.stringify(exercises)}</div>
              <div className="grid gap-3">
                {exercises.map((exercise: any) => <Exercise key={exercise.id} {...exercise} />)}
              </div>
            </div>
          ) : null}
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
