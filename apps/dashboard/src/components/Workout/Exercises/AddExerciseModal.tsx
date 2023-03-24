import React from 'react'
import { useForm } from 'react-hook-form'
import { IExercise } from '@src/types/Workout'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  onAdd: (exercise: IExercise) => void
  title?: string
}

export default function AddExerciseModal({ open, setOpen, onAdd, title }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <div>
      {open ? (
        <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center bg-black bg-opacity-60">
          <div className="mx-auto max-w-lg rounded-md bg-white p-4 shadow-xl">
            <div className="flex justify-between">
              <h3 className="text-xl font-medium">{title ? title : 'Add Exercise' }</h3>
              <button
                type="button"
                className="font-medium text-gray-800"
                onClick={() => {
                  setOpen(false)
                }}
              >
                X
              </button>
            </div>
            <form
              className="mt-6 space-y-3"
              onSubmit={handleSubmit((data) => onAdd(data as IExercise))}
            >
              <input
                {...register('name', { required: true })}
                className="w-full rounded-md border border-gray-400 p-2"
                placeholder="Name"
              />
              <input
                  {...register('description', { required: true })}
                  className="w-full rounded-md border border-gray-400 p-2"
                  placeholder="Description"
              />
              <div className="flex space-x-2">
                <input
                    {...register('sets', { required: true })}
                    className="w-full rounded-md border border-gray-400 p-2"
                    placeholder="Sets"
                />
                <input
                    {...register('reps', { required: true })}
                    className="w-full rounded-md border border-gray-400 p-2"
                    placeholder="Reps"
                />
              </div>
              <button
                type="submit"
                className="rounded bg-blue-400/20 py-2 px-2 font-semibold text-gray-800"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  )
}

AddExerciseModal.defaultProps = {
    title: null,
}