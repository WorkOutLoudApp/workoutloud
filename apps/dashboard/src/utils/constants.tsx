import { AiFillHome } from 'react-icons/ai'
import { IoNotifications, IoBarbell} from 'react-icons/io5'
import { MdGroups } from 'react-icons/md'

const activeStyle = 'fill-indigo-600'
export const navbarItemsMobile = [
    {
        path: '/',
        icon: <AiFillHome />,
        iconActive: <AiFillHome className={activeStyle}/>
    },
    {
        path: '/workout',
        icon: <IoBarbell />,
        iconActive: <IoBarbell className={activeStyle}/>
    },
    {
        path: '/friends',
        icon: <MdGroups />,
        iconActive: <MdGroups className={activeStyle}/>
    },
    {
        path: '/notifications',
        icon: <IoNotifications />,
        iconActive: <IoNotifications className={activeStyle}/>
    },
]

export const navbarItems = [
    {
        path: '/',
        icon: <AiFillHome />,
        iconActive: <AiFillHome className={activeStyle}/>
    },
    {
        path: '/workout',
        icon: <IoBarbell />,
        iconActive: <IoBarbell className={activeStyle}/>
    },
    {
        path: '/friends',
        icon: <MdGroups />,
        iconActive: <MdGroups className={activeStyle}/>
    },
]