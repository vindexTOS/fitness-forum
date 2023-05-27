import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GoComment } from 'react-icons/go'
import { AiOutlineShareAlt } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
const PostBottomInfo = ({
  postID,
  forumID,
  _id,
}: {
  postID: string
  forumID?: string
  _id: string
}) => {
  const navigate = useNavigate()
  const allComments = useSelector(
    (state: any) => state.CommentReducer.allComments,
  )
  const style = {
    section: `flex items-start justify-between w-[100%] pt-10`,
  }
  const [copy, setCopy] = React.useState<string>('')
  function copyToClipboard() {
    navigator.clipboard
      .writeText(`http://localhost:5173/${forumID}/${_id}/1`)
      .then(() => setCopy('Copied!'))
      .catch((error) =>
        console.error('Error copying text to clipboard:', error),
      )
    setTimeout(() => {
      setCopy('')
    }, 2000)
  }
  if (allComments.comments) {
    const commentLength = allComments.comments.filter(
      (val: any) => val.postID === postID,
    )
    const commentReplyLength = commentLength.filter((val: any) => val.reply)

    return (
      <section className={style.section}>
        <div
          onClick={() => navigate(`/${forumID}/${_id}/1`)}
          style={{ borderRadius: '20px' }}
          className="flex items-center justify-center gap-2 text-gray-400 hover:bg-gray-300 p-2 rounded-[20xp]"
        >
          <GoComment className="text-[1.4rem] text-gray-400" />
          <p>comments {commentLength.length + commentReplyLength.length}</p>
        </div>
        <div
          onClick={() => copyToClipboard()}
          style={{ borderRadius: '20px' }}
          className="flex items-center justify-center gap-2 text-gray-400 hover:bg-gray-300 p-2 rounded-[20xp]"
        >
          <AiOutlineShareAlt className="text-[1.4rem] text-gray-400" />
          <p>Share</p>
        </div>
      </section>
    )
  } else {
    return (
      <section className={style.section}>
        <div
          onClick={() => navigate(`/${forumID}/${_id}/1`)}
          style={{ borderRadius: '20px' }}
          className="flex items-center justify-center gap-2 text-gray-400 hover:bg-gray-300 p-2 rounded-[20xp]"
        >
          <GoComment className="text-[1.4rem] text-gray-400" />
          <p>comments 0</p>
        </div>
        <div
          onClick={() => copyToClipboard()}
          style={{ borderRadius: '20px' }}
          className="flex items-center justify-center gap-2 text-gray-400 hover:bg-gray-300 p-2 rounded-[20xp]"
        >
          <AiOutlineShareAlt className="text-[1.4rem] text-gray-400" />
          <p>Share</p>
          {copy}
        </div>
      </section>
    )
  }
}

export default PostBottomInfo
