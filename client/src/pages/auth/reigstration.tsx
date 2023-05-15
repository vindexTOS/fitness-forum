import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  getName,
  getEmail,
  getPassword,
} from '../../redux/features/slice/RegisterSlice'
import { RegisterThunk } from '../../redux/features/async-thunk/Register'
import { ThunkDispatch } from '@reduxjs/toolkit'
const Reigstration = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const err = useSelector((state: any) => state.RegisterReducer.error)
  const { name, email, password } = useSelector(
    (state: any) => state.RegisterReducer,
  )
  return (
    <>
      <div>
        <h1 onClick={() => console.log(err)}>console</h1>
        <input
          onChange={(e) => dispatch(getName(e.target.value))}
          type="text"
          name="name"
          id="name"
          placeholder=" Name"
        />
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
        <button
          onClick={() => dispatch(RegisterThunk({ name, email, password }))}
        >
          Register
        </button>
      </div>
      <Link to="/login">Login</Link>
    </>
  )
}

export default Reigstration
