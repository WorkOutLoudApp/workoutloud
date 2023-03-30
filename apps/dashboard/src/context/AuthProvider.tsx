import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import axios from 'axios'

interface AuthInterface {
  auth: boolean
  setAuth: React.Dispatch<React.SetStateAction<boolean>>
  user: {
    email: string
    username: string
    firstName: string
    lastName: string
    avatar: string
  }
  setUser: React.Dispatch<React.SetStateAction<any>>
  token: String
  setToken: React.Dispatch<React.SetStateAction<any>>
}

const AuthContext = createContext({} as AuthInterface)

const verifyToken = async (storedUser: any, setAuth: React.Dispatch<React.SetStateAction<boolean>>, setUser: React.Dispatch<React.SetStateAction<any>>, setToken: React.Dispatch<React.SetStateAction<any>>) => {
  axios.get(`http://localhost:4000/v1/auth/verifyToken`, {
    headers: {
      Authorization: `Bearer ${storedUser.token}`,
    }
  }).then((res) => {
    if (res.data.success) {
      setAuth(true)
      setUser(storedUser.user)
      setToken(storedUser.token)
    } else {
      console.log('Message: ', res.data.error.message)
    }
  }).catch((error) => {
    console.log(error)
  })
}

export const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = useState(undefined)
  const [user, setUser] = useState(undefined)
  const [token, setToken] = useState(undefined)
  // check if user logged in and token is valid
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'))

    if (storedUser) {
      verifyToken(storedUser, setAuth, setUser, setToken)
    }

    // // For testing purpose (to bypass the login)
    // setAuth(true)
    // setUser({email:'test@wol.com', username:'test', firstName:'first', lastName:'last', avatar:''})
  }, [])

  const value = useMemo(
    () => ({ auth, setAuth, user, setUser, token, setToken }),
    [auth, setAuth, user, setUser, token, setToken]
  )

  return (
    // return template
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}

export default AuthContext

export const useAuth = () => useContext(AuthContext)
