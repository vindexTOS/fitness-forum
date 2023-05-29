// icons
import { RiLockPasswordFill } from 'react-icons/ri'
import { AiOutlineMail } from 'react-icons/ai'
import { RiFileUserFill } from 'react-icons/ri'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { IoIosFitness } from 'react-icons/io'
// library imports
import React, { useEffect, useState } from 'react'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// importing redux functions slices and thunk
import { RegisterThunk } from '../../redux/features/async-thunk/Register'
import { getError } from '../../redux/features/slice/LoginSlice'
import {
  getName,
  getEmail,
  getPassword,
  getAbout,
  getDeadlift,
  getSquat,
  getBench,
} from '../../redux/features/slice/RegisterSlice'
// importing react components
import InputDiv from '../../components/auth-components/InputDiv'
import ButtonAuth from '../../components/auth-components/ButtonAuth'
import ImgUpload from '../user-components/make-post-components/ImgUpload'
import LoadingComponent from '../user-components/make-post-components/LoadingComponent'
import { FireBasePhotoThunk } from '../../redux/features/async-thunk/FireStoreThunks/ProfilePhotoThunk'

import { useMainContext } from '../../context'

const Reigstration = () => {
  const { image, htmlImg } = useMainContext()
  //use navigate from react router dom
  const navigate = useNavigate()
  // dispatching , using ThunkDispatch is very importent to Dispatch asyncThunk functions
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const realError = useSelector((state: any) => state.LoginReducer.realErro)
  const url = useSelector((state: any) => state.FireBasePhotoReducer.url)
  /// photo upload

  // getting states from RegisterSlice from redux
  const { name, email, password, bench, squat, deadlift, about } = useSelector(
    (state: any) => state.RegisterReducer,
  )
  // cookie storage library

  const { data } = useSelector((state: any) => state.LoginReducer)
  const [switcher, setSwitcher] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  // optional filed
  const [optionalDrop, setOptionalDrop] = useState<boolean>(false)
  //registration
  const RegisterFun = async () => {
    //checking if form values exist
    if (htmlImg) {
      //waiting to register
      setLoading(true)
      await dispatch(FireBasePhotoThunk({ dispatch, image }))
      setLoading(false)
    } else {
      setSwitcher(!switcher)
    }
  }

  useEffect(() => {
    if (!name) {
      dispatch(getError('Name input is empty'))
    }
    if (!email) {
      dispatch(getError('Email input is empty'))
    }
    if (!password) {
      dispatch(getError('Passwod input is empty'))
    }

    if (name && email && password && url) {
      let description = {
        bench,
        squat,
        deadlift,
        about,
      }
      console.log(url)
      dispatch(
        RegisterThunk({
          name,
          email,
          password,
          url,
          description,
          dispatch,
        }),
      )
    } else if (name && email && password) {
      let description = {
        bench,
        squat,
        deadlift,
        about,
      }
      console.log(url)
      dispatch(
        RegisterThunk({
          name,
          email,
          password,
          url,
          description,
          dispatch,
        }),
      )
    }
    //checking if we get token from the database so we can sign user in right away
    if (data.user) {
      //re daecting user to home page
      navigate('/home')
      console.log('home')
    }
  }, [url, switcher])
  useEffect(() => {
    if (realError) {
      setTimeout(() => {
        dispatch(getError(''))
      }, 3000)
    }
  }, [realError])
  const style = {
    section: `w-[100vw] pt-40 flex flex-col items-center justify-center`,
    formDiv: `flex flex-col gap-2 bg-[#403f3f] p-10 rounded-[20px]`,
    arrowIcon: `text-[1.4rem] `,
    t: `bg-[#2e2d2d] text-[#ec2b58] w-[100%] h-[100%] outline outline-[1px] outline-[#ec2b58] boxshaddow rounded-[5px] p-2 `,
  }
  if (!data || !data.user) {
    return (
      <section className={style.section}>
        <div className={style.formDiv}>
          {/* <h1 onClick={() => console.log(err)}>console</h1> */}
          {htmlImg ? (
            <div className="w-[100%] flex items-center justify-center">
              <img
                className="w-[100px] h-[100px] rounded-[50%]"
                src={htmlImg ? htmlImg : 'null'}
              />
            </div>
          ) : null}
          <InputDiv
            error={realError}
            errorType={'Name input is empty'}
            holder="name"
            Icon={RiFileUserFill}
            type={'text'}
            fun={getName}
          />
          <InputDiv
            error={realError}
            errorType={'Email input is empty'}
            holder="email"
            Icon={AiOutlineMail}
            type={'email'}
            fun={getEmail}
          />
          <InputDiv
            error={realError}
            errorType={'Passwod input is empty'}
            holder="password"
            Icon={RiLockPasswordFill}
            type={'password'}
            fun={getPassword}
          />
          <div>
            <div
              onClick={() => setOptionalDrop(!optionalDrop)}
              className="text-gray-300 bg-[#2e2d2d]  justify-center gap-  w-[20rem] h-[2.6rem] flex flex-col items-center rounded-[5px] cursor-pointer"
            >
              <div className="flex items-center justify-center  gap-2">
                <p>Optional Fields</p>
                {!optionalDrop ? (
                  <MdKeyboardArrowDown className={style.arrowIcon} />
                ) : (
                  <MdKeyboardArrowUp className={style.arrowIcon} />
                )}
              </div>
              <p className="text-[10px]  text-gray-500">
                such as profile photo or about description
              </p>
            </div>
            {optionalDrop && (
              <div className="flex flex-col gap-2 items-center">
                <ImgUpload htmlImg={htmlImg} />
                <InputDiv
                  holder="Bench press (optional)"
                  Icon={IoIosFitness}
                  type={'number'}
                  fun={getBench}
                />
                <InputDiv
                  holder="Deadlift (optional)"
                  Icon={IoIosFitness}
                  type={'number'}
                  fun={getDeadlift}
                />
                <InputDiv
                  holder="Squat (optional)"
                  Icon={IoIosFitness}
                  type={'number '}
                  fun={getSquat}
                />
                <textarea
                  onChange={(e) => dispatch(getAbout(e.target.value))}
                  id="photo"
                  placeholder="Additional info (optional)"
                  className={style.t}
                ></textarea>
              </div>
            )}
          </div>
          <ButtonAuth
            styles={'w-[20rem]'}
            title="Register"
            func={RegisterFun}
          />
          {realError && (
            <p className="text-center text-[#ec2b58] border-2 py-2 px-2 rounded-[6px] border-[#ec2b58]">
              {realError}!!!
            </p>
          )}
        </div>
        <p className="text-[#f51b51]">
          If you already have an account sign
          <Link className="text-blue-400 hover:text-blue-300" to="/login">
            <span> Login </span>
          </Link>
        </p>{' '}
        <LoadingComponent loading={loading} />
      </section>
    )
  } else {
    return <Navigate to="/home" />
  }
}

export default Reigstration
