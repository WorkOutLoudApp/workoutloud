import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faEye } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import axios from "axios";

interface RoutineProps {
  id: number
  name: string
  description: string
    views: number
    exercises?: any[],
  image?: string
    onDelete: () => void
    owner?: string
}

export default function Routine({ id, name, description, views, exercises, image, onDelete, owner }: RoutineProps) {
  const router = useRouter()

  return (
    <div className="flex">
      <button
          type="button"
          className="flex w-full space-x-3 border border-black bg-[#d9d9d9] dark:bg-background-dark p-3"
          onClick={() => router.push(`/routines/${id}${owner ? `?owner=${owner}` : ''}`)}
      >
        {image ? (
            <img src={image} alt={name} />
        ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black">
              <FontAwesomeIcon icon={faImage} className="fa-xl" />
            </div>
        )}
        <div className="w-full">
          <div className="flex justify-between">
              <p className="font-bold">{name}</p>
              <p className="font-bold">{views} <FontAwesomeIcon icon={faEye} /></p>
          </div>
          <div className="text-left">
              <p>{description}</p>
              {exercises && exercises.length > 0 ? <p>{exercises.length} exercise{exercises.length > 1 ? 's': ''}</p> : null}
          </div>
        </div>
      </button>
      <button type="button" className="bg-red-500 px-2 border-t border-r border-b border-black" onClick={() => onDelete()}>X</button>
    </div>
  )
}
Routine.defaultProps = {
  image: null,
    exercises: [],
    owner: null,
}
