import React from 'react'
import { AiFillHome } from 'react-icons/ai'
import { IoNotifications, IoBarbell} from 'react-icons/io5'
import { MdGroups } from 'react-icons/md'

const activeStyle = 'fill-indigo-600'
export const navbarItemsMobile = [
    {
        name: 'home',
        path: '/',
        icon: <AiFillHome />,
        iconActive: <AiFillHome className={activeStyle}/>
    },
    {
        name: 'workout',
        path: '/workout',
        icon: <IoBarbell />,
        iconActive: <IoBarbell className={activeStyle}/>
    },
    {
        name: 'friends',
        path: '/friends',
        icon: <MdGroups />,
        iconActive: <MdGroups className={activeStyle}/>
    },
    {
        name: 'notifications',
        path: '/notifications',
        icon: <IoNotifications />,
        iconActive: <IoNotifications className={activeStyle}/>
    },
]

export const navbarItems = [
    {
        name: 'home',
        path: '/',
        icon: <AiFillHome />,
        iconActive: <AiFillHome className={activeStyle}/>
    },
    {
        name: 'workout',
        path: '/workout',
        icon: <IoBarbell />,
        iconActive: <IoBarbell className={activeStyle}/>
    },
    {
        name: 'friends',
        path: '/friends',
        icon: <MdGroups />,
        iconActive: <MdGroups className={activeStyle}/>
    },
]