import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { RiHistoryFill } from 'react-icons/ri'
import { useRouter } from 'next/router'

interface HistoryProps {
    name: string
}

export default function SidebarHistory({ name }: HistoryProps) {
    const router = useRouter()
    return (
        <div className='flex text-md'>
            <button
                type="button"
                className="flex w-full space-x-2 p-3 items-center"
                onClick={() => router.push(`/workout/${name}`)}
            >

                <div className="flex aspect-square items-center place-content-center h-full rounded-full">
                    <RiHistoryFill />
                </div>

                <div className="flex flex-col text-left">
                    <p className="">{name}</p>
                </div>
            </button>
        </div>
    )
}
