import React from 'react'
import { AiFillHome } from 'react-icons/ai'
import { IoNotifications, IoBarbell} from 'react-icons/io5'
import { MdGroups } from 'react-icons/md'
import { lightModeColors, darkModeColors } from './theme'
 
const lightModeColor = lightModeColors.navbar_item
const darkModeColor = darkModeColors.navbar_item
const styleLight = `${lightModeColor}`
const styleDark = `${darkModeColor} hover:${darkModeColors.navbar_item_active}`
const activeStyleLight = 'fill-indigo-600'
const activeStyleDark = 'fill-indigo-600'

export const navbarItemsMobile = [
    {
        name: 'homepage',
        path: '/homepage',
        icon: <AiFillHome />,
        iconActive: <AiFillHome className={activeStyleLight}/>
    },
    {
        name: 'workout',
        path: '/routines',
        icon: <IoBarbell />,
        iconActive: <IoBarbell className={activeStyleLight}/>
    },
    {
        name: 'friends',
        path: '/friends',
        icon: <MdGroups />,
        iconActive: <MdGroups className={activeStyleLight}/>
    },
    {
        name: 'notifications',
        path: '/notifications',
        icon: <IoNotifications />,
        iconActive: <IoNotifications className={activeStyleLight}/>
    },
]

export const navbarItems = [
    {
        name: 'homepage',
        path: '/homepage',
        icon: <AiFillHome className={styleLight}/>,
        iconDarkMode: <AiFillHome className={styleDark}/>,
        iconActive: <AiFillHome className={activeStyleLight}/>,
        iconActiveDarkMode: <AiFillHome className={activeStyleDark}/>,

    },
    {
        name: 'workout',
        path: '/routines',
        icon: <IoBarbell className={styleLight}/>,
        iconDarkMode: <IoBarbell className={styleDark}/>,
        iconActive: <IoBarbell className={activeStyleLight}/>,
        iconActiveDarkMode: <IoBarbell className={activeStyleDark}/>,
    },
    {
        name: 'friends',
        path: '/friends',
        icon: <MdGroups className={styleLight}/>,
        iconDarkMode: <MdGroups className={styleDark}/>,
        iconActive: <MdGroups className={activeStyleLight}/>,
        iconActiveDarkMode: <MdGroups className={activeStyleDark}/>,
    },
]