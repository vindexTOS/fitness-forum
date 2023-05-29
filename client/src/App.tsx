import { useState, useEffect } from 'react'
import { Routes, Route, useParams } from 'react-router-dom'
import Login from './pages/auth/login'
import Reigstration from './pages/auth/reigstration'
import Home from './pages/MainPage'
import ProtectedRoute from './pages/helper-components/ProtectedRoute'
import UserHome from './pages/user-components/UserHome'
import PostData from './pages/user-components/make-post-components/PostData'
import NavBar from './components/navigation/NavBar'
import CreateForum from './pages/admin/CreateForum'
import Thread from './pages/post-component/Thread'
import REDIRECT from './pages/helper-components/REDIRECT'
import PostInside from './pages/post-component/PostInside'
import UserProfile from './pages/user-components/user-content/UserProfile'
import EditPost from './pages/post-component/Post-Update/EditPost'
import UserEdit from './pages/user-components/user-content/UserEdit'
function App() {
  const { forumID } = useParams()
  // useEffect(() => {
  //   console.log(forumID)
  // }, [forumID])
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<REDIRECT />} />
        <Route path="/posts/page/:pages" element={<Home />} />
        <Route path="/:forumID/:postID/:pages" element={<PostInside />} />
        <Route path="/:postID/:pages" element={<PostInside />} />
        <Route path="/threads/:forumID/page/:threadpage" element={<Thread />} />
        <Route path="/user/:userID" element={<UserProfile />} />
        <Route path="/home" element={<UserHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Reigstration />} />
        <Route path="/create-thread" element={<CreateForum />} />
        <Route path="/create-post" element={<PostData />} />
        <Route path="edit-post/:postID" element={<EditPost />} />
        <Route path="edit-user/:userID" element={<UserEdit />} />
      </Routes>
    </>
  )
}

export default App
