import React from 'react';
import Link from 'next/link';
import { AiOutlineClose } from 'react-icons/ai';
import { useAuth } from '@src/context/AuthProvider';
import { googleLogout } from '@react-oauth/google';
import { useEffect } from 'react';

interface MobileMenuModalProps {
  toggleMobileMenu: () => void
  isOpen: boolean
  setShowMobileMenu: (value: boolean) => void
}

const MobileMenuModal: React.FC<MobileMenuModalProps> = ({ toggleMobileMenu, isOpen, setShowMobileMenu }) => {
  const { user } = useAuth();

  
  const handleClickOutside = (event: MouseEvent) => {
    if (!event.target) return;
    const target = event.target as HTMLElement;
    if (target.closest('.mobile-menu')) return;
    setShowMobileMenu(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 left-auto right-0 w-4/5 h-full transition-all duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } bg-white mobile-menu`}
    >
      <header className='flex justify-end items-center p-4 border-b-0'>
        <button onClick={toggleMobileMenu} className='text-2xl'>
          <AiOutlineClose />
        </button>
      </header>
      <nav className='p-4'>
        <ul>
          <li className='p-2'>
            <Link href='/'>
              <a onClick={toggleMobileMenu} className='text-xl block rounded-lg p-2 hover:bg-gray-100'>
                Home
              </a>
            </Link>
          </li>
          {!user && (
            <>
              <li className='p-2'>
                <Link href='/login'>
                  <a onClick={toggleMobileMenu} className='text-xl block rounded-lg p-2 hover:bg-gray-100'>
                    Login
                  </a>
                </Link>
              </li>
              <li className='p-2'>
                <Link href='/register'>
                  <a onClick={toggleMobileMenu} className='text-xl block rounded-lg p-2 hover:bg-gray-100'>
                    Sign Up
                  </a>
                </Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li className='p-2'>
                <Link href='/profile'>
                  <a onClick={toggleMobileMenu} className='text-xl block rounded-lg p-2 hover:bg-gray-100'>
                    Profile
                  </a>
                </Link>
              </li>
              <li className='p-2'>
                <Link href='/'>
                  <a onClick={toggleMobileMenu} className='text-xl block rounded-lg p-2 hover:bg-gray-100'>
                    Logout
                  </a>
                </Link>
              </li>
              {/* Add more menu items for authenticated users as needed */}
            </>
          )}
          {/* Add more menu items as needed */}
        </ul>
      </nav>
    </div>
  );
};

export default MobileMenuModal;
