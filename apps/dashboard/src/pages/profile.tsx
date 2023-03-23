import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@src/context/AuthProvider'

const Profile = () => {
  const { user } = useAuth()

  if (!user) {
    return <div>Please log in to continue.</div>
  }

  const { username, firstName, lastName, avatar, email } = user

  const [newUsername, setNewUsername] = useState(username)
  const [newFirstName, setNewFirstName] = useState(firstName)
  const [newLastName, setNewLastName] = useState(lastName)
  const [newAvatar, setNewAvatar] = useState(avatar)
  const [newEmail, setNewEmail] = useState(email)
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [showChangePassword, setShowChangePassword] = useState(false)

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      await axios.put('/api/profile', {
        username: newUsername,
        firstName: newFirstName,
        lastName: newLastName,
        avatar: newAvatar,
        email: newEmail,
      })

      alert('Profile updated successfully')
    } catch (error) {
      console.error(error)
      alert('Profile update failed')
    }
  }

  const handlePasswordChangeSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    if (newPassword !== confirmNewPassword) {
      alert('New password and confirmation do not match')
      return
    }

    try {
      await axios.put('/api/profile', {
        email,
        oldPassword,
        newPassword,
      })

      alert('Password changed successfully')
    } catch (error) {
      console.error(error)
      alert('Password change failed')
    }
  }

  const handlePasswordFocus = () => {
    setShowChangePassword(true)
  }

  const handlePasswordBlur = () => {
    setShowChangePassword(false)
  }

  return (
    <div className="flex">
      <div className="mx-auto max-w-3xl py-12 px-4 ">
        <h1 className="mb-8 text-center text-3xl font-bold">
          Profile Settings
        </h1>

        <form
          className="dark:bg-background-dark mb-4 grid grid-cols-2 gap-6 rounded bg-white px-8 pt-6 pb-8 shadow-md"
          onSubmit={handleFormSubmit}
        >
          <div>
            <img
              className="dark:text-dark mb-4 h-24 w-24 rounded-lg"
              src={avatar}
              alt="Avatar"
            />
            <label
              className="dark:text-dark mb-2 block font-bold"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="dark:bg-background-dark focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none dark:text-white"
              id="username"
              type="text"
              value={newUsername}
              onChange={(event) => setNewUsername(event.target.value)}
            />
          </div>
          <div>
            <div className="mb-4">
              <label
                className="dark:text-dark mb-2 block font-bold text-gray-700"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                className="dark:bg-background-dark focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none dark:text-white"
                id="firstName"
                type="text"
                value={newFirstName}
                onChange={(event) => setNewFirstName(event.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="dark:text-dark mb-2 block font-bold text-gray-700"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                className="dark:bg-background-dark focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none dark:text-white"
                id="lastName"
                type="text"
                value={newLastName}
                onChange={(event) => setNewLastName(event.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="dark:text-dark mb-2 block font-bold text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="dark:bg-background-dark focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none dark:text-white"
                id="email"
                type="email"
                value={newEmail}
                onChange={(event) => setNewEmail(event.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="dark:text-dark mb-2 block font-bold text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="dark:bg-background-dark focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none dark:text-white"
                id="password"
                type="password"
                value="*************" /*placeholder for the time being*/
                onChange={(event) => setNewPassword(event.target.value)}
              />
            </div>
          </div>
          <div className="col-span-2 flex justify-center">
            <button
              className="dark:bg-secondary-dark focus:shadow-outline rounded bg-indigo-500 py-2 px-4 font-bold text-white hover:bg-indigo-600 focus:outline-none dark:text-black"
              type="submit"
            >
              Save Changes
            </button>
          </div>{' '}
        </form>
      </div>
    </div>
  )
}

export default Profile
