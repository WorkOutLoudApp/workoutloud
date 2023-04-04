import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHeart,
  faImage,
  faPlay,
  faStop,
} from '@fortawesome/free-solid-svg-icons'
import { useSpeech } from '@src/context/SpeechProvider'
import { usePlayStatus } from '@src/context/PlayStatus'

interface RoutineHeaderProps {
  name: string
  description: string
  isFavorite: boolean
  image?: string
  tabs: string[]
  currentTab: string
  setTab: (tab: string) => void
  onFavorite: () => void
  onAction: (action: string) => void
  handlePlayStatus: (action: string) => void
}

export default function RoutineHeader({
  name,
  description,
  isFavorite,
  image,
  tabs,
  currentTab,
  setTab,
  onFavorite,
  onAction,
  handlePlayStatus
}: RoutineHeaderProps) {
  const { speechStatus } = useSpeech()
  const { isPlaying, setIsPlaying } = usePlayStatus()

  return (
    <div className="dark:bg-background-dark flex w-full flex-col items-center space-y-2 border-b border-black bg-[#d9d9d9] p-3">
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
          {speechStatus === 'speaking' && (
            <button
              type="button"
              onClick={() => {
                onAction('stop')
              }}
            >
              <FontAwesomeIcon icon={faStop} className="fa-lg" />
            </button>
          )}
          {speechStatus === 'ended' && (
            <button
              type="button"
              onClick={() => {
                onAction('start')
                setIsPlaying(true)
              }}
            >
              <FontAwesomeIcon
                icon={isPlaying ? faStop : faPlay}
                className="fa-lg"
              />
            </button>
          )}
          <button type="button" onClick={() => onFavorite()}>
            <FontAwesomeIcon
              icon={faHeart}
              className={`fa-lg ${isFavorite ? 'text-red-400' : null}`}
            />
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
