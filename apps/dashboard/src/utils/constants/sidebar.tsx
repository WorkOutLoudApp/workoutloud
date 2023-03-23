import React from 'react'
import { FaStar, FaWalking } from 'react-icons/fa'
import { RiFileList2Fill, RiHeartFill, RiHistoryFill, RiHomeHeartFill } from 'react-icons/ri'


const styleDefault = ''
const styleActive = `fill-icon-active dark:fill-icon-active-dark`

const sidebarWorkoutItems = [
    {
        name: 'Home',
        path: '/routines',
        icon: <RiHomeHeartFill className={styleDefault}/>,
        iconActive: <RiHomeHeartFill className={styleActive} />
    },
    {
        name: 'Routines',
        path: '/routines/routines',
        icon: <RiFileList2Fill className={styleDefault}/>,
        iconActive: <RiFileList2Fill className={styleActive} />
    },
    {
        name: 'Favorites',
        path: '/routines/favorites',
        icon: <RiHeartFill className={styleDefault}/>,
        iconActive: <RiHeartFill className={styleActive} />
    },
    {
        name: 'Exercises',
        path: '/routines/exercises',
        icon: <FaWalking className={styleDefault}/>,
        iconActive: <FaWalking className={styleActive} />
    },
    {
        name: 'History',
        path: '/routines/history',
        icon: <RiHistoryFill className={styleDefault}/>,
        iconActive: <RiHistoryFill className={styleActive} />
    },

]

export default sidebarWorkoutItems