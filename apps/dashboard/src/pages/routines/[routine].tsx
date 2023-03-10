import React, {useEffect, useState} from 'react'
import { useAuth } from '@src/context/AuthProvider'
import RoutineHeader from '@src/components/Workout/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import AddExerciseModal from '@src/components/Workout/Exercises/AddExerciseModal'
import { IExercise } from '@src/types/Workout'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import Exercise from "@src/components/Workout/Exercises/Exercise";
import Login from '../login'

const headerTabs = ['Exercises', 'History', 'Settings']
interface RoutinePageProps {
  routine: string
}
const RoutinePage = ({
 routine
}: RoutinePageProps) => {
  const { auth, token } = useAuth()
  const [currentTab, setCurrentTab] = useState(headerTabs[0])
  const [exerciseModalOpen, setExerciseModalOpen] = useState(false)

  const [data, setData] = useState<any>(null)
  useEffect(() => {
    if (!token) return
    axios.get(`http://localhost:4000/v1/routine/${routine}/get`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setData(res.data)
    }).catch((err) => {
        console.log(err)
    })
  }, [token])

  const [exercises, setExercises] = useState([])
  useEffect(() => {
    if (!token) return
    getExercises()
  }, [token])

  const getExercises = () => {
    axios.get(`http://localhost:4000/v1/routine/${routine}/getExercises`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setExercises(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }

  const onAddExercise = async (exercise: IExercise) => {
    setExerciseModalOpen(false)
    axios.post(`http://localhost:4000/v1/routine/${routine}/addExercise`, exercise, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setExercises([...exercises, res.data])
    }).catch((err) => {
        console.log(err)
    })
  }

  const onFavorite = async () => {
    axios.patch(`http://localhost:4000/v1/routine/${routine}/favorite`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setData(res.data)
    }).catch((err) => {
        console.log(err)
    })
  }

  const onDelete = async (id: number) => {
    axios.get(`http://localhost:4000/v1/routine/${id}/deleteExercise`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      getExercises()
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className="w-full">
      {auth ? (
        <div className="space-y-3">
          {data ? <RoutineHeader
              name={data.name}
              description={data.description}
              isFavorite={data.isFavorite}
              tabs={headerTabs}
              currentTab={currentTab}
              setTab={setCurrentTab}
              onFavorite={onFavorite}
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
                {exercises.map((exercise: any) => <Exercise key={exercise.id} {...exercise} onDelete={() => onDelete(exercise.id)} />)}
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
  return {
    props: {
      routine,
    },
  }
}

export default RoutinePage
