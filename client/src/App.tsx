import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/auth/login'
import Reigstration from './pages/auth/reigstration'
import Home from './pages/Home'
import ProtectedRoute from './pages/ProtectedRoute'
import UserHome from './pages/UserHome'
import PostData from './pages/user-components/PostData'
import NavBar from './components/navigation/NavBar'
import CreateForum from './pages/admin/CreateForum'
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<UserHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Reigstration />} />
        <Route path="/create-thread" element={<CreateForum />} />
      </Routes>
    </>
  )
}

export default App
