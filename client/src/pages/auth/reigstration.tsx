// icons
import { RiLockPasswordFill } from 'react-icons/ri'
import { AiOutlineMail } from 'react-icons/ai'
import { RiFileUserFill } from 'react-icons/ri'
// library imports
import React from 'react'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'universal-cookie'

// importing redux functions slices and thunk
import { RegisterThunk } from '../../redux/features/async-thunk/Register'
import { getCookies } from '../../redux/features/slice/LoginSlice'
import {
  getName,
  getEmail,
  getPassword,
} from '../../redux/features/slice/RegisterSlice'
// importing react components
import InputDiv from '../../components/auth-components/InputDiv'
import ButtonAuth from '../../components/auth-components/ButtonAuth'
import { FireBasePhotoThunk } from '../../redux/features/async-thunk/FireStoreThunks/ProfilePhotoThunk'
import { useMainContext } from '../../context'

const Reigstration = () => {
  const {
    removeImgFromHtml,
    imgUploadDrag,
    imgUpload,
    image,
    htmlImg,
  } = useMainContext()
  //use navigate from react router dom
  const navigate = useNavigate()
  // dispatching , using ThunkDispatch is very importent to Dispatch asyncThunk functions
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const err = useSelector((state: any) => state.RegisterReducer.error)

  /// photo upload
  const UploadToStore = () => {
    dispatch(FireBasePhotoThunk({ image, subFolder: 'profile', dispatch }))
  }

  // getting states from RegisterSlice from redux
  const { name, email, password } = useSelector(
    (state: any) => state.RegisterReducer,
  )
  // cookie storage library

  const { data } = useSelector((state: any) => state.LoginReducer)

  //registration
  const RegisterFun = async () => {
    //checking if form values exist
    if (name && email && password) {
      //waiting to register
      await dispatch(RegisterThunk({ name, email, password }))

      //checking if we get token from the database so we can sign user in right away
      if (data.user) {
        //re daecting user to home page
        navigate('/home')
        console.log('home')
      }
    }
  }
  const style = {
    section: `w-[100vw] pt-40 flex flex-col items-center justify-center`,
    formDiv: `flex flex-col gap-2 bg-[#403f3f] p-10 rounded-[20px]`,
  }
  if (!data || !data.user) {
    return (
      <section className={style.section}>
        <div className={style.formDiv}>
          {/* <h1 onClick={() => console.log(err)}>console</h1> */}

          <InputDiv Icon={RiFileUserFill} type={'name'} fun={getName} />
          <InputDiv Icon={AiOutlineMail} type={'email'} fun={getEmail} />

          <InputDiv
            Icon={RiLockPasswordFill}
            type={'password'}
            fun={getPassword}
          />

          <ButtonAuth
            styles={'w-[20rem]'}
            title="Register"
            func={RegisterFun}
          />
        </div>
        <p className="text-[#f51b51]">
          If you already have an account sign
          <Link className="text-blue-400 hover:text-blue-300" to="/login">
            <span> Login </span>
          </Link>
        </p>
      </section>
    )
  } else {
    return <Navigate to="/home" />
  }
}

export default Reigstration
