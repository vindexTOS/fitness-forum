import React, { useEffect } from 'react'

import { Link } from 'react-router-dom'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import {
  getEmail,
  getPassword,
  getCookies,
} from '../../redux/features/slice/LoginSlice'
import { LoginThunk } from '../../redux/features/async-thunk/LoginThunk'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const { email, password, data, error, realErro } = useSelector(
    (state: any) => state.LoginReducer,
  )
  useEffect(() => {
    if (data.token) {
      navigate('/home')
      console.log(data.token)
      dispatch(getCookies())
    }
  }, [])

  const Login = () => {
    dispatch(LoginThunk({ email, password, dispatch }))
    console.log(data)
    if (data.token) {
      setTimeout(() => {
        navigate('/home')
      }, 2000)
    }
  }
  useEffect(() => {
    console.log(data)
  }, [data])
  return (
    <>
      <div>
        <h1 onClick={() => console.log(realErro)}>console</h1>
        <input
          onChange={(e) => dispatch(getEmail(e.target.value))}
          type="email"
          name="email"
          id="email"
          placeholder=" Email"
        />

        <input
          onChange={(e) => dispatch(getPassword(e.target.value))}
          type="password"
          name="password"
          id="password"
          placeholder=" password"
        />
        <button onClick={() => Login()}>Login</button>
      </div>
      <Link to="/register">Register</Link>
    </>
  )
}

export default Login
