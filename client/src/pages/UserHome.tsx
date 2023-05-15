import React from 'react'
import { useMainContext } from '../context'
import PostData from './user-components/PostData'
const UserHome = () => {
  const { user } = useMainContext()

  if (user) {
    const { name, email, _id } = user
    return (
      <div>
        <h1>{_id}</h1>
        <h1>Name:{name}</h1>
        <h1>EMAIL:{email}</h1>
        <PostData />
      </div>
    )
  } else {
    return null
  }
}

export default UserHome
