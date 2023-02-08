import React from 'react'

import { useAuth } from '@src/context/AuthProvider'
import Login from '../login'

const Exercises = () => {
    const { user } = useAuth()
    
    return (
        <div className='w-full'>
            { user ? (
                <div>
                    <h1>Workout Exercises</h1>
                </div>
            ) : (
                <div className=''>
                    <Login />
                </div>
            )}
        
        </div>
    )
}

export default Exercises