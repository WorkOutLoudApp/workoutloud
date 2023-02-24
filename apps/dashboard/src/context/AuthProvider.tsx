import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

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
}

const AuthContext = createContext({} as AuthInterface)

export const AuthProvider = ({ children }: any) => {
    const [auth, setAuth] = useState(undefined)
    const [user, setUser] = useState(undefined)

    // check if user logged in
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'))

        if (storedUser) {
            setAuth(true)
            setUser(storedUser.user)
        }

        // // For Testing only (so we don't have to login and don't need database)
        // setAuth(true)
        // setUser({enail:'test@wol.com', username:'test', firstName:'first', lastName: 'last', avatar: ''})
        // //// must remove later
    }, [])

    const value = useMemo(() => (
        { auth, setAuth, user, setUser }
    ), [auth, setAuth, user, setUser])

    return (
        // return template
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext

export const useAuth = () => useContext(AuthContext)