import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import jwt_decode, { JwtPayload } from 'jwt-decode'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../context/AuthProvider'

const Login = () => {
  const { auth, setAuth, user, setUser, setToken } = useAuth()
  const userRef = useRef<HTMLInputElement>(null)
  const errRef = useRef()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [email, pass]) // remove errMsg whenever user or pass changes

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await axios.post(`http://localhost:4000/v1/user/login`, {
      email,
      password: pass,
    }).then((response) => {
      if (response.data.success===true) {
        setAuth(true)
        setUser(response.data.user)
        setToken(response.data.authToken)
        localStorage.setItem('user', JSON.stringify({user: response.data.user, token: response.data.authToken}))
        router.push('/homepage')
      } else {
        setErrMsg('Invalid username or password')
      }
    }, (error) => {
      console.log("[Login] error: ", error)
    })
  }

  return (
    <div className='flex w-full justify-center'>
      <div className='mt-10'>
        {!user && (
          <div className='bg-blue-800/90 px-3 py-3 rounded text-white'>
            <p ref={errRef} className='text-yellow-300 bold' aria-live='assertive'>{errMsg}</p>
            <h1 className='text-2xl'>Sign In</h1>
            <form className='grid grid-row'
              onSubmit={handleSubmit}
            >
              <label className='mt-2' htmlFor='email'>Email</label>
              <input
                className='text-black rounded-full px-2'
                type='text'
                id='email'
                ref={userRef}
                autoComplete='off'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
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

              <button type='submit' className='mt-2 mb-2 py-1.5 bg-white font-semibold text-gray-800 rounded-full'>Sign In</button>

              <GoogleLogin
                onSuccess={async credentialResponse => {
                  const decodedToken = jwt_decode<any>(credentialResponse.credential)
                  
                  await axios.post(`http://localhost:4000/v1/user/googlelogin`, {
                    token: decodedToken,
                  }).then((response) => {
                    if (response.data.success === true) {
                      setAuth(true)
                      setUser(response.data.user)
                      setToken(response.data.authToken)
                      localStorage.setItem('user', JSON.stringify({user: response.data.user, token: response.data.authToken}))
                      router.push('/homepage')
                    } else {
                      setErrMsg('Account not registered.')
                    }
                  }, (error) => {
                    console.log(error)
                  })

                }}
                onError={() => {
                  console.log('Login failed')
                }}
                shape='pill'
              />

            </form>

            <p className='mt-2'>Need an Account ?</p>
            <p className='underline underline-offset-2'>
              <Link href='/register'>
                <button type='submit' className='underline underline-offset-2' > Sign Up </button>
              </Link>
            </p>
          </div>
        )}

      </div>
    </div>
  )
}

export default Login