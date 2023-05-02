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
        path: '',
        icon: <RiFileList2Fill className={styleDefault}/>,
        iconActive: <RiFileList2Fill className={styleActive} />
    },
    {
        name: 'Favorites',
        path: '',
        icon: <RiHeartFill className={styleDefault}/>,
        iconActive: <RiHeartFill className={styleActive} />
    },
    {
        name: 'Exercises',
        path: '/exercises',
        icon: <FaWalking className={styleDefault}/>,
        iconActive: <FaWalking className={styleActive} />
    },
    {
        name: 'History',
        path: '',
        icon: <RiHistoryFill className={styleDefault}/>,
        iconActive: <RiHistoryFill className={styleActive} />
    },

]

export default sidebarWorkoutItems