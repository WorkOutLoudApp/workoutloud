import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

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
  setUser: React.Dispatch<React.SetStateAction<boolean>>
  token: String
  setToken: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthContext = createContext({} as AuthInterface)

export const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = useState(undefined)
  const [user, setUser] = useState(undefined)
  const [token, setToken] = useState(undefined)

  // check if user logged in
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'))

    if (storedUser) {
      setAuth(true)
      setUser(storedUser.user)
      setToken(storedUser.token)
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
