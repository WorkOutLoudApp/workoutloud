import React from 'react'
import Link from 'next/link'
import { AiOutlineClose } from 'react-icons/ai'

interface MobileMenuModalProps {
  toggleMobileMenu: () => void
}

const MobileMenuModal: React.FC<MobileMenuModalProps> = ({
  toggleMobileMenu,
}) => {
  return (
    <div className="fixed inset-0 left-auto right-0 z-50 h-full w-3/5 bg-white transition-all duration-300 ease-in-out">
      <header className="border-b-1.5 flex items-center justify-between border-gray-300 p-4">
        <h2 className="font-poppins font-bold text-indigo-600">Menu</h2>
        <button onClick={toggleMobileMenu} className="text-2xl">
          <AiOutlineClose />
        </button>
      </header>
      <nav className="p-4">
        {/* Add your menu items here */}
        <ul>
          <li>
            <Link href="/some-path">
              <a onClick={toggleMobileMenu}>Menu Item 1</a>
            </Link>
          </li>
          {/* Add more menu items as needed */}
        </ul>
      </nav>
    </div>
  )
}

export default MobileMenuModal
