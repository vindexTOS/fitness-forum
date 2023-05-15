import React from 'react'

import { Link } from 'react-router-dom'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { getEmail, getPassword } from '../../redux/features/slice/LoginSlice'
import { LoginThunk } from '../../redux/features/async-thunk/LoginThunk'
const Login = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const { email, password, data } = useSelector(
    (state: any) => state.LoginReducer,
  )
  return (
    <>
      <div>
        <h1 onClick={() => console.log(data)}>console</h1>
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
        <button onClick={() => dispatch(LoginThunk({ email, password }))}>
          Login
        </button>
      </div>
      <Link to="/register">Register</Link>
    </>
  )
}

export default Login
