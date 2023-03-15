import React from 'react'
import { IoPlay, IoPause } from 'react-icons/io5'
import { RiRewindFill } from 'react-icons/ri'
import { AiOutlineForward } from 'react-icons/ai'
import { useState } from 'react'
import { useAuth } from '@src/context/AuthProvider'

const Playbar = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const { user } = useAuth()

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <>
      {user && (
        <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center bg-gray-200 p-4 text-black">
          <div className="absolute left-4 text-lg">Routine Name</div>
          <div className="flex items-center space-x-4">
            <button onClick={() => console.log('Rewind')}>
              <RiRewindFill size="1.5em" />
            </button>
            <button onClick={handlePlayPause}>
              {isPlaying ? <IoPause size="1.5em" /> : <IoPlay size="1.5em" />}
            </button>
            <button onClick={() => console.log('Fast-forward')}>
              <AiOutlineForward size="1.5em" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Playbar
