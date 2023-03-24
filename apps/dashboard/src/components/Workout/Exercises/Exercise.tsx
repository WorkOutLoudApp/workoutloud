import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEdit, faImage, faPlay} from '@fortawesome/free-solid-svg-icons'
import AddExerciseModal from "@src/components/Workout/Exercises/AddExerciseModal";
import {IExercise} from "@src/types/Workout";

interface ExerciseProps {
  id: number
  name: string
  description: string
    reps: number,
    sets: number
  image?: string
    bodyPart?: string
    target?: string
    equipment?: string
    onDelete: () => void
    onEdit: (exercise: IExercise) => void
}

export default function Exercise({ id, name, description, reps, sets, image, bodyPart, target, equipment, onDelete, onEdit }: ExerciseProps) {
    const [isEditModalOpen, setIsEditModalOpen] = React.useState(false)
  return (
      <div className="flex">
          <AddExerciseModal title="Edit Exercise" open={isEditModalOpen} setOpen={(open) => setIsEditModalOpen(open)} onAdd={(exercise) => onEdit(exercise)} />
        <div
            className="flex w-full space-x-3 border border-black bg-[#d9d9d9] dark:bg-background-dark p-3"
        >
          {image ? (
              <img src={image} alt={name} className="w-12 h-12" />
          ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black">
                <FontAwesomeIcon icon={faImage} className="fa-xl" />
              </div>
          )}
          <div className="text-left">
            <p className="font-bold">{name}</p>
            <p>{description}</p>
              <p>Sets: {sets}</p>
            <p>Reps: {reps}</p>
              {bodyPart ? <p>Body Part: {bodyPart}</p> : null}
                {target ? <p>Target: {target}</p> : null}
                {equipment ? <p>Equipment: {equipment}</p> : null}
          </div>
        </div>
          <button type="button" className="bg-green-500 px-2 border-t border-r border-b border-black" onClick={() => setIsEditModalOpen(!isEditModalOpen)}><FontAwesomeIcon icon={faPlay} /></button>
          <button type="button" className="bg-violet-500 px-2 border-t border-r border-b border-black" onClick={() => setIsEditModalOpen(!isEditModalOpen)}><FontAwesomeIcon icon={faEdit} /></button>
        <button type="button" className="bg-red-500 px-2 border-t border-r border-b border-black" onClick={() => onDelete()}>X</button>
      </div>
  )
}
Exercise.defaultProps = {
  image: null,
    bodyPart: null,
    target: null,
    equipment: null,
}
