import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const ProtectedRoute = ({
  children,
}: {
  children: React.JSX.Element | null
}) => {
  const user = useSelector((state: any) => state.LoginReducer.data)

  const navigate = useNavigate()
  if (user) {
    return children
  } else {
    navigate('/login')
    return null
  }
}

export default ProtectedRoute
