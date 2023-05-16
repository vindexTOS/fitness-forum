import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/auth/login'
import Reigstration from './pages/auth/reigstration'
import Home from './pages/Home'
import ProtectedRoute from './pages/ProtectedRoute'
import UserHome from './pages/UserHome'
import PostData from './pages/user-components/PostData'
import NavBar from './components/navigation/NavBar'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<UserHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Reigstration />} />
      </Routes>
    </>
  )
}

export default App
