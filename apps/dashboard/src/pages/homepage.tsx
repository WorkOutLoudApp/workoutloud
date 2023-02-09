import React, { useState } from 'react';

import { useAuth } from '@src/context/AuthProvider';

import Login from './login'

const PostPopup: React.FC = () => {
  const { auth } = useAuth()
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className='w-full'>
      {auth ? (
        <div>
          <div className='w-full p-2'>
            <div className='flex items-center justify-center p-2 bg-gray-200 rounded-md'>
              <img className='w-10 h-10 rounded-full mr-4' src='https://randomuser.me/api/portraits/lego/1.jpg' alt='Profile' />
              <button type='button' className='bg-blue-400/20 py-2 px-4 border border-gray-400 rounded-md text-gray-800 hover:bg-gray-200' onClick={handleOpenModal}>{`What's on your mind?`}</button>
            </div>
            {showModal && (
              <div className='fixed top-0 left-0 w-full h-full flex items-center bg-black bg-opacity-60 z-50'>
                <div className='max-w-lg mx-auto p-4 bg-white rounded-md shadow-xl'>
                  <div className='flex justify-between'>
                    <h3 className='text-xl font-medium'>Create Post</h3>
                    <button type='button' className='text-gray-800 font-medium' onClick={handleCloseModal}>X</button>
                  </div>
                  <form className='mt-6'>
                    <textarea className='w-full p-2 border border-gray-400 rounded-md' placeholder='Whats on your mind?' />
                    <button type='submit' className='py-2 px-2 bg-blue-400/20 font-semibold text-gray-800 rounded'>Post</button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className=''>
          <Login />
        </div>
      )}
    </div>

  )
}

export default PostPopup;
