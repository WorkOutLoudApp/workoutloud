import React, { useState, useEffect } from 'react'
import { IoPlay, IoPause } from 'react-icons/io5'
import { RiRewindFill } from 'react-icons/ri'
import {
  AiOutlineForward,
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineAudio,
  AiFillAudio,
} from 'react-icons/ai'
import { useAuth } from '@src/context/AuthProvider'
import { usePlayStatus } from '@src/context/PlayStatus'

interface PlaybarProps {
  imageUrl: string | null
  exerciseName: string
  routineName: string
  currentExerciseIndex: number
  setCurrentExerciseIndex: React.Dispatch<React.SetStateAction<number>>
  exercises: any[]
  onAction: (action: string) => void
  spokenText: string
}

const Playbar: React.FC<PlaybarProps> = ({
  imageUrl,
  exerciseName,
  routineName,
  currentExerciseIndex,
  setCurrentExerciseIndex,
  exercises,
  onAction,
  spokenText,
}) => {
  const [liked, setLiked] = useState(false)
  const [micActive, setMicActive] = useState(false)
  const { user } = useAuth()
  const { isPlaying, setIsPlaying } = usePlayStatus()
  const styleDefault = ''
  const styleActive = 'fill-icon-active dark:fill-icon-active-dark'

  const handlePlayPause = () => {
    if (isPlaying) {
      onAction('stop')
    } else {
      onAction('start')
    }
    setIsPlaying(!isPlaying)
  }

  const handleLike = () => {
    setLiked(!liked)
  }

  const handleMicrophoneClick = () => {
    setMicActive(!micActive)
  }

  const handleRewind = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1)
      onAction('rewind')
    }
  }

  const handleFastForward = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1)
      onAction('forward')
    }
  }

  return (
    <>
      {user && (
        <div className="dark:bg-background-dark fixed bottom-0 left-0 right-0 flex items-center justify-center bg-gray-200 p-4 text-black">
          <div className="absolute left-4 flex items-center space-x-2 dark:text-white">
            <div className="h-10 w-10">
              <img src={imageUrl} alt="null" />
            </div>
            <div>
              <div className="font-bold dark:text-white">{exerciseName}</div>
              <div className="text-sm dark:text-white">{routineName}</div>
            </div>
            <button className="invisible lg:visible" onClick={handleLike}>
              {liked ? (
                <AiFillHeart size="1.5em" className="text-red-500" />
              ) : (
                <AiOutlineHeart size="1.5em" className="text-red-500" />
              )}
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button className="invisible lg:visible" onClick={handleRewind}>
              <RiRewindFill className={styleActive} size="1.5em" />
            </button>
            <button className="invisible lg:visible" onClick={handlePlayPause}>
              {isPlaying ? (
                <IoPause className={styleActive} size="1.5em" />
              ) : (
                <IoPlay className={styleActive} size="1.5em" />
              )}
            </button>
            <button
              className="invisible lg:visible"
              onClick={handleFastForward}
            >
              <AiOutlineForward className={styleActive} size="1.5em" />
            </button>
          </div>

          <div className="absolute right-4 flex items-center space-x-2">
            <button className="visible lg:invisible" onClick={handlePlayPause}>
              {isPlaying ? (
                <IoPause className={styleActive} size="1.5em" />
              ) : (
                <IoPlay className={styleActive} size="1.5em" />
              )}
            </button>
            <button onClick={handleMicrophoneClick}>
              {micActive ? (
                <AiFillAudio className={styleActive} size="1.5em" />
              ) : (
                <AiOutlineAudio className={styleActive} size="1.5em" />
              )}
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Playbar
