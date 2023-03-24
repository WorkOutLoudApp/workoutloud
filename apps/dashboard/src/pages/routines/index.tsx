import React, {useEffect, useState} from 'react'
import { useAuth } from '@src/context/AuthProvider'
import Routine from '@src/components/Workout/Routines/Routine'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import axios from 'axios'
import AddRoutineModal from "@src/components/Workout/Routines/AddRoutineModal"
import {IRoutine} from "@src/types/Workout"
import Login from '../login'

const Index = () => {
  const [routineModalOpen, setRoutineModalOpen] = useState(false)
  const { auth, token } = useAuth()

  console.log(auth, token)

  const [routines, setRoutines] = useState([])
  const getRoutines = () => {
    axios.get(`http://localhost:4000/v1/routine/getRoutines`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setRoutines(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }
  useEffect(() => {
    if (!token) return
    getRoutines()
  }, [token])


  const onAddExercise = async (routine: IRoutine) => {
    console.log(routine)
    axios.post(`http://localhost:4000/v1/routine/add`, routine, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setRoutineModalOpen(false)
      setRoutines([...routines, res.data])
    }).catch((err) => {
        console.log(err)
    })
  }

  const onDelete = async (id: number) => {
    axios.get(`http://localhost:4000/v1/routine/${id}/delete`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      getRoutines()
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className="w-full">
      {auth ? (
        <div className="space-y-3 p-3">
          <AddRoutineModal open={routineModalOpen} setOpen={setRoutineModalOpen} onAdd={onAddExercise} />
          <button
            type="button"
            className="rounded border border-black bg-[#d9d9d9] dark:bg-background-dark px-2 py-1"
          >
            <button type="button" onClick={() => setRoutineModalOpen(true)}>
              <FontAwesomeIcon icon={faPlus} className="fa-md" /> Add Routine
            </button>
          </button>
          <div className="border-b border-black pb-5">
            <p className="text-3xl font-bold">Your Routines</p>
            <p>{JSON.stringify(routines)}</p>
            <div className="grid grid-cols-2 gap-3">
              {routines.map((routine: any, i: number) => (
                <Routine
                  key={routine.id}
                  {...routine}
                  onDelete={() => onDelete(routine.id)}
                />
              ))}
            </div>
          </div>
          <div className="border-b border-black pb-5">
            <p className="text-3xl font-bold">Favorite Routines</p>
            <p>{JSON.stringify(routines)}</p>
            <div className="grid grid-cols-2 gap-3">
              {routines.filter((routine) => routine.isFavorite ).map((routine: any, i: number) => (
                  <Routine
                      key={routine.id}
                      {...routine}
                      onDelete={() => onDelete(routine.id)}
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
