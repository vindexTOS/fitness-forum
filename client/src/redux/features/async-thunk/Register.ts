import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface RegisterPayload {
  name: string
  email: string
  password: string
}

const RegisterThunk = createAsyncThunk(
  'Register/mongo',
  async (val: RegisterPayload) => {
    const apiUrl = `http://localhost:3000/register`
    if (val.name && val.email && val.password) {
      const { name, email, password } = val
      try {
        await axios
          .post(apiUrl, { name, email, password })
          .catch((err) => console.log(err))
        console.log('request sent')
      } catch (error) {
        console.log(error)
      }
    }
  },
)

export { RegisterThunk }
