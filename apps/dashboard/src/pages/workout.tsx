import React from 'react'
import { useAuth } from '@src/context/AuthProvider'
import Login from './login'

const Workout = () => {
    const {auth} = useAuth()

    return (
        <div>
            { auth ? (
                <h1>Workout</h1>
            ) : (
                <Login />
            )}
        
        </div>
    )
}

export default Workout