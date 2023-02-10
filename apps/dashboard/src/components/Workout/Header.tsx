import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faImage, faPlay } from '@fortawesome/free-solid-svg-icons'

interface RoutineHeaderProps {
  name: string
  description: string
  image?: string
}

export default function RoutineHeader({
  name,
  description,
  image,
}: RoutineHeaderProps) {
  return (
    <div className="flex w-full flex-col items-center space-y-2 border-b border-black bg-[#d9d9d9] p-3">
      <div className="flex w-full justify-between">
        <div className="flex space-x-3">
          {image ? (
            <img src={image} alt={name} />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black">
              <FontAwesomeIcon icon={faImage} className="fa-xl" />
            </div>
          )}
          <div>
            <p className="font-bold">{name}</p>
            <p>{description}</p>
          </div>
        </div>
        <div className="space-x-5">
          <FontAwesomeIcon icon={faPlay} className="fa-lg" />
          <FontAwesomeIcon icon={faHeart} className="fa-lg" />
        </div>
      </div>
      <div className="flex space-x-5">
        <button type="button" className="font-bold">
          Exercises
        </button>
        <button type="button">History</button>
        <button type="button">Settings</button>
      </div>
    </div>
  )
}
RoutineHeader.defaultProps = {
  image: null,
}
