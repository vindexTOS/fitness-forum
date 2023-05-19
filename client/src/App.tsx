import { useState, useEffect } from 'react'
import { Routes, Route, useParams } from 'react-router-dom'
import Login from './pages/auth/login'
import Reigstration from './pages/auth/reigstration'
import Home from './pages/Home'
import ProtectedRoute from './pages/ProtectedRoute'
import UserHome from './pages/UserHome'
import PostData from './pages/user-components/post-components/PostData'
import NavBar from './components/navigation/NavBar'
import CreateForum from './pages/admin/CreateForum'
import Thread from './pages/Thread'
function App() {
  const { forumID } = useParams()
  useEffect(() => {
    console.log(forumID)
  }, [forumID])
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/threads/:forumID" element={<Thread />} />
        <Route path="/home" element={<UserHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Reigstration />} />
        <Route path="/create-thread" element={<CreateForum />} />
        <Route path="/create-post" element={<PostData />} />
      </Routes>
    </>
  )
}

export default App
