import React, { useEffect, useState } from 'react'
import { useAuth } from '@src/context/AuthProvider'
import RoutineHeader from '@src/components/Workout/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import AddExerciseModal from '@src/components/Workout/Exercises/AddExerciseModal'
import { IExercise } from '@src/types/Workout'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import Exercise from "@src/components/Workout/Exercises/Exercise";
import Login from '../login'
import router from 'next/router'
import { useSpeech } from '@src/context/SpeechProvider'

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
  const [exercises, setExercises] = useState([])

  const [synth, setSynth] = useState(undefined)
  const { setSpeechStatus } = useSpeech()

  if (typeof window !== 'undefined') {
    useEffect(() => {
      if (!token) return
      axios.get(`http://localhost:4000/v1/routine/${routine}/get`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        setData(res.data)
        getExercises()
        getSynth()
      }).catch((err) => {
        console.log(err)
      })
    }, [token, window.location.pathname]) //fetch data on path change
  }

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
    const formattedExercise = {
      ...exercise,
        sets: parseInt(exercise.sets, 10),
        reps: parseInt(exercise.reps, 10)
    }
    setExerciseModalOpen(false)
    axios.post(`http://localhost:4000/v1/routine/${routine}/addExercise`, formattedExercise, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setExercises([...exercises, res.data])
    }).catch((err) => {
      console.log(err)
    })
  }

  const onEditExercise = async (exercise: any) => {
    const formattedExercise = {
        ...exercise,
        sets: parseInt(exercise.sets, 10),
        reps: parseInt(exercise.reps, 10)
    }
    axios.post(`http://localhost:4000/v1/routine/${formattedExercise}/editExercise`, formattedExercise, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      getExercises()
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

  const getSynth = () => {
    const synth = window.speechSynthesis
    setSynth(synth)
  }

  const onAction = (action: string) => {
    if (action === 'start') {
      const voices = synth.getVoices()
      const defaultVoice = voices.find((voice: { default: any; lang: string }) => (voice.default && voice.lang === 'en-US'))
      console.log(defaultVoice)
      const read = `Start ${data.name}. ${exercises.map((exercise, index) => `exercise ${index + 1}: ${exercise.name}`)}`
      const utterThis = new SpeechSynthesisUtterance(read)
      utterThis.voice = defaultVoice
      utterThis.addEventListener('end', (event) => {
        synth.speak(new SpeechSynthesisUtterance('. Finished routine'))
        setSpeechStatus('ended')
      })
      // utterThis.addEventListener('pause', (event) => {
      //   setAction('pause')
      // })
      // utterThis.addEventListener('resume', (event) => {
      //   setAction('resume')
      // })
      synth.speak(utterThis)
      setSpeechStatus('speaking')
    } else if (action === 'pause') {
      synth.pause()
      setSpeechStatus('paused')
    } else if (action === 'resume') {
      synth.resume()
      setSpeechStatus('speaking')
    } else if (action === 'stop') {
      synth.cancel()
      setSpeechStatus('ended')
    }
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
            onAction={onAction}
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
                className="rounded border border-black bg-[#d9d9d9] dark:bg-background-dark px-2 py-1"
                onClick={() => setExerciseModalOpen(true)}
              >
                <FontAwesomeIcon icon={faPlus} className="fa-md" /> Add Exercise
              </button>
              <button
                type="button"
                className="rounded border border-black bg-[#d9d9d9] dark:bg-background-dark px-2 py-1 ml-2"
                onClick={() => router.push(`/workout/exercises?routine=${routine}`)}
              >
                <FontAwesomeIcon icon={faSearch} className="fa-md" /> Search Exercises
              </button>
              <div>{JSON.stringify(exercises)}</div>
              <div className="grid grid-cols-2 gap-3">
                {exercises.map((exercise: any) => <Exercise key={exercise.id} {...exercise} onDelete={() => onDelete(exercise.id)} onEdit={(updatedExercise) => onEditExercise({
                  exerciseId: exercise.id,
                  ...updatedExercise
                })} />)}
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
