import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'

interface RoutineProps {
  name: string
  description: string
  image?: string
}

export default function SidebarExercises({ name, description, image }: RoutineProps) {
  const router = useRouter()
  return (
    <div className='flex text-md'>
        <button
        type="button"
        className="flex w-full space-x-2 p-3 items-center"
        onClick={() => router.push(`/workout/${name}`)}
        >
        {image ? (
            <img src={image} alt={name} />
        ) : (
            <div className="flex aspect-square items-center place-content-center h-full rounded-full border-2">
            <FontAwesomeIcon icon={faImage} className="fa-xl" />
            </div>
        )}
        <div className="flex flex-col text-left">
            <p className="">{name}</p>
            <p className='text-sm'>{description}</p>
        </div>
        </button>
    </div>
  )
}
SidebarExercises.defaultProps = {
  image: null,
}
