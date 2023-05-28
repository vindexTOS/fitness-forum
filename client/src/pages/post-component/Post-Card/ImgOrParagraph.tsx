import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

type ImgOrParaTypes = {
  realPhoto: string
  forumID?: string
  _id: string
  post: string
}

const ImgOrParagraph: FC<ImgOrParaTypes> = ({
  realPhoto,
  forumID,
  _id,
  post,
}) => {
  const navigate = useNavigate()
  return (
    <div
      className="   w-[100%] flex items-center justify-center"
      onClick={() => navigate(`/${forumID}/${_id}/1`)}
    >
      {realPhoto ? (
        <img
          onClick={() => navigate(`/${forumID}/${_id}/1`)}
          className={`h-[400px] max-w-[80%] max_smm:h-[300px]  `}
          src={String(realPhoto)}
        />
      ) : (
        <p
          onClick={() => navigate(`/${forumID}/${_id}/1`)}
          className="w-[100%]   break-all  text-start "
        >
          {post}
        </p>
      )}
    </div>
  )
}

export default ImgOrParagraph
