import { useState } from 'react'

interface User {
  firstName: string
  lastName: string
  userNanme: string
  email: string
  phoneNumber: string
  password: string
}

const ProfileSettings: React.FC = () => {
  const [user, setUser] = useState<User>({
    firstName: 'John',
    lastName: 'Doe',
    userNanme: 'JohnDoe',
    email: 'johndoe@example.com',
    phoneNumber: '+1 7141234567',
    password: 'password',
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUser((prevUser) => ({ ...prevUser, [name]: value }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Submit form data
  }

  return (
    <div className="rounded-sm bg-center">
      <div className="grid grid-cols-2 gap-6 rounded-md bg-white p-6">
        <h1 className="col-span-2 mb-4 text-3xl font-bold">Account Settings</h1>
        <div className="col-span-1 flex flex-col">
          <label htmlFor="firstName" className="mb-2 text-lg">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={user.firstName}
            onChange={handleInputChange}
            className="rounded-lg border-2 border-gray-400 p-2"
          />
        </div>
        <div className="col-span-1 flex flex-col">
          <label htmlFor="lastName" className="mb-2 text-lg">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={user.lastName}
            onChange={handleInputChange}
            className="rounded-lg border-2 border-gray-400 p-2"
          />
        </div>
        <div className="col-span-2 flex flex-col">
          <label htmlFor="userName" className="mb-2 text-lg">
            User Name
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={user.userNanme}
            onChange={handleInputChange}
            className="rounded-lg border-2 border-gray-400 p-2"
          />
        </div>
        <div className="col-span-2 flex flex-col">
          <label htmlFor="email" className="mb-2 text-lg">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            className="rounded-lg border-2 border-gray-400 p-2"
          />
        </div>
        <div className="col-span-2 flex flex-col">
          <label htmlFor="phoneNumber" className="mb-2 text-lg">
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleInputChange}
            className="rounded-lg border-2 border-gray-400 p-2"
          />
        </div>
        <div className="col-span-2 flex flex-col">
          <label htmlFor="password" className="mb-2 text-lg">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            className="rounded-lg border-2 border-gray-400 p-2"
          />
        </div>
        <button
          type="submit"
          className="col-span-2 rounded-lg bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default ProfileSettings
