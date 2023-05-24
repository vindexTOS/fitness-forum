import React, { FC } from 'react'
import { CommentType } from './CommentsSection'
import { useSelector } from 'react-redux'

type DataType = {
  data: CommentType
}
const CommentCard: FC<DataType> = ({ data }) => {
  if (data && data.user) {
    const { comment, userID, postID } = data
    const { name, avatar } = data?.user
    return (
      <div>
        <h1>{name}</h1>
        {/* <h2 onClick={() => console.log(userData)}>On click</h2> */}
        {comment}
      </div>
    )
  } else {
    return <div>loading</div>
  }
}

export default CommentCard
