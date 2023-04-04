import { useCallback } from 'react'

type Exercise = {
  name: string
}

export const useSpeechActions = (
  synth: SpeechSynthesis,
  exercises: Exercise[]
) => {
  const speakExercise = useCallback(
    (exerciseIndex: number) => {
      const voices = synth.getVoices()
      const defaultVoice = voices.find(
        (voice) => voice.default && voice.lang === 'en-US'
      )

      if (exerciseIndex >= 0 && exerciseIndex < exercises.length) {
        const exercise = exercises[exerciseIndex]
        const utterThis = new SpeechSynthesisUtterance(
          `Exercise ${exerciseIndex + 1}: ${exercise.name}`
        )
        utterThis.voice = defaultVoice
        synth.speak(utterThis)
      }
    },
    [synth, exercises]
  )

  return { speakExercise }
}
