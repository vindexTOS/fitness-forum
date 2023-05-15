import React from 'react'
import { useMainContext } from '../../context'
import { Link } from 'react-router-dom'

const Login = () => {
  const { err, Login, setPassword, setEmail } = useMainContext()
  return (
    <>
      {' '}
      <form onSubmit={(e) => Login(e)}>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          id="email"
          placeholder=" Email"
        />

        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          id="password"
          placeholder=" password"
        />
        <button type="submit">Login</button>
      </form>
      <Link to="/register">Register</Link>
    </>
  )
}

export default Login
