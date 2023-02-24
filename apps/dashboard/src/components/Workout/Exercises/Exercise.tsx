import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'

interface ExerciseProps {
  id: number
  name: string
  description: string
  image?: string
}

export default function Exercise({ id, name, description, image }: ExerciseProps) {
  return (
    <div
      className="flex w-full space-x-3 border border-black bg-[#d9d9d9] p-3"
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
      </div>
    </div>
  )
}
Exercise.defaultProps = {
  image: null,
}
