import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthProvider'
import formStyle from "@src/styles/formStyle";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons/faHeart"
import {faArrowRight} from "@fortawesome/free-solid-svg-icons/faArrowRight";
import {useRouter} from "next/router";

const { modalStyle, titleStyle, inputStyle, iconStyle, submitButtonStyle } = formStyle
const Homepage = () => {

  const { user, auth, token } = useAuth()
    console.log(user, auth, token)

  const [showModal, setShowModal] = useState(false)
  const [postContent, setPostContent] = useState('')

  const [posts, setPosts] = useState([])
  const getPosts = () => {
    axios
        .get(`http://localhost:4000/v1/post/getPosts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setPosts(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
  }

    const [linkedRoutine, setLinkedRoutine] = useState(null)
  const addPost = (description: string) => {
    axios
        .post(`http://localhost:4000/v1/post/add`, {
          description,
            linkedRoutine,
        },{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => {
          setPosts((prev) => [res.data, ...prev])
        })
        .catch((err) => {
          console.log(err)
        })
  }

    const likePost = (postId: number) => {
        axios
            .post(`http://localhost:4000/v1/post/${postId}/like`,{}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => {
            getPosts()
        })
            .catch((err) => {
                console.log(err)
            })
    }

    const [routines, setRoutines] = useState([])
    const getRoutines = () => {
        axios
            .get(`http://localhost:4000/v1/routine/getRoutines`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setRoutines(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

  useEffect(() => {
    if (!token) return
    getPosts()
  }, [token])

    useEffect(() => {
        if (!token || !showModal) return
        getRoutines()
    }, [token, showModal])

  const handleOpenModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handlePostSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    addPost(postContent)
    setPostContent('')
  setLinkedRoutine(null)
    handleCloseModal()
  }

    const router = useRouter()

  if (!user) {
    return <div>Please log in to continue.</div>
  }

    return (
        <div className="flex-grow items-center justify-center">
            <div className="dark:bg-background-dark flex items-center justify-center bg-gray-200 p-2">
                <img
                    className="mr-4 h-10 w-10 rounded-full"
                    src={user.avatar}
                    alt="Profile"
                />
                <button
                    type="button"
                    className="dark:bg-secondary-dark borde rounded-md bg-blue-400/20 py-2 px-4 text-gray-800 hover:bg-gray-200 dark:text-black"
                    onClick={handleOpenModal}
                >
                    What's on your mind?
                </button>
            </div>
            {showModal && (
                <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center bg-black bg-opacity-60">
                    <div className={modalStyle}>
                        <div className="flex justify-between">
                            <h3 className={titleStyle}>Create Post</h3>
                            <button
                                className={iconStyle}
                                onClick={handleCloseModal}
                            >
                                X
                            </button>
                        </div>
                        <form onSubmit={handlePostSubmit} className="mt-6">
              <textarea
                  className={inputStyle}
                  placeholder="What's on your mind?"
                  value={postContent}
                  onChange={(event) => setPostContent(event.target.value)}
              />
                            <div>
                                <p>Link a routine</p>
                                <select className={inputStyle} onChange={(event) => {
                                    const routineId = parseInt(event.target.value, 10)
                                    setLinkedRoutine(routineId)
                                }}>
                                    <option key='empty' value=""/>
                                    {routines.map((routine) => (
                                        <option key={routine.id} value={routine.id}>
                                            {routine.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mt-2">
                                <button
                                    type="submit"
                                    className={submitButtonStyle}
                                >
                                    Post
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="max-w-xl mx-auto pt-3 px-2">
                <div className="w-full space-y-2">
                    {posts.map((post) => (
                        <div key={post.id}
                             className="w-full border border-black bg-[#d9d9d9] dark:bg-background-dark px-3 py-2 rounded">
                            <div className="flex items-center justify-between">
                                <img className="rounded-full w-8 h-8" src={post.user.avatar} alt="Profile"/>
                                <div className="flex items-center space-x-3">
                                    <p>{new Date(post.timestamp).toLocaleString()}</p>
                                    <span className="flex items-center space-x-1">
                                  <button type="button" onClick={() => likePost(post.id)}>
                                      <FontAwesomeIcon
                                          icon={faHeart}
                                          className={`fa-lg fa-regular ${post.isLikedByUser ? 'text-red-400' : null}`}
                                      />
                                  </button>
                                  <p className={post.isLikedByUser ? 'text-red-400' : null}>{post.likes}</p>
                              </span>
                                </div>
                            </div>
                            <p className="break-words mt-2">{post.description}</p>
                            {post.linkedRoutineId ? <div className="mt-2">
                                <button type="button" className={submitButtonStyle} onClick={() => router.push(`/routines/${post.linkedRoutineId}${user?.userId === post.userId ? '' : `?owner=${post.userId}` }`)}>Click to visit
                                    routine <FontAwesomeIcon icon={faArrowRight}/></button>
                            </div> : null}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Homepage
