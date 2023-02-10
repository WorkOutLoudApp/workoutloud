import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faImage, faPlay } from '@fortawesome/free-solid-svg-icons'

interface RoutineHeaderProps {
  name: string
  description: string
  image?: string
  tabs: string[]
  currentTab: string
  setTab: (tab: string) => void
}

export default function RoutineHeader({
  name,
  description,
  image,
  tabs,
  currentTab,
  setTab,
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
          <button type="button">
            <FontAwesomeIcon icon={faPlay} className="fa-lg" />
          </button>
          <button type="button">
            <FontAwesomeIcon icon={faHeart} className="fa-lg" />
          </button>
        </div>
      </div>
      <div className="flex space-x-5">
        {tabs.map((t, i: number) => (
          <button
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            type="button"
            className={currentTab === t && 'font-bold'}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  )
}
RoutineHeader.defaultProps = {
  image: null,
}
