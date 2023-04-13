import React, { useEffect, useState } from 'react'
import { useAuth } from '@src/context/AuthProvider'
import RoutineHeader from '@src/components/Workout/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import AddExerciseModal from '@src/components/Workout/Exercises/AddExerciseModal'
import { IExercise } from '@src/types/Workout'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import Exercise from '@src/components/Workout/Exercises/Exercise'
import Login from '../login'
import router from 'next/router'
import { useSpeech } from '@src/context/SpeechProvider'
import Playbar from '@src/components/Playbar'
import { usePlayStatus } from '@src/context/PlayStatus'
import { useSpeechActions } from '@src/context/SpeechAction'

const headerTabs = ['Exercises', 'History', 'Settings']
interface RoutinePageProps {
  routine: string
}
const RoutinePage = ({ routine }: RoutinePageProps) => {
  const { auth, token } = useAuth()
  const [currentTab, setCurrentTab] = useState(headerTabs[0])
  const [exerciseModalOpen, setExerciseModalOpen] = useState(false)

  const [data, setData] = useState<any>(null)
  const [exercises, setExercises] = useState([])

  const { synthRef, speech, setSpeech } = useSpeech()
  const { handleStop } = useSpeechActions()

  const synth = synthRef.current

  const currentExerciseIndex = speech.currentExerciseIndex
  const [currentSpokenText, setCurrentSpokenText] = useState('')
  const [isFavorite, setIsFavorite] = useState(false);
  
  let currentRoutine : any = null
  let currentExercises : any = null

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  


  const currentExercise =
    exercises.length > 0
      ? exercises[currentExerciseIndex]
      : { image: null, name: '', routineName: '' }

  if (typeof window !== 'undefined') {
    useEffect(() => {
      if (!token) return
      handleStop()
      axios
        .get(`http://localhost:4000/v1/routine/${routine}/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setData(res.data)
          getExercises()
          currentRoutine = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    }, [token, routine]) //fetch data on path change
  }

  const getExercises = () => {
    axios
      .get(`http://localhost:4000/v1/routine/${routine}/getExercises`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setExercises(res.data)
        currentExercises = res.data
        updateSpeech(currentRoutine, currentExercises)
        if (res.data.length > 0) {
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const updateSpeech = (routine: any, exercises: any) => {
    setSpeech({...speech, routineName: routine.name, exercises: exercises, currentExerciseIndex: 0})
  }

  const onAddExercise = async (exercise: IExercise) => {
    const formattedExercise = {
      ...exercise,
      sets: parseInt(exercise.sets, 10),
      reps: parseInt(exercise.reps, 10),
    }
    setExerciseModalOpen(false)
    axios
      .post(
        `http://localhost:4000/v1/routine/${routine}/addExercise`,
        formattedExercise,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setExercises([...exercises, res.data])
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onEditExercise = async (exercise: any) => {
    const formattedExercise = {
      ...exercise,
      sets: parseInt(exercise.sets, 10),
      reps: parseInt(exercise.reps, 10),
    }
    axios
      .post(
        `http://localhost:4000/v1/routine/${formattedExercise}/editExercise`,
        formattedExercise,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        getExercises()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onFavorite = async () => {
    axios
      .patch(
        `http://localhost:4000/v1/routine/${routine}/favorite`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setData(res.data)
        setIsFavorite(res.data.isFavorite);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onDelete = async (id: number) => {
    axios
      .get(`http://localhost:4000/v1/routine/${id}/deleteExercise`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        getExercises()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="w-full">
      {auth ? (
        <div className="space-y-3">
          {data ? (
            <RoutineHeader
              name={data.name}
              description={data.description}
              isFavorite={data.isFavorite}
              tabs={headerTabs}
              currentTab={currentTab}
              setTab={setCurrentTab}
              onFavorite={onFavorite}
            />
          ) : null}
          {currentTab === 'Exercises' ? (
            <div className="px-3">
              <AddExerciseModal
                open={exerciseModalOpen}
                setOpen={setExerciseModalOpen}
                onAdd={onAddExercise}
              />
              <button
                type="button"
                className="dark:bg-background-dark rounded border border-black bg-[#d9d9d9] px-2 py-1"
                onClick={() => setExerciseModalOpen(true)}
              >
                <FontAwesomeIcon icon={faPlus} className="fa-md" /> Add Exercise
              </button>
              <button
                type="button"
                className="dark:bg-background-dark ml-2 rounded border border-black bg-[#d9d9d9] px-2 py-1"
                onClick={() =>
                  router.push(`/workout/exercises?routine=${routine}`)
                }
              >
                <FontAwesomeIcon icon={faSearch} className="fa-md" /> Search
                Exercises
              </button>
              <div>{JSON.stringify(exercises)}</div>
              <div className="grid grid-cols-2 gap-3">
                {exercises.map((exercise: any) => (
                  <Exercise
                    key={exercise.id}
                    {...exercise}
                    onDelete={() => onDelete(exercise.id)}
                    onEdit={(updatedExercise) =>
                      onEditExercise({
                        exerciseId: exercise.id,
                        ...updatedExercise,
                      })
                    }
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <Login />
      )}
      <Playbar
        imageUrl={currentExercise?.image}
        routineName={data ? data.name : ''}
        exercises={exercises}
        isFavorite={isFavorite}
        onFavorite={onFavorite}
      />
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
