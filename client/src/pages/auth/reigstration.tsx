// icons
import { RiLockPasswordFill } from 'react-icons/ri'
import { AiOutlineMail } from 'react-icons/ai'
import { RiFileUserFill } from 'react-icons/ri'
// library imports
import React, { useEffect, useState } from 'react'
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
import ImgUpload from '../user-components/post-components/ImgUpload'
import { FireBasePhotoThunk } from '../../redux/features/async-thunk/FireStoreThunks/ProfilePhotoThunk'
import { useMainContext } from '../../context'

const Reigstration = () => {
  const { image, htmlImg } = useMainContext()
  //use navigate from react router dom
  const navigate = useNavigate()
  // dispatching , using ThunkDispatch is very importent to Dispatch asyncThunk functions
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const err = useSelector((state: any) => state.RegisterReducer.error)
  const url = useSelector((state: any) => state.FireBasePhotoReducer.url)
  /// photo upload

  // getting states from RegisterSlice from redux
  const { name, email, password } = useSelector(
    (state: any) => state.RegisterReducer,
  )
  // cookie storage library

  const { data } = useSelector((state: any) => state.LoginReducer)
  const [switcher, setSwitcher] = useState<boolean>(false)

  //registration
  const RegisterFun = async () => {
    //checking if form values exist
    if (htmlImg) {
      //waiting to register
      await dispatch(FireBasePhotoThunk({ dispatch, image }))
    } else {
      setSwitcher(!switcher)
    }
  }

  useEffect(() => {
    if (name && email && password && url) {
      console.log(url)
      dispatch(RegisterThunk({ name, email, password, url }))
    } else if (name && email && password) {
      console.log(url)
      dispatch(RegisterThunk({ name, email, password, url }))
    }
    console.log(url)
    //checking if we get token from the database so we can sign user in right away
    if (data.user) {
      //re daecting user to home page
      navigate('/home')
      console.log('home')
    }
  }, [url, switcher])
  const style = {
    section: `w-[100vw] pt-40 flex flex-col items-center justify-center`,
    formDiv: `flex flex-col gap-2 bg-[#403f3f] p-10 rounded-[20px]`,
  }
  if (!data || !data.user) {
    return (
      <section className={style.section}>
        <div className={style.formDiv}>
          {/* <h1 onClick={() => console.log(err)}>console</h1> */}
          <ImgUpload htmlImg={htmlImg} />
          {htmlImg ? (
            <div className="w-[100%] flex items-center justify-center">
              {' '}
              <img
                className="w-[100px] h-[100px] rounded-[50%]"
                src={htmlImg ? htmlImg : 'null'}
              />
            </div>
          ) : null}
          <InputDiv
            holder="name"
            Icon={RiFileUserFill}
            type={'text'}
            fun={getName}
          />
          <InputDiv
            holder="email"
            Icon={AiOutlineMail}
            type={'email'}
            fun={getEmail}
          />

          <InputDiv
            holder="password"
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
