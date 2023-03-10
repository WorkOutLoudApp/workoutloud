import React from 'react'
import Image, { StaticImageData } from 'next/image'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'

interface ExerciseProps {
  name: string
  image?: string | StaticImageData
}

export default function SidebarExercises({ name, image }: ExerciseProps) {
  const router = useRouter()
  return (
    <div className='flex items-center text-md h-14 w-full'>
      <button
        type="button"
        className="flex flex-row w-full space-x-2 p-3 items-center h-full"
        onClick={() => router.push(`/routines/exercises/${name}`)}
      >
        {image ? (
          <div className="flex aspect-square items-center place-content-center rounded-full h-full">
            <Image src={image} layout='intrinsic'></Image>
          </div>
        ) : (
          <div className="flex aspect-square items-center place-content-center h-full rounded-full border-2">
            <FontAwesomeIcon icon={faImage} className="fa-xl" />
          </div>
        )}
        <div className="flex flex-col text-left w-full">
          <p className="text-base">{name}</p>
        </div>
      </button>
    </div>
  )
}
SidebarExercises.defaultProps = {
  image: null,
}