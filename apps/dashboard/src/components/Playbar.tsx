import React, { useState } from 'react';
import { IoPlay, IoPause } from 'react-icons/io5';
import { RiRewindFill } from 'react-icons/ri';
import { AiOutlineForward, AiFillHeart, AiOutlineHeart, AiOutlineAudio, AiFillAudio } from 'react-icons/ai';
import { useAuth } from '@src/context/AuthProvider';

const Playbar = () => {
  // Add a song object for demonstration purposes
  const currentRoutine = {
    routine: {
      routinePicture: {
        images: [
          {
            url: 'https://via.placeholder.com/150',
          },
        ],
      },
      exerciseName: 'Exercise Name',
      routineName: [
        {
          name: 'Routine Name',
        },
      ],
    },
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const { user } = useAuth();

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleMicrophoneClick = () => {
    setMicActive(!micActive);
  };

  return (
    <>
      {user && (
        <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center bg-gray-200 dark:bg-primary-variant-dark p-4 text-black dark:text-dark">
          <div className="absolute left-4 flex items-center space-x-2">
            <div className="w-10 h-10">
              <img src={currentRoutine.routine.routinePicture.images[0].url} alt="exercise" />
            </div>
            <div>
              <div className="font-bold">{currentRoutine.routine.exerciseName}</div>
              <div className="text-sm">{currentRoutine.routine.routineName[0].name}</div>
            </div>
            <button className="invisible lg:visible" onClick={handleLike}>
              {liked ? (
                <AiFillHeart size="1.5em" className="text-red-500" />
              ) : (
                <AiOutlineHeart size="1.5em" className="text-red-500" />
              )}
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button className="invisible lg:visible" onClick={() => console.log('Rewind')}>
              <RiRewindFill size="1.5em" />
            </button>
            <button className="invisible lg:visible"  onClick={handlePlayPause}>
              {isPlaying ? <IoPause size="1.5em" /> : <IoPlay size="1.5em" />}
            </button>
            <button className="invisible lg:visible" onClick={() => console.log('Fast-forward')}>
              <AiOutlineForward size="1.5em" />
            </button>
          </div>

          <div className="absolute right-4 flex items-center space-x-2">
          <button className="visible lg:invisible" onClick={handlePlayPause}>
              {isPlaying ? <IoPause size="1.5em" /> : <IoPlay size="1.5em" />}
            </button>
            <button onClick={handleMicrophoneClick}>
              {micActive ? <AiFillAudio size="1.5em" /> : <AiOutlineAudio size="1.5em" />}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Playbar;
