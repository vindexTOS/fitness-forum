import React from 'react'
import { useMainContext } from '../../context'
import { Link } from 'react-router-dom'

const Reigstration = () => {
  const { Register, setPassword, setEmail, setName, err } = useMainContext()
  return (
    <>
      {' '}
      <form onSubmit={(e) => Register(e)}>
        <h1 onClick={() => console.log(err)}>Conose</h1>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          name="name"
          id="name"
          placeholder=" Name"
        />
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
        <button type="submit">Register</button>
      </form>
      <Link to="/login">Login</Link>
    </>
  )
}

export default Reigstration
