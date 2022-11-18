import React from 'react'
import { useAuth } from '@src/context/AuthProvider'
import Login from './login'

const Friends = () => {
    const { auth } = useAuth()

    return (
        <div>
            {auth ? (
                <h1>Friends</h1>
            ) : (
                <Login />
            )}

        </div>
    )
}

export default Friends