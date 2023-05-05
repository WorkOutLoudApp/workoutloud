import useSpeechRecognition from '@src/hooks/useSpeechRecognition'
import { delay } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { usePlayStatus } from './PlayStatus'
import { getUtterance, useSpeech } from './SpeechProvider'

type Exercise = {
  name: string
}

export const useSpeechActions = () => {
  const { synthRef, speech, setSpeech } = useSpeech()
  const { isPlaying, setIsPlaying, isListening } = usePlayStatus()
  const { text, setText, startListening, stopListening } = useSpeechRecognition()
  const { count, setCount, isResting, setIsResting } = useSpeech()

  const synth = synthRef.current
  const routineName = speech.routineName
  const exercises = speech.exercises
  const currentExerciseIndex = speech.currentExerciseIndex

  useEffect(() => {
    if (text === 'play') {
      setText('')
      handlePlay()
    } else if (text === 'pause') {
      setText('')
      handlePause()
    } else if (text === 'stop') {
      setText('')
      handleStop()
    } else if (text === 'forward') {
      setText('')
      handleFastForward()
    } else if (text === 'rewind') {
      setText('')
      handleRewind()
    }
  }, [text])

  const startUtterance = getUtterance(`Start ${routineName}.`)
  const exerciseUtterances: SpeechSynthesisUtterance[] = exercises.map((exercise: any, index: number) => getUtterance(`. Exercise ${index + 1}: ${exercise.name}. ${exercise.sets} ${exercise.sets > 1 ? 'sets' : 'set'}, ${exercise.reps} repetitions.`))
  const finishUtterance = getUtterance(`. Finished routine`)
  if (finishUtterance) {
    finishUtterance.onend = () => {
      setSpeech({ ...speech, currentExerciseIndex: 0 }) // return to first exercise
      setIsPlaying(false)
      setText('') // reset voice command
      setCount(0)
    }
  }


  const speakExercise = async (currentExerciseIndex: number) => {
    const exercise = exercises[currentExerciseIndex]
    const utteranceExerciseStart = exerciseUtterances[currentExerciseIndex]
    const sets = exercise.sets
    const reps = exercise.reps
    const rest = exercise.rest

    const utteranceExerciseFinished = getUtterance(`. Finished exercise`)
    utteranceExerciseFinished.onend = () => {
      if (currentExerciseIndex < exercises.length - 1) {
        setSpeech({ ...speech, currentExerciseIndex: currentExerciseIndex + 1 })
        speakExercise(currentExerciseIndex + 1)
      } else {
        synth.speak(finishUtterance)
      }
    }

    const countdown = (r: number) => {
      const utteranceRest = getUtterance(`. ${r}`)
      utteranceRest.onstart = () => {
        setCount(r)
        console.log('Rest remaining: ', r)
      }
      if (r > 5) {
        utteranceRest.volume = 0
      }
      if (r === 1) {
        utteranceRest.onend = () => {
          setCount(0)
          setIsResting(false)
          if (set < sets) {
            set++
            speakSet()
          } else {
            synth.speak(utteranceExerciseFinished)
          }
        }
      }
      synth.speak(utteranceRest)
      if (r > 1) {
        countdown(r - 1)
      }
    }

    let set = 1
    const speakSet = () => {
      setCount(0)
      synth.speak(getUtterance(`. Set ${set}. Start`))
      // reps 
      for (let j = 0; j < reps; j++) {
        const rep = j + 1
        const utteranceRep = getUtterance(`.. ${rep}`)
        utteranceRep.onstart = (() => {
          setCount(rep)
          console.log('count: ', rep)
        })
        synth.speak(utteranceRep)
      }
      if (!((set === sets) && (currentExerciseIndex === exercises.length - 1))) {
        const utteranceRestStart = getUtterance(`. Rest for ${rest} seconds`)
        utteranceRestStart.onend = (() => {
          setIsResting(true)
          countdown(rest)
        })
        setCount(0)
        synth.speak(utteranceRestStart)
      } else {
        synth.speak(utteranceExerciseFinished)
      }
    }

    synth.speak(utteranceExerciseStart)
    speakSet()

  }

  const speakOneExercise = async (currentExerciseIndex: number) => {
    synth.cancel()
    const exercise = exercises[currentExerciseIndex]
    const utteranceExerciseStart = exerciseUtterances[currentExerciseIndex]
    const sets = exercise.sets
    const reps = exercise.reps
    const rest = exercise.rest

    const utteranceExerciseFinished = getUtterance(`. Finished exercise`)
    utteranceExerciseFinished.onend = () => {
      handleStop()
    }

    const countdown = (r: number) => {
      const utteranceRest = getUtterance(`. ${r}`)
      utteranceRest.onstart = () => {
        setCount(r)
        console.log('Rest remaining: ', r)
      }
      if (r > 5) {
        utteranceRest.volume = 0
      }
      if (r === 1) {
        utteranceRest.onend = () => {
          setCount(0)
          setIsResting(false)
          if (set < sets) {
            set++
            speakSet()
          } else {
            synth.speak(utteranceExerciseFinished)
          }
        }
      }
      synth.speak(utteranceRest)
      if (r > 1) {
        countdown(r - 1)
      }
    }

    let set = 1
    const speakSet = () => {
      setCount(0)
      synth.speak(getUtterance(`. Set ${set}. Start`))
      // reps 
      for (let j = 0; j < reps; j++) {
        const rep = j + 1
        const utteranceRep = getUtterance(`.. ${rep}`)
        utteranceRep.onstart = (() => {
          setCount(rep)
          console.log('count: ', rep)
        })
        synth.speak(utteranceRep)
      }
      if (set !== sets) {
        const utteranceRestStart = getUtterance(`. Rest for ${rest} seconds`)
        utteranceRestStart.onend = (() => {
          setIsResting(true)
          countdown(rest)
        })
        setCount(0)
        synth.speak(utteranceRestStart)
      } else {
        synth.speak(utteranceExerciseFinished)
        
      }
    }

    synth.speak(utteranceExerciseStart)
    speakSet()

  }

  const handlePlay = () => {
    if (exerciseUtterances.length > 0) {
      if (!synth.speaking) {
        // start routine from beginning
        synth.speak(startUtterance)
        speakExercise(currentExerciseIndex)
      } else {
        if (synth.paused) {
          synth.resume()
        }
      }
      setIsPlaying(true)
    } else {
      synth.speak(getUtterance(`This routine has no exercises`))
    }
  }

  const handlePlayOneExercise = (exerciseIndex: number) => {
    handleStop()
    setSpeech({...speech, currentExerciseIndex:exerciseIndex})
    speakOneExercise(exerciseIndex)
    setIsPlaying(true)
  }


  const handlePause = () => {
    if (synth.speaking && !synth.paused) {
      synth.pause()
    }
    setIsPlaying(false)
  }

  const handleStop = () => {
    // cancel speech
    setIsResting(false)
    setIsPlaying(false)
    setCount(0)
    synth.cancel()
    setSpeech({ ...speech, currentExerciseIndex: 0 })
  }

  const handleRewind = () => {
    setIsResting(false)
    let newExerciseIndex = currentExerciseIndex
    if (currentExerciseIndex > 0) {
      newExerciseIndex = currentExerciseIndex - 1
      setSpeech({ ...speech, currentExerciseIndex: newExerciseIndex })
    }
    //speak new exercise
    synth.cancel() // clear queue
    if (!isPlaying) {
      setIsPlaying(true)
    }
    speakExercise(newExerciseIndex)
  }

  const handleFastForward = () => {
    setIsResting(false)
    let newExerciseIndex = currentExerciseIndex
    if (currentExerciseIndex < exercises.length - 1) {
      newExerciseIndex = currentExerciseIndex + 1
      setSpeech({ ...speech, currentExerciseIndex: newExerciseIndex })
    }
    //speak new exercise
    synth.cancel()
    if (!isPlaying) {
      setIsPlaying(true)
    }
    speakExercise(newExerciseIndex)
  }

  const handleMicrophoneClick = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  // return { handlePlay, handlePause, handleStop, handleFastForward, handleRewind, handleMicrophoneClick, count, isResting, speakOneExercise, handlePlayOneExercise }
  return { handlePlay, handlePause, handleStop, handleFastForward, handleRewind, handleMicrophoneClick, speakOneExercise, handlePlayOneExercise }

}