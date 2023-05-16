import React, { useEffect } from 'react'

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
const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const { email, password, data, error, realErro } = useSelector(
    (state: any) => state.LoginReducer,
  )

  const LoginFun = () => {
    dispatch(LoginThunk({ email, password, dispatch }))
  }
  const cookies = new Cookies()
  const token = cookies.get('jwt_authorization')
  useEffect(() => {
    if (token) {
      dispatch(getCookies())
      navigate('/login')
    }
  }, [])

  const style = {
    section: `w-[100vw] flex items-center justify-center`,
    formDiv: `flex flex-col`,
  }
  if (!data.user) {
    return (
      <section className={style.section}>
        <div className={style.formDiv}>
          <h1 onClick={() => console.log(data)}>console</h1>

          <h1 onClick={() => dispatch(getCookies())}>LOG</h1>
          <InputDiv type={'email'} fun={getEmail} />

          <input
            onChange={(e) => dispatch(getPassword(e.target.value))}
            type="password"
            name="password"
            id="password"
            placeholder=" password"
          />
          <button onClick={() => LoginFun()}>Login</button>
        </div>
        <Link to="/register">Register</Link>
      </section>
    )
  } else {
    return <Navigate to="/home" />
  }
}

export default Login
