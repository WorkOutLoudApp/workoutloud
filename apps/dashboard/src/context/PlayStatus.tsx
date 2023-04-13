import { createContext, useContext, useState } from 'react'

interface PlayStatusContextData {
  isPlaying: boolean
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
  isListening: boolean
  setIsListening: React.Dispatch<React.SetStateAction<boolean>>
}

const PlayStatusContext = createContext<PlayStatusContextData>({
  isPlaying: false,
  setIsPlaying: () => {},
  isListening: false,
  setIsListening: () => {},
})

export const usePlayStatus = () => {
  return useContext(PlayStatusContext)
}

interface PlayStatusProviderProps {
  children: React.ReactNode
}

export const PlayStatusProvider: React.FC<PlayStatusProviderProps> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isListening, setIsListening] = useState(false)

  return (
    <PlayStatusContext.Provider value={{ isPlaying, setIsPlaying, isListening, setIsListening }}>
      {children}
    </PlayStatusContext.Provider>
  )
}
