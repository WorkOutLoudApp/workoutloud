import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import axios from "axios";

interface RoutineProps {
  id: number
  name: string
  description: string
    exercises?: any[],
  image?: string
    onDelete: () => void
}

export default function Routine({ id, name, description, exercises, image, onDelete }: RoutineProps) {
  const router = useRouter()

  return (
    <div className="flex">
      <button
          type="button"
          className="flex w-full space-x-3 border border-black bg-[#d9d9d9] dark:bg-background-dark p-3"
          onClick={() => router.push(`/routines/${id}`)}
      >
        {image ? (
            <img src={image} alt={name} />
        ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black">
              <FontAwesomeIcon icon={faImage} className="fa-xl" />
            </div>
        )}
        <div className="text-left">
          <p className="font-bold">{name}</p>
          <p>{description}</p>
            {exercises && exercises.length > 0 ? <p>{exercises.length} exercise{exercises.length > 1 ? 's': ''}</p> : null}
        </div>
      </button>
      <button type="button" className="bg-red-500 px-2 border-t border-r border-b border-black" onClick={() => onDelete()}>X</button>
    </div>
  )
}
Routine.defaultProps = {
  image: null,
    exercises: []
}
