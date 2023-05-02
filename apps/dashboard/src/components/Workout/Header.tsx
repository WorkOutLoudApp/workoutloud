import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHeart,
  faImage,
  faPlay,
  faStop,
  faShare
} from '@fortawesome/free-solid-svg-icons'
import { useSpeech } from '@src/context/SpeechProvider'
import { usePlayStatus } from '@src/context/PlayStatus'
import { useSpeechActions } from '@src/context/SpeechAction'

interface RoutineHeaderProps {
  name: string
  description: string
  isFavorite: boolean
  image?: string
  tabs: string[]
  currentTab: string
  setTab: (tab: string) => void
  onFavorite: () => void
  userId: string
  isOwner: boolean
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
                                        userId,
    isOwner
}: RoutineHeaderProps) {
  const { isPlaying } = usePlayStatus()
  const { handleStop, handlePlay } = useSpeechActions()
  const { synthRef } = useSpeech()
  const synth = synthRef.current

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
          {synth.speaking && (
            <button
              type="button"
              onClick={handleStop}
            >
              <FontAwesomeIcon icon={faStop} className="fa-lg" />
            </button>
          )}
          {!synth.speaking && (
            <button
              type="button"
              onClick={handlePlay}
            >
              <FontAwesomeIcon
                icon={faPlay}
                className="fa-lg"
              />
            </button>
          )}
          {isOwner ? <button type="button" onClick={() => onFavorite()}>
            <FontAwesomeIcon
                icon={faHeart}
                className={`fa-lg ${isFavorite ? 'text-red-400' : null}`}
            />
          </button> : null}
          {isOwner ? <button type="button" onClick={() => {
            navigator.clipboard.writeText(`${window.location.href}?owner=${userId}`)
            // alert('Link copied to clipboard')
          }}>
            <FontAwesomeIcon
                icon={faShare}
            />
          </button> : null}
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
