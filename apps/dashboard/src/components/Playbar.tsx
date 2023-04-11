import React, { useState, useEffect } from 'react'
import { IoPlay, IoPause } from 'react-icons/io5'
import { RiRewindFill } from 'react-icons/ri'
import {
  AiOutlineForward,
  AiOutlineAudio,
  AiFillAudio,
  AiFillHeart,
  AiOutlineHeart,
} from 'react-icons/ai'
import { useAuth } from '@src/context/AuthProvider'
import { usePlayStatus } from '@src/context/PlayStatus'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import useSpeechRecognition from '@src/hooks/useSpeechRecognition'

interface PlaybarProps {
  imageUrl: string | null
  exerciseName: string
  routineName: string
  currentExerciseIndex: number
  setCurrentExerciseIndex: React.Dispatch<React.SetStateAction<number>>
  exercises: any[]
  onAction: (action: string) => void
  spokenText: string
  isFavorite: boolean
  onFavorite: () => void
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
  isFavorite,
  onFavorite,
}) => {
  // const [micActive, setMicActive] = useState(false)
  const { user } = useAuth()
  const { isPlaying, setIsPlaying } = usePlayStatus()

  const { text, isListening, setIsListening, startListening, stopListening, hasRecognitionSupport } = useSpeechRecognition()

  const styleDefault = ''
  const styleActive = 'fill-icon-active dark:fill-icon-active-dark'

  useEffect(() => {
    if (text === 'play') {
      handlePlayPause()
    } else if (text === 'pause') {
      handlePlayPause()
    } else if (text === 'stop') {
      handleStop()
    } else if (text === 'forward') {
      handleFastForward()
    } else if (text === 'backward' || text === 'rewind') {
      handleRewind()
    }
  }, [text])

  const handleStop = () => {
      //TODO: cancel speech
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      //TODO: pause speech
    } else {
      //TODO: play/resume speech
    }
    setIsPlaying(!isPlaying)
  }

  const handleMicrophoneClick = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  const handleRewind = () => {
    let newExerciseIndex = null
    if (currentExerciseIndex > 0) {
      newExerciseIndex = currentExerciseIndex - 1
      setCurrentExerciseIndex(newExerciseIndex)
      exerciseName = exercises[newExerciseIndex]
    }
    //TODO: speak new exercise
  }

  const handleFastForward = () => {
    let newExerciseIndex = null
    if (currentExerciseIndex < exercises.length - 1) {
      newExerciseIndex = currentExerciseIndex + 1
      setCurrentExerciseIndex(newExerciseIndex)
      exerciseName = exercises[newExerciseIndex].name
    }
    //TODO: speak new exercise
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
            <button
              className="invisible lg:visible"
              type="button"
              onClick={() => onFavorite()}
            >
              {isFavorite ? (
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
            {hasRecognitionSupport && (
              <div className='flex flex-row items-center'>
                <button onClick={handleMicrophoneClick}>
                  {isListening ? (
                    <AiFillAudio className={styleActive} size="1.5em" />
                  ) : (
                    <AiOutlineAudio className={styleActive} size="1.5em" />
                  )}
                </button>
                <p className='dark:text-secondary-dark text-sm'>{isListening ? 'unmuted' : 'muted'}</p>
              </div>
            )

            }
          </div>
        </div>
      )}
    </>
  )
}

export default Playbar
