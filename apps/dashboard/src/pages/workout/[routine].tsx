import React, { useState } from 'react'
import { useAuth } from '@src/context/AuthProvider'
import RoutineHeader from '@src/components/Workout/Header'
import Login from '../login'

const routines = [
  {
    name: 'Routine Name',
    description: 'Description',
  },
  {
    name: 'Routine Name',
    description: 'Description',
  },
]
const headerTabs = ['Exercises', 'History', 'Settings']
const RoutinePage = () => {
  const { auth } = useAuth()
  const [currentTab, setCurrentTab] = useState(headerTabs[0])

  return (
    <div className="w-full">
      {auth ? (
        <div className="space-y-3">
          <RoutineHeader
            name="Routine Name"
            description="Description"
            tabs={headerTabs}
            currentTab={currentTab}
            setTab={setCurrentTab}
          />
          <p>{currentTab} goes here</p>
        </div>
      ) : (
        <Login />
      )}
    </div>
  )
}

export default RoutinePage
