import React, { useState, useEffect } from 'react'
import { IoPlay, IoPause } from 'react-icons/io5'
import { RiRewindFill, RiSpeedFill, RiStopFill } from 'react-icons/ri'
import {
  AiOutlineForward,
  AiOutlineAudio,
  AiFillAudio,
  AiFillHeart,
  AiOutlineHeart,
} from 'react-icons/ai'
import { useAuth } from '@src/context/AuthProvider'
import { usePlayStatus } from '@src/context/PlayStatus'
import useSpeechRecognition from '@src/hooks/useSpeechRecognition'
import { getUtterance, useSpeech } from '@src/context/SpeechProvider'
import { useSpeechActions } from '@src/context/SpeechAction'

interface PlaybarProps {
  imageUrl: string | null
  routineName: string
  exercises: any[]
  isFavorite: boolean
  onFavorite: () => void
}

const Playbar: React.FC<PlaybarProps> = ({
  imageUrl,
  routineName,
  exercises,
  isFavorite,
  onFavorite,
}) => {
  const { user } = useAuth()
  const { isPlaying } = usePlayStatus()

  const { hasRecognitionSupport } = useSpeechRecognition()

  const { synthRef, speech } = useSpeech()
  const synth = synthRef.current
  let currentExerciseIndex = speech.currentExerciseIndex
  let exerciseName = exercises[currentExerciseIndex]?.name

  const { count, setCount, isResting, setIsResting } = useSpeech()

  const styleDefault = ''
  const styleActive = 'fill-icon-active dark:fill-icon-active-dark'

  const {
    handleFastForward,
    handlePause,
    handleStop,
    handlePlay,
    handleRewind,
    handleMicrophoneClick,
    // count,
    // isResting
  } = useSpeechActions()
  const { isListening } = usePlayStatus()

  const [showPlusIcon, setShowPlusIcon] = useState(false)
  const [showLargeImage, setShowLargeImage] = useState(false)

  let timeout: NodeJS.Timeout

  const handleMouseHover = () => {
    clearTimeout(timeout)
    setShowPlusIcon(true)
  }

  const handleMouseExit = () => {
    timeout = setTimeout(() => setShowPlusIcon(false), 100)
  }

  const handlePlusIconClick = () => {
    setShowLargeImage(true)
  }

  const handleCloseLargeImage = () => {
    setShowLargeImage(false)
  }

  const [progress, setProgress] = useState(0)

  const updateProgress = () => {
    const progressPercentage =
      (speech.currentExerciseIndex / exercises.length) * 100
    setProgress(progressPercentage)
  }

  useEffect(() => {
    updateProgress()
  }, [speech.currentExerciseIndex])

  const ProgressBar = () => {
    return (
      <div className="h-1 w-full rounded-full bg-gray-300">
        <div
          className="h-1 bg-green-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    )
  }

  return (
    <>
      {user && (
        <div className="dark:bg-background-dark fixed bottom-0 left-0 right-0 flex items-center justify-center bg-gray-200 p-3 text-black">
          <div className="absolute left-4 flex items-center space-x-2 dark:text-white">
            <div
              className="relative h-10 w-10"
              onMouseEnter={handleMouseHover}
              onMouseLeave={handleMouseExit}
            >
              <img src={imageUrl} alt="null" />
              {showPlusIcon && (
                <div
                  className="absolute top-0 left-0 flex h-full w-full cursor-pointer items-center justify-center bg-black bg-opacity-0 p-1 hover:bg-opacity-50"
                  onClick={handlePlusIconClick}
                >
                  <span className="text-2xl text-white">+</span>
                </div>
              )}
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

          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-4">
              <button className="invisible lg:visible" onClick={handleRewind}>
                <RiRewindFill className={styleActive} size="1.5em" />
              </button>
              <button
                className={`invisible lg:visible`}
                onClick={isPlaying ? handlePause : handlePlay}
                disabled={isResting}
              >
                {isPlaying ? (
                  <IoPause className={styleActive} size="1.5em" />
                ) : (
                  <IoPlay className={styleActive} size="1.5em" />
                )}
              </button>
              <button
                className="invisible lg:visible"
                onClick={handleStop}
              >
                <RiStopFill className={styleActive} size="1.5em" />
              </button>
              <button
                className="invisible lg:visible"
                onClick={handleFastForward}
              >
                <RiSpeedFill className={styleActive} size="1.5em" />
              </button>
            </div>
            <ProgressBar />
          </div>

          <div className="absolute right-4 flex items-center space-x-2">
            {synth.speaking && (
              <div className='font-bold bg-primary dark:bg-secondary-dark dark:text-primary-dark rounded-full p-2'>
                {isResting ? 'Rest ' : 'Rep '} : {count !== 0 ? count : '_'}
              </div>
            )}
            <button
              className="visible lg:invisible"
              onClick={isPlaying ? handlePause : handlePlay}
            >
              {isPlaying ? (
                <IoPause className={styleActive} size="1.5em" />
              ) : (
                <IoPlay className={styleActive} size="1.5em" />
              )}
            </button>
            {hasRecognitionSupport && (
              <div className="flex flex-row items-center">
                <button onClick={handleMicrophoneClick}>
                  {isListening ? (
                    <AiFillAudio className={styleActive} size="1.5em" />
                  ) : (
                    <AiOutlineAudio className={styleActive} size="1.5em" />
                  )}
                </button>
                <p className="dark:text-secondary-dark text-sm">
                  {isListening ? 'unmuted' : 'muted'}
                </p>
              </div>
            )}
            {showLargeImage && (
              <div
                className="fixed top-0 left-0 z-50 flex flex-col h-full w-full items-center justify-center bg-black bg-opacity-50"
                onClick={handleCloseLargeImage}
              >
                <img
                  src={imageUrl}
                  alt="Exercise"
                  className="max-h-full max-w-full p-4"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Playbar
