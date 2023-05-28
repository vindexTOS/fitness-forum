import { FC } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

type HeaderInfoType = {
  forumID: string | undefined
  userID: string
  date: string | undefined
  title: string
  _id: string
}

const PostTopInfo: FC<HeaderInfoType> = ({
  forumID,
  userID,
  date,
  title,
  _id,
}) => {
  const userData = useSelector((state: any) => state.GeneralReducer.userData)

  const user = userData && userData.find((val: any) => val._id === userID)

  const style = {
    headerDiv: `flex flex-col items-start w-[100%] max_smm:text-[12xp] `,
  }
  const navigate = useNavigate()
  return (
    <div className={style.headerDiv}>
      <div className="flex items-center justify-center gap-2 max_smm:text-[12px]">
        <p>
          thread/
          <span
            onClick={() => navigate(`/threads/${forumID}/page/1`)}
            className="text-blue-300 hover:underline hover:text-blue-500"
          >
            {forumID}
          </span>
        </p>
        <div className="text-gray-400 flex   max_smm:text-[9px] max_smm:w-[5rem] gap-1">
          <p>Posted by</p>
          <span
            className="text-pink-600 hover:underline hoveR:text-pink-700"
            onClick={() => navigate(`/user/${userID}`)}
          >
            {user?.name ? user?.name : 'User '}
          </span>
        </div>
        <p className="text-gray-500 max_smm:text-[9px] max_smm:w-[4rem] text-[12px]">
          {date ? date.slice(0, 10) : ''}
        </p>
      </div>
      <h1
        onClick={() => navigate(`/${forumID}/${_id}`)}
        className="text-[1.2rem] font-bold text-gray-300"
      >
        {title}
      </h1>
    </div>
  )
}

export default PostTopInfo
