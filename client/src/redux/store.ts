import { configureStore, Middleware } from '@reduxjs/toolkit'
import RegisterReducer from './features/slice/RegisterSlice'
import LoginReducer from './features/slice/LoginSlice'
import ThreadReducer from './features/slice/ForumSlice'
import PostReducer from './features/slice/PostSlice'
import ThreadGetReducer from './features/slice/ThreadSlice'
import GetAllPostReducer from './features/slice/GetAllPosts'
import FireBasePhotoReducer from './features/slice/FireBaseSlices/ProfilePhotoSlice'
import GeneralReducer from './features/slice/GeneralSlice'
import CommentReducer from './features/slice/CommentSlice'
import NotificationReducer from './features/slice/NotificationSlice'
import UserEditReducer from './features/slice/UserEditSlice'
const store = configureStore({
  reducer: {
    GeneralReducer,
    RegisterReducer,
    LoginReducer,
    ThreadReducer,
    PostReducer,
    ThreadGetReducer,
    GetAllPostReducer,
    FireBasePhotoReducer,
    CommentReducer,
    NotificationReducer,
    UserEditReducer,
  },
})

export default store
