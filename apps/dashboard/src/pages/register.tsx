import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef, useState} from 'react'
import { GoogleLogin} from '@react-oauth/google'
import jwt_decode from 'jwt-decode'
import { useAuth } from '../context/AuthProvider'

const Register = () => {
  const userRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const [{firstName, lastName, email, password, repeatPassword}] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
  })

  return (
    <div className='flex w-full justify-center'>
      <body className='mt-10'>
        {(
          <div className='bg-blue-800/90 px-3 py-3 rounded text-white'>
            <h1 className='text-2xl'>Sign Up</h1>
            <form className='grid grid-row'
            >
              <label className='mt-2' htmlFor='First Name'>First Name</label>
              <input
                className='text-black rounded-full px-2'
                type='text'
                id='firstname'
                ref={userRef}
                autoComplete='off'
                required
              />
              <label className='mt-2' htmlFor='Last Name'>Last Name</label>
              <input
                className='text-black rounded-full px-2'
                type='text'
                id='lastname'
                ref={userRef}
                autoComplete='off'
                required
              />                            
              <label className='mt-2' htmlFor='username'>Username</label>
              <input
                className='text-black rounded-full px-2'
                type='text'
                id='username'
                autoComplete='off'
                required
              />

              <label className='mt-2' htmlFor="password">Password</label>
              <input
                className='text-black rounded-full px-2'
                type='password'
                id='password'
                required
              />
              <label className='mt-2' htmlFor="repeatPassword">Repeat Password</label>
              <input
                className='text-black rounded-full px-2'
                type='password'
                id='password'
                required
              />

              <button type='submit' className='mt-2 mb-2 py-1.5 rounded bg-white font-semibold text-gray-800 rounded-full'>Sign up</button>

              <GoogleLogin
                onSuccess={credentialResponse => {
                  console.log(credentialResponse)
                  const decodedToken = jwt_decode(credentialResponse.credential)
                  console.log(decodedToken)
                  router.push('/')
                }}
                onError={() => {
                  console.log('Register failed')
                }}
                shape='pill'
              />

            </form>

            <p className='underline underline-offset-2'>
              <Link href='/login'>
              <button type='submit' className='underline underline-offset-2' >Go Back</button>
              </Link>
            </p>
          </div>
        )}

      </body>
    </div>
  )
}

export default Register
