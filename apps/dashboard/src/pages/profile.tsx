import { useState } from 'react'
import axios from 'axios'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface ProfileProps {
  userId: number
  username: string
  firstName: string
  lastName: string
  avatar: string
  email: string
  password: string
}

const Profile = ({
  userId,
  username,
  firstName,
  lastName,
  avatar,
  email,
  password,
}: ProfileProps) => {
  const [newUsername, setNewUsername] = useState(username)
  const [newFirstName, setNewFirstName] = useState(firstName)
  const [newLastName, setNewLastName] = useState(lastName)
  const [newAvatar, setNewAvatar] = useState(avatar)
  const [newEmail, setNewEmail] = useState(email)
  const [newPassword, setNewPassword] = useState(password)

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      await axios.put('/api/profile', {
        userId,
        username: newUsername,
        firstName: newFirstName,
        lastName: newLastName,
        avatar: newAvatar,
        email: newEmail,
        password: newPassword,
      })

      alert('Profile updated successfully')
    } catch (error) {
      console.error(error)
      alert('Profile update failed')
    }
  }

  return (
    <div className="flex">
      <div className="mx-auto max-w-3xl py-12 px-4">
        <h1 className="mb-8 text-center text-3xl font-bold">Edit Profile</h1>
        <form
          className="mb-4 grid grid-cols-2 gap-6 rounded bg-white px-8 pt-6 pb-8 shadow-md"
          onSubmit={handleFormSubmit}
        >
          <div>
            <img
              className="mb-4 h-24 w-24 rounded-lg"
              src={'https://randomuser.me/api/portraits/lego/1.jpg'}
              alt="Avatar"
            />
            <label
              className="mb-2 block font-bold text-gray-700"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
              id="username"
              type="text"
              value={newUsername}
              onChange={(event) => setNewUsername(event.target.value)}
            />
          </div>
          <div>
            <div className="mb-4">
              <label
                className="mb-2 block font-bold text-gray-700"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
                id="firstName"
                type="text"
                value={newFirstName}
                onChange={(event) => setNewFirstName(event.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="mb-2 block font-bold text-gray-700"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
                id="lastName"
                type="text"
                value={newLastName}
                onChange={(event) => setNewLastName(event.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="mb-2 block font-bold text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
                id="email"
                type="email"
                value={newEmail}
                onChange={(event) => setNewEmail(event.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="mb-2 block font-bold text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
                id="password"
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
              />
            </div>
          </div>
          <div className="col-span-2 flex justify-center">
            <button
              className="focus:shadow-outline rounded bg-indigo-500 py-2 px-4 font-bold text-white hover:bg-indigo-600 focus:outline-none"
              type="submit"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const user = await prisma.user.findUnique({
    where: { id: 1 }, // replace with the user id you want to retrieve from the database
    include: {
      account: true,
    },
  })

  return {
    props: {
      userId: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      email: user.account.email,
      password: user.account.password,
    },
  }
}

export default Profile
