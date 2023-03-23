import React, { useState } from 'react'
import { useAuth } from '../context/AuthProvider'

const PostPopup = () => {
  const [showModal, setShowModal] = useState(false)
  const [postContent, setPostContent] = useState('')
  const [posts, setPosts] = useState([])
  const { user } = useAuth()

  if (!user) {
    return <div>Please log in to continue.</div>
  }

  const handleOpenModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handlePostSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setPosts([...posts, postContent])
    setPostContent('')
    handleCloseModal()
  }

  return (
    <div className="flex-grow items-center justify-center">
      <div className="dark:bg-background-dark flex items-center justify-center rounded-md bg-gray-200 p-2">
        <img
          className="mr-4 h-10 w-10 rounded-full"
          src={user.avatar}
          alt="Profile"
        />
        <button
          className="dark:bg-secondary-dark borde rounded-md bg-blue-400/20 py-2 px-4 text-gray-800 hover:bg-gray-200 dark:text-black"
          onClick={handleOpenModal}
        >
          What's on your mind?
        </button>
      </div>
      {showModal && (
        <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center bg-black bg-opacity-60">
          <div className="mx-auto max-w-lg rounded-md bg-white p-4 shadow-xl">
            <div className="flex justify-between">
              <h3 className="text-xl font-medium">Create Post</h3>
              <button
                className="font-medium text-gray-800"
                onClick={handleCloseModal}
              >
                X
              </button>
            </div>
            <form onSubmit={handlePostSubmit} className="mt-6">
              <textarea
                className="w-full rounded-md border border-gray-400 p-2"
                placeholder="What's on your mind?"
                value={postContent}
                onChange={(event) => setPostContent(event.target.value)}
              />
              <button
                type="submit"
                className="rounded bg-blue-400/20 py-2 px-2 font-semibold text-gray-800"
              >
                Post
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="mt-2 max-w-md">
        {posts.reverse().map((post) => (
          <div key={post} className="mb-2 flex rounded-md bg-gray-200 p-2">
            <img
              className="mr-4 h-10 w-10 rounded-full"
              src={user.avatar}
              alt="Profile"
            />
            <div className="max-w-md">
              <p className="break-words text-gray-800">{post}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PostPopup
