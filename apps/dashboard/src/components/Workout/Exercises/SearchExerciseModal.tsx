import React, { useState } from 'react'
import { IExercise } from '@src/types/Workout'
import { useForm } from 'react-hook-form'
import Exercises from '@src/pages/workout/exercises'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  onAdd: (exercise: IExercise) => void
}

export default function SearchExercisesModal({ open, setOpen, onAdd }: Props) {
  const handleAdd = (result: IExercise) => {
    onAdd(result)
    setOpen(false)
  }

  return (
    <div>
      {open ? (
        <div className="z-60 fixed top-0 left-0 flex h-full w-full items-center bg-black bg-opacity-60">
          <div className="mx-auto max-w-3xl overflow-x-hidden rounded-md bg-white p-4 shadow-xl">
            <div className="flex justify-between">
              <div className="ml-auto">
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
            </div>
            <div className="mt-4 max-h-96 overflow-y-auto">
              <Exercises />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
