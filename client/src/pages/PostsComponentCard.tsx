import React, { FC } from 'react'
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti'
export type PostsComponentCardType = {
  _id: string
  forumID: string
  photo: string
  post: string
  userID: string

  title: string
}
type DataInterFace = {
  data: PostsComponentCardType
}
const PostsComponentCard: FC<DataInterFace> = ({ data }) => {
  const { _id, forumID, photo, post, userID, title } = data
  const style = {
    mainDiv: `w-[100%] relative rounded-[5px] bg-[#212121]   outline outline-[1px] outline-gray-600 hover:outline-[#ec2b58] max-h-[600px]  flex  cursor-pointer      text-white`,
    headerDiv: `flex flex-col items-start w-[100%] `,
    mainContent: `flex flex-col items-center jstify-center px-10 p-6 `,
    img: `h-[400px] w-[50%] `,
    raiting: ` h-[100%] w-[30px] absolute bg-[#262525] rounded-t-[5px] rounded-b-[5px]`,
    btn: `flex flex-col items-center py-2`,
    icon: `text-[1.6rem] text-gray-500`,
  }
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
          <p className="text-gray-400">Posted by {_id}</p>
          <h1 className="text-[1.2rem] font-bold text-gray-300">{title}</h1>
        </div>

        {photo ? <img className={style.img} src={photo} /> : <p>{post}</p>}
      </section>
    </div>
  )
}

export default PostsComponentCard
