import React from 'react'
import { useMainContext } from '../context'
import { useNavigate } from 'react-router-dom'
const ProtectedRoute = ({
  children,
}: {
  children: React.JSX.Element | null
}) => {
  const { user } = useMainContext()
  const navigate = useNavigate()
  if (user) {
    return children
  } else {
    navigate('/login')
    return null
  }
}

export default ProtectedRoute
