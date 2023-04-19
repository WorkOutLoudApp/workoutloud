import React from 'react'
import { useForm } from 'react-hook-form'
import { IExercise } from '@src/types/Workout'
import formStyle from '@src/styles/formStyle'

const { modalStyle, titleStyle, inputStyle, iconStyle, submitButtonStyle } = formStyle
interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  onAdd: (exercise: IExercise) => void
}

export default function AddRoutineModal({ open, setOpen, onAdd }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <div>
      {open ? (
        <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center bg-black bg-opacity-60">
          <div className={modalStyle}>
            <div className="flex justify-between">
              <h3 className={titleStyle}>Add Routine</h3>
              <button
                type="button"
                className={iconStyle}
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
                className={inputStyle}
                placeholder="Name"
              />
              <input
                  {...register('description', { required: true })}
                  className={inputStyle}
                  placeholder="Description"
              />
              <button
                type="submit"
                className={submitButtonStyle}
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
