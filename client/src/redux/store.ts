import { configureStore } from '@reduxjs/toolkit'
import RegisterReducer from './features/slice/RegisterSlice'
const store = configureStore({
  reducer: {
    RegisterReducer,
  },
})

export default store
