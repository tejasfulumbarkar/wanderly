import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";

import { Link } from 'react-router-dom';


const Login = () => {
  const [show, setShow] = useState(false)

  return (
    <div className='min-h-screen w-full bg-[linear-gradient(135deg,#f4efe7_0%,#f9f6f0_45%,#dfe9dd_100%)] flex overflow-hidden'>
      <div className='relative w-[30%] min-h-screen overflow-hidden'>
        <img
          src='/wanderly_login_image.png'
          alt='Login visual'
          className='h-full w-full object-cover'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent' />
      </div>

      <div className='relative flex w-[70%] items-center justify-center overflow-hidden px-10 py-12'>
        <video
          className='absolute inset-0 h-full w-full object-cover'
          src='/login_right_side_bg_video2.mp4'
          autoPlay
          muted
          loop
          playsInline
        />

        <div className='relative w-full max-w-2xl rounded-[2rem] border border-white/60 px-12 py-8 shadow-[0_25px_80px_rgba(46,61,42,0.15)] backdrop-blur-[50px]'>
          <div className='mb-5 flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium uppercase tracking-[0.3em] text-green-900/60'>Welcome back</p>
              <h1 className='mt-3 text-2xl text-green-950 font-wanderly'>Login to Wanderly</h1>
              <p className='mt-3 max-w-md text-sm leading-6 text-stone-600'>
                Pick up your plans, saved stays, and favorite destinations right where you left them.
              </p>
            </div>
          </div>

          <form className='flex flex-col gap-3'>
            <div className='flex flex-col gap-2'>
              <label htmlFor='email' className='text-sm font-medium text-stone-700'>
                Email
              </label>
              <input
                id='email'
                type='email'
                placeholder='Enter your email'
                className='w-full rounded-2xl border border-stone-200 bg-white/80 px-4 py-2 text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-green-800 focus:bg-white'
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='password' className='text-sm font-medium text-stone-700'>
                Password
              </label>
              <div className='relative'>
                <input
                  id='password'
                  type={show ? 'text' : 'password'}
                  placeholder='Enter your password'
                  className='w-full rounded-2xl border border-stone-200 bg-white/80 px-4 py-2 pr-12 text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-green-800 focus:bg-white'
                />
                <button
                  type='button'
                  onClick={() => setShow(!show)}
                  className='absolute right-4 top-1/2 -translate-y-1/2 text-stone-500 transition hover:text-stone-700'
                >
                  {show ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className='mt-3 flex items-center justify-between text-sm text-stone-500'>
              <p className='text-white'>Sign in and continue building your next trip.</p>
            </div>

            <button
              type='submit'
              className='mt-2 rounded-2xl bg-green-300 px-4 py-4 text-sm font-medium tracking-[0.18em] text-white uppercase shadow-lg shadow-green-900/20 transition hover:-translate-y-0.5 hover:bg-green-800'
            >
              Login
            </button>

            <p className='mt-3 text-center text-sm text-white'>
              Don&apos;t have an account?{' '}
              <Link to='/signup' className='font-semibold text-green-200 underline underline-offset-4 hover:text-green-100'>
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
