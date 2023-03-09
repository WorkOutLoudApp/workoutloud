import React from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import routinesIcon from '../assets/health.png'
import { useRouter } from 'next/router'
import { StaticImageData } from 'next/image'

interface RoutineProps {
  name: string
  description?: string
  image?: string | StaticImageData
}

export default function SidebarRoutines({ name, description, image }: RoutineProps) {
  const router = useRouter()
  return (
    <div className='flex items-center text-md h-14 w-full'>
      <button
        type="button"
        className="flex flex-row w-full space-x-2 p-3 items-center h-full"
        onClick={() => router.push(`/workout/${name}`)}
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
          <p className="">{name}</p>
          <p className='text-sm'>{description}</p>
        </div>
      </button>
    </div>
  )
}
SidebarRoutines.defaultProps = {
  image: null,
}
