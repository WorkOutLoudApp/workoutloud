import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef, useState, useEffect } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'
import axios from 'axios'

import { useAuth } from '../context/AuthProvider'

const Register = () => {
  const { auth, setAuth, user, setUser } = useAuth()
  const userRef = useRef<HTMLInputElement>(null)
  const errRef = useRef()
  const router = useRouter()
  const [firstName, createFirstName] = useState('')
  const [lastName, createLastName] = useState('')
  const [username, createUsername] = useState('')
  const [email, createEmail] = useState('')
  const [password, createPassword] = useState('')
  const [repeatPassword, repPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    userRef.current.focus()
  }, []
  )

  useEffect(() => {
    setErrMsg('')
  }, [firstName, lastName, username, email, password, repeatPassword])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(firstName, lastName, username, email, password, repeatPassword)

    if (firstName.length < 2) {
      setErrMsg('The First Name must be between 2 and 20 characters.')
    } else if (lastName.length < 2) {
      setErrMsg('The Last Name must be between 2 and 20 characters.')
    } else if (username.length < 5) {
      setErrMsg('The Username must be between 5 and 20 characters.')
    } else if (!email.includes('.com')) {
      setErrMsg('This is not a valid email.')
    } else if (password.length < 6) {
      setErrMsg('The password must be between 6 and 40 characters.')
    } else if (password !== repeatPassword) {
      setErrMsg('The Repeated Password does not match.')
    } else {
      await axios.post(`http://localhost:4000/v1/user/register`, {
        firstName,
        lastName,
        username,
        email,
        password,
      }).then((response) => {
        if (response.data.success === true) {
          setAuth(true)
          setUser(response.data.user)
          localStorage.setItem('user', JSON.stringify({user: response.data.user, token: response.data.authToken}))
          router.push('/')
        } else {
          setErrMsg(response.data.message)
        }
      }, (error) => {
        console.log("[Register] error: ", error)
      })
    }

}

return (
  <div className='flex w-full justify-center'>
    <div className='mt-10'>

      <div className='bg-blue-800/90 px-3 py-3 rounded text-white'>
        <p ref={errRef} className='text-yellow-300 bold' aria-live='assertive'>{errMsg}</p>
        <h1 className='text-2xl'>Sign Up</h1>
        <form className='grid grid-row'
          onSubmit={handleSubmit}
        >
          <label className='mt-2' htmlFor='First Name'>First Name</label>
          <input
            className='text-black rounded-full px-2'
            type='text'
            id='firstname'
            ref={userRef}
            autoComplete='off'
            onChange={(e) => createFirstName(e.target.value)}
            required
          />
          <label className='mt-2' htmlFor='Last Name'>Last Name</label>
          <input
            className='text-black rounded-full px-2'
            type='text'
            id='lastname'
            ref={userRef}
            autoComplete='off'
            onChange={(e) => createLastName(e.target.value)}
            required
          />

          <label className='mt-2' htmlFor='username'>Username</label>
          <input
            className='text-black rounded-full px-2'
            type='text'
            id='username'
            autoComplete='off'
            onChange={(e) => createUsername(e.target.value)}
            required
          />

          <label className='mt-2' htmlFor='Last Name'>Email</label>
          <input
            className='text-black rounded-full px-2'
            type='text'
            id='email'
            ref={userRef}
            autoComplete='off'
            onChange={(e) => createEmail(e.target.value)}
            required
          />

          <label className='mt-2' htmlFor="password">Password</label>
          <input
            className='text-black rounded-full px-2'
            type='password'
            id='password'
            autoComplete='off'
            onChange={(e) => createPassword(e.target.value)}
            required
          />

          <label className='mt-2' htmlFor="repeatPassword">Repeat Password</label>
          <input
            className='text-black rounded-full px-2'
            type='password'
            id='password2'
            autoComplete='off'
            onChange={(e) => repPassword(e.target.value)}
            required
          />

          <button type='submit' className='mt-2 mb-2 py-1.5 bg-white font-semibold text-gray-800 rounded-full'>Sign up</button>

          <GoogleLogin
            onSuccess={async credentialResponse => {
              const decodedToken = jwt_decode<any>(credentialResponse.credential)
              // const decodedToken = jwt_decode<JwtPayload>(credentialResponse.credential)

              await axios.post(`http://localhost:4000/v1/user/googleregister`, {
                token: decodedToken,
              }).then((response) => {
                if (response.data.success === true) {
                  setAuth(true)
                  setUser(response.data.user)
                  localStorage.setItem('user', JSON.stringify({user: response.data.user, token: response.data.authToken}))
                  router.push('/')
                } else {
                  setErrMsg(response.data.message)
                }
              }, (error) => {
                console.log("[Google Register] error: ", error)
              })

            }}
            onError={() => {
              console.log('Login with Google failed')
            }}
            shape='pill'
          />

        </form>

        <p className='underline underline-offset-2'>
          <Link href='/login'>
            <button type='submit' className='underline underline-offset-2' >Sign In</button>
          </Link>
        </p>
      </div>


    </div>
  </div>
)
}

export default Register