import { createContext, useContext, useState } from 'react'

interface PlayStatusContextData {
  isPlaying: boolean
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
}

const PlayStatusContext = createContext<PlayStatusContextData>({
  isPlaying: false,
  setIsPlaying: () => {},
})

export const usePlayStatus = () => {
  return useContext(PlayStatusContext)
}

interface PlayStatusProviderProps {
  children: React.ReactNode
}

export const PlayStatusProvider: React.FC<PlayStatusProviderProps> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <PlayStatusContext.Provider value={{ isPlaying, setIsPlaying }}>
      {children}
    </PlayStatusContext.Provider>
  )
}
