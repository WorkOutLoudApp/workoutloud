import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react'

interface SpeechInterface {
    speech: any
    setSpeech: React.Dispatch<React.SetStateAction<any>>
    speechStatus: any
    setSpeechStatus: React.Dispatch<React.SetStateAction<any>>

}


const SpeechContext = createContext({} as SpeechInterface)

export const SpeechProvider = ({ children }: any) => {
    const [speech, setSpeech] = useState(undefined)
    const [speechStatus, setSpeechStatus] = useState('ended')

    const value = useMemo(
        () => ({ speech, setSpeech, speechStatus, setSpeechStatus }),
        [speech, setSpeech, speechStatus, setSpeechStatus]
    )

    return (
        // return template
        <SpeechContext.Provider value={value}>{children}</SpeechContext.Provider>
    )
}

export default SpeechContext


export const useSpeech = () => useContext(SpeechContext)

