import React, { FC } from 'react'
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
export type PostsComponentCardType = {
  _id?: string
  forumID?: string
  photo: null | any
  post: string
  userID?: string
  date?: string
  title: string
}
export type DataInterFace = {
  data: PostsComponentCardType
}
const PostsComponentCard: FC<DataInterFace> = ({ data }) => {
  const { _id, forumID, photo, post, userID, title, date } = data
  const navigate = useNavigate()
  const realPhoto = photo !== 'No Photo' && photo
  const style = {
    mainDiv: `w-[100%] relative rounded-[5px] bg-[#212121]   outline outline-[1px] outline-gray-600 hover:outline-[#ec2b58] max-h-[600px]  flex  cursor-pointer      text-white`,
    headerDiv: `flex flex-col items-start w-[100%] `,
    mainContent: `flex flex-col items-center  justify-center w-[100%] px-10 p-6 `,
    img: `h-[400px] max-w-[80%] `,
    raiting: ` h-[100%] w-[30px] absolute bg-[#262525] rounded-t-[5px] rounded-b-[5px]`,
    btn: `flex flex-col items-center py-2`,
    icon: `text-[1.6rem] text-gray-500`,
  }

  const userData = useSelector((state: any) => state.GeneralReducer.userData)

  const user = userData && userData.find((val: any) => val._id === userID)

  return (
    <div className={style.mainDiv}>
      <div className={style.raiting}>
        <div className={style.btn}>
          <TiArrowSortedUp className={style.icon} />{' '}
          <TiArrowSortedDown className={style.icon} />
        </div>
      </div>
      <section className={style.mainContent}>
        <div className={style.headerDiv}>
          <div className="flex items-center justify-center gap-2">
            <p>
              thread/
              <span
                onClick={() => navigate(`/threads/${forumID}/page/1`)}
                className="text-blue-300 hover:underline hover:text-blue-500"
              >
                {forumID}
              </span>
            </p>
            <p className="text-gray-400">
              Posted by{' '}
              <span onClick={() => navigate(`/user/${userID}`)}>
                {user.name}
              </span>
            </p>{' '}
            <p className="text-gray-500 text-[12px]">
              {date ? date.slice(0, 10) : ''}
            </p>{' '}
          </div>
          <h1
            onClick={() => navigate(`/${forumID}/${_id}`)}
            className="text-[1.2rem] font-bold text-gray-300"
          >
            {title}
          </h1>
        </div>

        <div
          className="   w-[100%] flex items-center justify-center"
          onClick={() => navigate(`/${forumID}/${_id}`)}
        >
          {' '}
          {realPhoto ? (
            <img
              onClick={() => navigate(`/${forumID}/${_id}`)}
              className={style.img}
              src={String(realPhoto)}
            />
          ) : (
            <p
              onClick={() => navigate(`/${forumID}/${_id}`)}
              className="w-[90%]   break-all  text-start "
            >
              {post}
            </p>
          )}
        </div>
      </section>
    </div>
  )
}

export default PostsComponentCard
