import React from 'react'
import { useAuth } from '@src/context/AuthProvider'
import Login from './login'

{/*Used for testing purposes*/}
const Notifications = () => {
    const {auth} = useAuth()

    return (
        <div>
            { auth ? (
                <h1>Notifications</h1>
            ) : (
                <Login />
            )}
        
        </div>
    )
}

export default Notifications