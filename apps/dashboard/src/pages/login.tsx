import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef, useState, useEffect, useContext } from 'react'
import { GoogleLogin} from '@react-oauth/google'
import jwt_decode from 'jwt-decode'
import { useAuth } from '../context/AuthProvider'

const Login = () => {
  const { auth, setAuth } = useAuth()
  const userRef = useRef<HTMLInputElement>(null)
  const errRef = useRef()
  const router = useRouter()

  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [user, pass]) // remove errMsg whenever user or pass changes

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(user, pass)
    // for testing
    
    if (user === 'admin' && pass === 'admin123') {
      setAuth(true)
      router.push('/')
    } else {
      setErrMsg('Invalid username or password')
    }
  }

  console.log(`auth: ${auth}`)
  return (
    <div className='flex w-full justify-center'>
      <body className='mt-10'>
        {!auth && (
          <div className='bg-blue-800/90 px-3 py-3 rounded text-white'>
            <p ref={errRef} className='text-yellow-300 bold' aria-live='assertive'>{errMsg}</p>
            <h1 className='text-2xl'>Sign In</h1>
            <form className='grid grid-row'
              onSubmit={handleSubmit}
            >
              <label className='mt-2' htmlFor='username'>Username</label>
              <input
                className='text-black rounded-full px-2'
                type='text'
                id='username'
                ref={userRef}
                autoComplete='off'
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
              />

              <label className='mt-2' htmlFor="password">Password</label>
              <input
                className='text-black rounded-full px-2'
                type='password'
                id='password'
                onChange={(e) => setPass(e.target.value)}
                value={pass}
                required
              />
              <button type='submit' className='mt-2 mb-2 py-1.5 bg-white font-semibold text-gray-800 rounded-full' >Sign In</button>
              <GoogleLogin
                onSuccess={credentialResponse => {
                  console.log(credentialResponse)
                  const decodedToken = jwt_decode(credentialResponse.credential)
                  console.log(decodedToken)
                  setAuth(true)
                  router.push('/')
                }}
                onError={() => {
                  console.log('Login failed')
                }}
                shape='pill'
              />

            </form>

            <p className='mt-2'>Need an Account?</p>
            <p className='underline underline-offset-2'>
              <Link href='/register'>
              <button type='submit' className='underline underline-offset-2' > Sign Up </button>
              </Link>
            </p>
          </div>
        )}

      </body>
    </div>
  )
}

export default Login
