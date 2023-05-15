import { configureStore } from '@reduxjs/toolkit'
import RegisterReducer from './features/slice/RegisterSlice'
import LoginReducer from './features/slice/LoginSlice'
const store = configureStore({
  reducer: {
    RegisterReducer,
    LoginReducer,
  },
})

export default store
