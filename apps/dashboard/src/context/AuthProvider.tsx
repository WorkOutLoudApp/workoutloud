import React, { createContext, useContext, useMemo, useState } from 'react'

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
