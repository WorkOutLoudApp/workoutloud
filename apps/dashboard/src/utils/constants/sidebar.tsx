import React from 'react'
import { HiUser, HiClipboardList } from 'react-icons/hi'
import { GrYoga, GrPowerCycle } from 'react-icons/gr'
import { FaStar } from 'react-icons/fa'
import { RiHistoryFill } from 'react-icons/ri'

const activeStyle = ''

const sidebarWorkoutItems = [
    {
        name: 'Home',
        path: '/routines',
        icon: <HiClipboardList/>,
        iconActive: <HiClipboardList className={activeStyle} />
    },
    {
        name: 'Routines',
        path: '/routines/routines',
        icon: <GrPowerCycle/>,
        iconActive: <GrPowerCycle className={activeStyle} />
    },
    {
        name: 'Favorites',
        path: '/routines/favorites',
        icon: <FaStar/>,
        iconActive: <FaStar className={activeStyle} />
    },
    {
        name: 'Exercises',
        path: '/routines/exercises',
        icon: <GrYoga/>,
        iconActive: <GrYoga className={activeStyle} />
    },
    {
        name: 'History',
        path: '/routines/history',
        icon: <RiHistoryFill/>,
        iconActive: <RiHistoryFill className={activeStyle} />
    },

]

export default sidebarWorkoutItems