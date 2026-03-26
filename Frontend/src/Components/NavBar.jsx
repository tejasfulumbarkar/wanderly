import React, { useState } from 'react'
import { HiOutlineGlobeAlt } from 'react-icons/hi'
import { IoSearchOutline } from 'react-icons/io5'
import { RxHamburgerMenu } from 'react-icons/rx'
import { MdWhatshot } from "react-icons/md";
import { GiFamilyHouse } from "react-icons/gi";
import { GiWoodCabin } from "react-icons/gi";
import { MdBedroomParent } from "react-icons/md";
import { MdOutlinePool } from "react-icons/md";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { IoBedOutline } from "react-icons/io5";
import { FaTreeCity } from "react-icons/fa6";
import { BiBuildingHouse } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";


const NavBar = () => {

    const [popUp , showPopUp] = useState(false)
  return (
    <>
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
              onClick={() => showPopUp(!popUp)}
              className='flex items-center gap-3 rounded-full border border-gray-300 px-3 py-2 text-gray-700 shadow-sm transition-shadow duration-200 hover:shadow-md'
            >
              <RxHamburgerMenu className='text-[18px]' />
              <FaRegUser />
            </button>
          </div>
        </div>

        {popUp && (
          <div className='absolute right-5 top-20 mr-4 h-[250px] w-[200px] rounded border border-gray-700 bg-slate-100'>
            <ul className='flex h-full w-full flex-col items-start justify-around p-[10px] text-[17px]'>
              <li className='w-full cursor-pointer px-[10px] hover:bg-slate-300'>Login</li>
              <li className='w-full cursor-pointer px-[10px] hover:bg-slate-300'>Logout</li>
              <div className='h-[1px] w-full bg-gray-400'></div>
              <li className='w-full cursor-pointer px-[10px] hover:bg-slate-300'>List your Home</li>
              <li className='w-full cursor-pointer px-[10px] hover:bg-slate-300'>My listing</li>
              <li className='w-full cursor-pointer px-[10px] hover:bg-slate-300'>Check Booking</li>
            </ul>
          </div>
        )}

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
      <div className='w-[100vw] h-[85px] bg-white flex items-center justify-center cursor-pointer gap-[40px]' >
        <div className='flex justify-center items-center flex-col hover:border-b-[1px] border-black'>
          <MdWhatshot />
          <h3>Trending</h3>
        </div>

        <div className='flex justify-center items-center flex-col hover:border-b-[1px] border-black'>
          <GiFamilyHouse />

          <h3>Villa</h3>
        </div>

        <div className='flex justify-center items-center flex-col hover:border-b-[1px] border-black'>
          <GiWoodCabin />

          <h3>Cabins</h3>
        </div>

        <div className='flex justify-center items-center flex-col hover:border-b-[1px] border-black'>
<MdBedroomParent />
          <h3>Rooms</h3>
        </div>

        <div className='flex justify-center items-center flex-col hover:border-b-[1px] border-black'>
         <MdOutlinePool />

          <h3>Pool House</h3>
        </div>

        <div className='flex justify-center items-center flex-col hover:border-b-[1px] border-black'>
         <SiHomeassistantcommunitystore />

          <h3>Shop</h3>
        </div>

        <div className='flex justify-center items-center flex-col hover:border-b-[1px] border-black'>
          <IoBedOutline />

          <h3>PG</h3>
        </div>

        <div className='flex justify-center items-center flex-col hover:border-b-[1px] border-black'>
          <FaTreeCity />

          <h3>Farm House</h3>
        </div>

        <div className='flex justify-center items-center flex-col hover:border-b-[1px] border-black'>
          <BiBuildingHouse />

          <h3>Flat</h3>
        </div>
      </div>

      
    </>
  )
}

export default NavBar
