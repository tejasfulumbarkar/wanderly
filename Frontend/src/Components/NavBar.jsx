import React from 'react'
import { HiOutlineGlobeAlt } from 'react-icons/hi'
import { IoSearchOutline } from 'react-icons/io5'
import { RxHamburgerMenu } from 'react-icons/rx'
import { FaRegUser } from "react-icons/fa";


const NavBar = () => {
  return (
    <header className='w-full border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8'>
      <div className='mx-auto flex min-h-[88px] max-w-[1280px] items-center justify-between gap-4'>
        <div className='flex shrink-0 items-center'>
          <img
            src='wanderly_logo.png'
            alt='Wanderly logo'
            className='h-auto w-[9rem] object-contain sm:w-[10rem]'
          />
        </div>

        <div className='hidden flex-1 justify-center md:flex'>
          <div className='flex h-[52px] w-full max-w-[420px] items-center rounded-full border border-gray-300 bg-white pl-6 pr-2 shadow-sm transition-shadow duration-200 hover:shadow-md'>
            <input
              type='text'
              placeholder='Any Where | Any Location | Any City'
              className='flex-1 bg-transparent pr-4 text-[15px] text-gray-700 placeholder:text-gray-400 focus:outline-none'
            />

            <button
              type='button'
              aria-label='Search'
              className='flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white transition-colors duration-200 hover:bg-red-600'
            >
              <IoSearchOutline className='text-lg' />
            </button>
          </div>
        </div>

        <div className='flex items-center gap-3 sm:gap-4'>
          <button
            type='button'
            className='hidden text-[15px] font-medium text-gray-800 transition-colors duration-200 hover:text-black sm:block'
          >
            List your home
          </button>

          

          <button
            type='button'
            aria-label='Open navigation menu'
            className='flex items-center gap-3 rounded-full border border-gray-300 px-3 py-2 text-gray-700 shadow-sm transition-shadow duration-200 hover:shadow-md'
          >
            <RxHamburgerMenu className='text-[18px]' />
<FaRegUser />
          </button>
        </div>
      </div>

      <div className='pb-4 md:hidden'>
        <div className='flex h-[52px] items-center rounded-full border border-gray-300 bg-white pl-5 pr-2 shadow-sm'>
          <input
            type='text'
            placeholder='Any Where | Any Location | Any City'
            className='flex-1 bg-transparent pr-3 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none'
          />

          <button
            type='button'
            aria-label='Search'
            className='flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white'
          >
            <IoSearchOutline className='text-lg' />
          </button>
        </div>
      </div>
    </header>
  )
}

export default NavBar
