import React, { FC, useEffect } from 'react'
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { getCookies } from '../../redux/features/slice/LoginSlice'

type PostsComponentCardType = {
  _id?: string
  forumID?: string
  photo: null | any
  post: string
  userID?: string
  date?: string
  title: string
  name: string
}
type DataInterFace = {
  data: PostsComponentCardType
}
const PostInnerCard: FC<DataInterFace> = ({ data }) => {
  const { _id, forumID, photo, post, userID, title, name, date } = data
  const realPhoto = photo !== 'No Photo' && photo

  const style = {
    mainDiv: `w-[80%]  relative rounded-[5px] bg-[#212121]       flex  cursor-pointer      text-white`,
    headerDiv: `flex flex-col items-start w-[100%] `,
    mainContent: `flex flex-col items-center  justify-center w-[100%] px-10 p-6 `,
    img: `h-[400px] max-w-[80%] `,
    raiting: ` h-[100%] w-[30px] absolute bg-[#262525] rounded-t-[5px] rounded-b-[5px]`,
    btn: `flex flex-col items-center py-2`,
    icon: `text-[1.6rem] text-gray-500`,
  }
  return (
    <div className={style.mainDiv}>
      <div className={style.raiting}>
        <div className={style.btn}>
          <TiArrowSortedUp className={style.icon} />
          <TiArrowSortedDown className={style.icon} />
        </div>
      </div>
      <section className={style.mainContent}>
        <div className={style.headerDiv}>
          <div className="flex  items-center justify-center gap-2">
            <Link
              to={`/threads/${forumID}/page/1`}
              className="text-gray-300 text-[1rem]"
            >
              <span className="text-[#ec2b58]">thread/</span>
              <span className="hover:underline hover:text-blue-400">
                {forumID}
              </span>
            </Link>
            <p className="text-gray-400">Posted by {name}</p>
            <p className="text-[10px] text-gray-500">
              {date ? date.slice(0, 10) : 'long time ago'}
            </p>
          </div>
          <h1 className="text-[1.2rem] font-bold text-gray-300">{title}</h1>
        </div>

        {realPhoto && <img className={style.img} src={String(realPhoto)} />}

        <p className="w-[90%]   break-all  text-start ">{post}</p>
      </section>
    </div>
  )
}

export default PostInnerCard
