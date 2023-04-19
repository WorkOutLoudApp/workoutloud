import React from 'react'
import { useForm } from 'react-hook-form'
import { IExercise } from '@src/types/Workout'
import formStyle from '@src/styles/formStyle'

const { modalStyle, titleStyle, inputStyle, iconStyle, submitButtonStyle } = formStyle
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
          <div className={modalStyle}>
            <div className="flex justify-between">
              <h3 className={titleStyle}>{title ? title : 'Add Exercise' }</h3>
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
              <div className="flex space-x-2">
                <input
                    {...register('sets', { required: true })}
                    className={inputStyle}
                    placeholder="Sets"
                />
                <input
                    {...register('reps', { required: true })}
                    className={inputStyle}
                    placeholder="Reps"
                />
                <input
                    {...register('rest', { required: true })}
                    className={inputStyle}
                    placeholder="Rest (seconds)"
                />
              </div>
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

AddExerciseModal.defaultProps = {
    title: null,
}