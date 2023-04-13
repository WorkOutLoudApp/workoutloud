import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'

interface SpeechInterface {
    synthRef: React.MutableRefObject<SpeechSynthesis>
    speech: any
    setSpeech: React.Dispatch<React.SetStateAction<any>>
}

const defaultSpeech : any = {
    voices: [],
    defaultVoice: undefined,
    utterance: undefined,
    routineName: '',
    exercises: [],
    currentExerciseIndex: 0
}

const SpeechContext = createContext({} as SpeechInterface)

export const SpeechProvider = ({ children }: any) => {
    const synthRef : React.MutableRefObject<SpeechSynthesis> = useRef(null)
    const [speech, setSpeech] = useState(defaultSpeech)

    // initialize
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedSpeechInfo = JSON.parse(localStorage.getItem('speechInfo'))
            const routineName = storedSpeechInfo?.routineName || ''
            const exercises = storedSpeechInfo?.exercises || []
            const currentExerciseIndex = storedSpeechInfo?.currentExerciseIndex || 0
            synthRef.current = window.speechSynthesis
            const voices = synthRef.current.getVoices()
            const defaultVoice = voices.find(
                (voice: { default: any; lang: string }) =>
                  voice.default && voice.lang === 'en-US'
              )
            const utterance = getUtterance('', defaultVoice)
            setSpeech({voices, defaultVoice, routineName, exercises, currentExerciseIndex})
        }
    },[])


    const value = useMemo(
        () => ({ synthRef, speech, setSpeech }),
        [synthRef, speech, setSpeech]
    )

    return (
        // return template
        <SpeechContext.Provider value={value}>{children}</SpeechContext.Provider>
    )
}

export default SpeechContext

export const useSpeech = () => useContext(SpeechContext)

export const getUtterance = (text: string, voice?: SpeechSynthesisVoice) => {
    let utterance : SpeechSynthesisUtterance = null
    if (typeof window !== 'undefined') {
        utterance =  new SpeechSynthesisUtterance(text)
    }
    if (voice) {
        utterance.voice = voice
    }
    return utterance
}
