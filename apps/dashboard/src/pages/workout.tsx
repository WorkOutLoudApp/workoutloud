import React from 'react'
import { useAuth } from '@src/context/AuthProvider'
import Login from './login'

const Workout = () => {
    const { user } = useAuth()
    
    return (
        <div className='w-full'>
            { user ? (
                <div>
                    <h1>Workout</h1>
                </div>
            ) : (
                <div className=''>
                    <Login />
                </div>
            )}
        
        </div>
    )
}

export default Workout