import { configureStore } from '@reduxjs/toolkit'
import RegisterReducer from './features/slice/RegisterSlice'
import LoginReducer from './features/slice/LoginSlice'
import ThreadReducer from './features/slice/ForumSlice'
const store = configureStore({
  reducer: {
    RegisterReducer,
    LoginReducer,
    ThreadReducer,
  },
})

export default store
