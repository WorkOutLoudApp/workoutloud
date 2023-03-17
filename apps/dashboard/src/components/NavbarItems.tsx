import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'

interface ItemProps {
    name: string,
    path: string,
    icon: JSX.Element,
    style?: string
}

export default function NavbarItems({ name, path, icon, style }: ItemProps) {
    return (
        <Link key={name} href={path}>
            <div className={`${style}`}>
                {}
            </div>
        </Link>
    )
}
NavbarItems.defaultProps = {
    style: ''
}
