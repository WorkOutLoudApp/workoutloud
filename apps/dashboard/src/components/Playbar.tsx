import React, { useState, useEffect } from 'react';
import { IoPlay, IoPause } from 'react-icons/io5';
import { RiRewindFill } from 'react-icons/ri';
import { AiOutlineForward, AiFillHeart, AiOutlineHeart, AiOutlineAudio, AiFillAudio } from 'react-icons/ai';
import { useAuth } from '@src/context/AuthProvider';
import axios from 'axios';

const Playbar = () => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const { user } = useAuth();

  const [currentRoutine, setCurrentRoutine] = useState({
    routine: {
      routinePicture: {
        images: [
          {
            url: '',
          },
        ],
      },
      exerciseName: '',
      routineName: [
        {
          name: '',
        },
      ],
    },
    exercises: [],
  });
  
  
  

  useEffect(() => {
    async function fetchRoutines() {
      try {
        const response = await axios.get('http://localhost:3000/routines');
        if (response.data && response.data.length > 0) {
          setCurrentRoutine(response.data[0]);
        }
      } catch (error) {
        console.error('Error fetching routines:', error);
      }
    }

    fetchRoutines();
  }, []);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleMicrophoneClick = () => {
    setMicActive(!micActive);
  };

  const handleRewind = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
    }
  };

  const handleFastForward = () => {
    if (currentRoutine && currentExerciseIndex < currentRoutine.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
  };

  return (
    <>
      {user && (
        <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center bg-gray-200 p-4 text-black">
          {currentRoutine && currentRoutine.routine ? (
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
          ) : (
            <div className="absolute left-4 flex items-center space-x-2">
              <div className="w-10 h-10">
                <img src="https://via.placeholder.com/150" alt="No routine selected" />
              </div>
              <div>
                <div className="font-bold">No routine selected</div>
              </div>
            </div>
          )}
  
          <div className="flex items-center space-x-4">
            <button className="invisible lg:visible" onClick={handleRewind}>
              <RiRewindFill size="1.5em" />
            </button>
            <button className="invisible lg:visible" onClick={handlePlayPause}>
              {isPlaying ? <IoPause size="1.5em" /> : <IoPlay size="1.5em" />}
            </button>
            <button className="invisible lg:visible" onClick={handleFastForward}>
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
  
              }

export default Playbar;
