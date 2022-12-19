import { createContext, useContext, useMemo, useState } from 'react'
import React from 'react'

interface AuthInterface {
    auth: boolean
    setAuth: React.Dispatch<React.SetStateAction<boolean>>
    picture: string
    setPicture: React.Dispatch<React.SetStateAction<string>>
}

const AuthContext = createContext({} as AuthInterface)

export const AuthProvider = ({ children }: any) => {
    const [auth, setAuth] = useState(undefined)
    const [picture, setPicture] = useState(undefined)
    const value = useMemo(() => (
        { auth, setAuth, picture, setPicture }
    ), [auth, setAuth, picture, setPicture])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext

export const useAuth = () => useContext(AuthContext)
