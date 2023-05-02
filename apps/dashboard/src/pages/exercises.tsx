import { useAuth } from '@src/context/AuthProvider'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import formStyle from '@src/styles/formStyle'

const { modalStyle, titleStyle, inputStyle, iconStyle, submitButtonStyle } = formStyle

const onAdd = (exercise: any) => {
  // fetch routines 
  // choose routines: may use checkbox? 
  // hit 'Add' button -> add exercise to routines

}

const fetchExercises = async (token: String, setState: React.Dispatch<React.SetStateAction<any[]>>) => {
  const response = await axios.get(`http://localhost:4000/v1/routine/getAllExercises`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  setState(response.data)
}

const Exercises = () => {
  const { token } = useAuth()
  const [exercises, setExercises] = useState([])

  useEffect(() => {
    if (!token) return
    fetchExercises(token, setExercises)
  }, [token])
  return (
    <div>
      <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {exercises.map((exercise) => (
          <li
            key={exercise.name}
            className="flex flex-col items-center rounded-md border p-4 shadow-sm transition duration-200 hover:scale-105 hover:shadow-lg dark:hover:shadow-secondary-dark dark:border-secondary-dark bg-primary dark:bg-primary-dark"
          >
            <h3 className="basis-1/5 mb-2 text-lg font-bold">{exercise.name}</h3>
            <img
              src={exercise.image}
              alt={`GIF of ${exercise.name} exercise`}
              className="mx-auto mb-4"
              style={{ maxWidth: '200px', maxHeight: '200px' }}
            />
            {/* <p className="mb-2 text-center">{exercise.description}</p> */}
            <div className="flex flex-col items-center">
              <span className="font-semibold text-gray-600 dark:text-slate-500">Target:</span>
              <p className="mb-2">{exercise.target}</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-semibold text-gray-600 dark:text-slate-500">
                Equipment:
              </span>
              <p className="mb-2">{exercise.equipment}</p>
            </div>
            {/* <form
                onSubmit={(e) => {
                  e.preventDefault()
                  onAdd(exercise)
                }}
              >
                <button
                  type="submit"
                  className="mt-4 rounded border border-gray-400 dark:border-transparent bg-gray-100 py-2 px-4 font-semibold text-gray-700 dark:text-dark shadow dark:bg-background-dark"
                >
                  Add to routine
                </button>
              </form> */}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Exercises