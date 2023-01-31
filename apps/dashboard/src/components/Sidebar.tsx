import React, { useContext } from 'react'
import { useAuth } from '@src/context/AuthProvider'


const Sidebar = () => {
  const { auth } = useAuth()
  const style = 'flex b-r-2 border-gray-300 px-2'
  return (
    <div className='Sidebar'>
      {auth && 
        <div>Sidebar</div>
      }
    </div>
)}
export default Sidebar