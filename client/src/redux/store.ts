import { configureStore, Middleware } from '@reduxjs/toolkit'
import RegisterReducer from './features/slice/RegisterSlice'
import LoginReducer from './features/slice/LoginSlice'
import ThreadReducer from './features/slice/ForumSlice'
import PostReducer from './features/slice/PostSlice'
import ThreadGetReducer from './features/slice/ThreadSlice'
import GetAllPostReducer from './features/slice/GetAllPosts'
import FireBasePhotoReducer from './features/slice/FireBaseSlices/ProfilePhotoSlice'
const store = configureStore({
  reducer: {
    RegisterReducer,
    LoginReducer,
    ThreadReducer,
    PostReducer,
    ThreadGetReducer,
    GetAllPostReducer,
    FireBasePhotoReducer,
  },
})

export default store
