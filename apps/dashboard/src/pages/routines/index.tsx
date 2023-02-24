import React, {useEffect, useState} from 'react'
import { useAuth } from '@src/context/AuthProvider'
import Routine from '@src/components/Workout/Routines/Routine'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import axios from 'axios'
import AddRoutineModal from "@src/components/Workout/Routines/AddRoutineModal";
import {IRoutine} from "@src/types/Workout"
import Login from '../login'

const Index = () => {
  const [routineModalOpen, setRoutineModalOpen] = useState(false)
  const { auth } = useAuth()

  const [routines, setRoutines] = useState([])
  useEffect(() => {
    axios.get(`http://localhost:4000/v1/routine/getRoutines`).then((res) => setRoutines(res.data))
  }, [])
  const onAddExercise = async (routine: IRoutine) => {
    axios.post(`http://localhost:4000/v1/routine/add`, routine).then((res) => {
      setRoutineModalOpen(false)
      setRoutines([...routines, res.data])
    })
  }

  return (
    <div className="w-full">
      {auth ? (
        <div className="space-y-3 p-3">
          <AddRoutineModal open={routineModalOpen} setOpen={setRoutineModalOpen} onAdd={onAddExercise} />
          <button
            type="button"
            className="rounded border border-black bg-[#d9d9d9] px-2 py-1"
          >
            <button type="button" onClick={() => setRoutineModalOpen(true)}>
              <p>
                <FontAwesomeIcon icon={faPlus} className="fa-md" /> Add Routine
              </p>
            </button>
          </button>
          <div className="border-b border-black pb-5">
            <p className="text-3xl font-bold">Your Routines</p>
            <p>{JSON.stringify(routines)}</p>
            <div className="grid grid-cols-2 gap-3">
              {routines.map((routine: any, i: number) => (
                <Routine
                  // eslint-disable-next-line react/no-array-index-key
                  key={i}
                  id={routine.id}
                  name={routine.name}
                  description={routine.description}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold">Favorite Routines</p>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  )
}

export default Index
