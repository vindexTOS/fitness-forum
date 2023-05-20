import React, { useEffect } from 'react'
import { AiOutlineMail } from 'react-icons/ai'
import { RiLockPasswordFill } from 'react-icons/ri'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import {
  getEmail,
  getPassword,
  getCookies,
} from '../../redux/features/slice/LoginSlice'
import { LoginThunk } from '../../redux/features/async-thunk/LoginThunk'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import InputDiv from '../../components/auth-components/InputDiv'
import Cookies from 'universal-cookie'
import ButtonAuth from '../../components/auth-components/ButtonAuth'
const Login = () => {
  //getting states from redux store
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const { email, password, data, error, realErro } = useSelector(
    (state: any) => state.LoginReducer,
  )

  // login function dispatching and passing
  const LoginFun = () => {
    if (email && password) {
      dispatch(LoginThunk({ email, password, dispatch }))
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
          {/* <h1 onClick={() => console.log(data)}>console</h1>
// testing logs
          <h1 onClick={() => dispatch(getCookies())}>LOG</h1> */}
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
          <ButtonAuth styles={'w-[20rem]'} title="Log-in" func={LoginFun} />
          {realErro && (
            <p className="text-center text-[#ec2b58] border-2 py-2 rounded-[6px] border-[#ec2b58]">
              {realErro}!!!
            </p>
          )}
        </div>
        <p className="text-[#f51b51]">
          If you don't have an account
          <Link className="text-blue-400 hover:text-blue-300" to="/register">
            <span> Register </span>
          </Link>
          here
        </p>
      </section>
    )
  } else {
    // re daracting user to home if they are already sign in
    return <Navigate to="/home" />
  }
}

export default Login
