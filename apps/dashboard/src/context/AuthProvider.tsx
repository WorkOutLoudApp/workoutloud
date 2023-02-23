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

// FOR TESTING ONLY
const TEST_USER = {
    email: 'test@wol.com',
    username: 'testuser',
    firstName: 'Test',
    lastName: 'User',
    avatar: ''
}

////

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

    }, [])

    const value = useMemo(() => (
        { auth, setAuth, user, setUser }
    ), [auth, setAuth, user, setUser])

    return (
        // return template
        // <AuthContext.Provider value={value}>
        //     {children}
        // </AuthContext.Provider>

        // FOR TESTING ONLY (so we don't have to login and don't need database)
        <AuthContext.Provider value={{auth:true, setAuth, user: TEST_USER, setUser}}>
            {children}
        </AuthContext.Provider>
        ////////
    )
}

export default AuthContext

export const useAuth = () => useContext(AuthContext)
