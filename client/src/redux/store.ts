import { configureStore, Middleware } from '@reduxjs/toolkit'
import RegisterReducer from './features/slice/RegisterSlice'
import LoginReducer from './features/slice/LoginSlice'
import ThreadReducer from './features/slice/ForumSlice'
import PostReducer from './features/slice/PostSlice'

const store = configureStore({
  reducer: {
    RegisterReducer,
    LoginReducer,
    ThreadReducer,
    PostReducer,
  },
})

export default store
