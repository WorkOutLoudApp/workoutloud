import useSpeechRecognition from '@src/hooks/useSpeechRecognition'
import { useCallback, useEffect } from 'react'
import { usePlayStatus } from './PlayStatus'
import { getUtterance, useSpeech } from './SpeechProvider'

type Exercise = {
  name: string
}

// export const useSpeechActions = (
//   synth: SpeechSynthesis,
//   exercises: Exercise[]
// ) => {
//   const speakExercise = useCallback(
//     (exerciseIndex: number) => {
//       const voices = synth.getVoices()
//       const defaultVoice = voices.find(
//         (voice) => voice.default && voice.lang === 'en-US'
//       )

//       if (exerciseIndex >= 0 && exerciseIndex < exercises.length) {
//         const exercise = exercises[exerciseIndex]
//         const utterThis = new SpeechSynthesisUtterance(
//           `Exercise ${exerciseIndex + 1}: ${exercise.name}`
//         )
//         utterThis.voice = defaultVoice
//         synth.speak(utterThis)
//       }
//     },
//     [synth, exercises]
//   )

//   return { speakExercise }
// }

export const useSpeechActions = () => {
  const { synthRef, speech, setSpeech } = useSpeech()
  const { isPlaying, setIsPlaying, isListening} = usePlayStatus()
  const { text, setText, startListening, stopListening } = useSpeechRecognition()

  const synth = synthRef.current
  const routineName = speech.routineName
  const exercises = speech.exercises
  const currentExerciseIndex = speech.currentExerciseIndex

  useEffect(() => {
    if (text === 'play') {
      handlePlay()
    } else if (text === 'pause') {
      handlePause()
    } else if (text === 'stop') {
      handleStop()
    } else if (text === 'forward') {
      handleFastForward()
    } else if (text === 'rewind') {
      handleRewind()
    } 
  }, [text])

  const startUtterance = getUtterance(`Start ${routineName}.`)
  const exerciseUtterances: SpeechSynthesisUtterance[] = exercises.map((exercise: any, index: number) => getUtterance(`Exercise ${index + 1}: ${exercise.name}`))
  const finishUtterance = getUtterance(`. Finished routine`)
  if (finishUtterance) {
    finishUtterance.onend = () => {
      setSpeech({ ...speech, currentExerciseIndex: 0 }) // return to first exercise
      setIsPlaying(false)
      setText('') // reset voice command
    }
  }


  const speakExercise = (currentExerciseIndex: number) => {
    const utterance = exerciseUtterances[currentExerciseIndex]
    synth.speak(utterance)
    utterance.onend = () => {
      if (currentExerciseIndex < exercises.length - 1) {
        setSpeech({ ...speech, currentExerciseIndex: currentExerciseIndex + 1 })
        speakExercise(currentExerciseIndex + 1)
      } else {
        synth.speak(finishUtterance)
      }
    }
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
  
  const handlePause = () => {
    if (synth.speaking && !synth.paused) {
      synth.pause()
    }
    setIsPlaying(false)
  }

  const handleStop = () => {
    // cancel speech
    synth.cancel()
    setSpeech({ ...speech, currentExerciseIndex: 0 })
    setIsPlaying(false)
  }
  
  const handleRewind = () => {
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

  return { handlePlay, handlePause, handleStop, handleFastForward, handleRewind, handleMicrophoneClick}
}