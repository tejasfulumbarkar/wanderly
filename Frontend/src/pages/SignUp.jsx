import React, { useState } from 'react'
import axios from 'axios'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { authDataContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useContext } from 'react';



const SignUp = () => {
  const [show, setShow] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  let { serverUrl } = useContext(authDataContext)



  const handleSignUp = async (e) => {
    e.preventDefault()
    setErrorMessage("")

    try {
      setIsSubmitting(true)
      let result = await axios.post(serverUrl + "/api/auth/signup", {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password
      },{withCredentials:true})

      console.log(result)

    } catch (error) {
      console.log(error)
      setErrorMessage(error?.response?.data?.message || "Unable to sign up right now. Please try again.")

    } finally {
      setIsSubmitting(false)
    }

  }



  return (
    // main container
    <div className='min-h-screen w-full bg-[linear-gradient(135deg,#f4efe7_0%,#f9f6f0_45%,#dfe9dd_100%)] flex overflow-hidden'>
      {/* left conatiner */}
      <div className='relative w-[30%] min-h-screen overflow-hidden'>
        <img
          src='/wanderly_login_image.png'
          alt='Sign up visual'
          className='h-full w-full object-cover'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent' />
        {/* <div className='absolute inset-x-0 bottom-0 p-10 text-white'>
          <p className='text-xs uppercase tracking-[0.35em] text-white/75'>Wanderly</p>
          <h2 className='mt-3 font-wanderly text-4xl leading-tight'>
            Begin your next
            <br />
            beautiful escape
          </h2>
          <p className='mt-4 max-w-xs text-sm leading-6 text-white/80'>
            Discover stays, hidden gems, and memorable trips with an account made for modern travelers.
          </p>
        </div> */}
      </div>

      {/* Right side panel */}
      <div className='relative flex w-[70%] items-center justify-center overflow-hidden px-10 py-12'>
        <Link to='/' className='absolute top-2 left-2 z-20 flex items-center gap-2 text-white'>
          <FaArrowLeft />
          <span>Back to home</span>
        </Link>

        <video
          className='absolute inset-0 h-full w-full object-cover z-0'
          src='/login_right_side_bg_video2.mp4'
          autoPlay
          muted
          loop
          playsInline
        />
        {/* <div className='absolute inset-0 bg-white/45 ' /> */}

        <div className='relative w-full max-w-2xl rounded-[2rem] border border-white/60  px-12 py-8 shadow-[0_25px_80px_rgba(46,61,42,0.15)] backdrop-blur-[50px] z-10'>
          <div className='mb-5 flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium uppercase tracking-[0.3em] text-green-900/60'>Create account</p>
              <h1 className='mt-3 text-2xl text-green-950 font-wanderly'>Sign Up to Wanderly</h1>
              <p className='mt-3 max-w-md text-sm leading-6 text-stone-600'>
                Plan weekend getaways, save dream stays, and keep every journey in one calm place.
              </p>
            </div>

          </div>

          <form className='flex flex-col gap-3' onSubmit={handleSignUp}>
            <div className='flex flex-col gap-2'>
              <label htmlFor='username' className='text-sm font-medium text-stone-700'>
                Username
              </label>
              <input
                required
                onChange={(e) => {
                  setName(e.target.value)
                  if (errorMessage) setErrorMessage("")
                }}
                value={name}
                id='username'
                type='text'
                placeholder='Enter your username'
                className='w-full rounded-2xl border border-stone-200 bg-white/80 px-4 py-2 text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-green-800 focus:bg-white'
              />
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor='email' className='text-sm font-medium text-stone-700'>
                Email
              </label>
              <input
                required
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (errorMessage) setErrorMessage("")
                }}
                value={email}
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
                  required
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (errorMessage) setErrorMessage("")
                  }}
                  value={password}
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
              <p className='text-white'>Start free and personalize your travel profile anytime.</p>

            </div>

            {errorMessage && (
              <p className='rounded-2xl border border-red-200 bg-red-50/90 px-4 py-3 text-sm text-red-700'>
                {errorMessage}
              </p>
            )}

            <button
              type='submit'
              disabled={isSubmitting}
              className='mt-2 rounded-2xl bg-green-300 px-4 py-4 text-sm font-medium tracking-[0.18em] text-white uppercase shadow-lg shadow-green-900/20 transition hover:-translate-y-0.5 hover:bg-green-800'
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>

            <p className='mt-3 text-center text-sm text-white'>
              Already have an account?{' '}
              <Link to='/login' className='font-semibold text-green-200 underline underline-offset-4 hover:text-green-100'>
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
