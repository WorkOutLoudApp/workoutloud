import React from 'react'
import { AiFillHome } from 'react-icons/ai'
import { IoNotifications, IoBarbell} from 'react-icons/io5'
import { MdGroups } from 'react-icons/md'

const styleDefault = ``
const styleActive = `fill-icon-active dark:fill-icon-active-dark`


export const navbarItemsMobile = [
    {
        name: 'homepage',
        path: '/homepage',
        icon: <AiFillHome className={styleDefault}/>,
        iconActive: <AiFillHome className={styleActive}/>
    },
    {
        name: 'workout',
        path: '/routines',
        icon: <IoBarbell className={styleDefault}/>,
        iconActive: <IoBarbell className={styleActive}/>
    },
    {
        name: 'friends',
        path: '/friends',
        icon: <MdGroups className={styleDefault}/>,
        iconActive: <MdGroups className={styleActive}/>
    },
    {
        name: 'notifications',
        path: '/notifications',
        icon: <IoNotifications className={styleDefault}/>,
        iconActive: <IoNotifications className={styleActive}/>
    },
]

export const navbarItems = [
    {
        name: 'homepage',
        path: '/homepage',
        icon: <AiFillHome className={styleDefault}/>,
        iconActive: <AiFillHome className={styleActive}/>,

    },
    {
        name: 'workout',
        path: '/routines',
        icon: <IoBarbell className={styleDefault}/>,
        iconActive: <IoBarbell className={styleActive}/>,
        subpath: '/exercises',
    },
    {
        name: 'friends',
        path: '/friends',
        icon: <MdGroups className={styleDefault}/>,
        iconActive: <MdGroups className={styleActive}/>,
    },
]