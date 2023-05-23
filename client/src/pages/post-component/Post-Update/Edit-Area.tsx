import React, { FC, useEffect } from 'react'
import { BsTrash3 } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { UpdatePost } from '../../../redux/features/async-thunk/DeleteAndUpdatePostThunk'
import { ThunkDispatch } from '@reduxjs/toolkit'
type EditPostType = {
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
  data: EditPostType
}
const EditPost: FC<DataInterFace> = ({ data }) => {
  const { _id, forumID, photo, post, userID, title, name, date } = data
  const realPhoto = photo !== 'No Photo' && photo
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const style = {
    mainDiv: `w-[80%]  relative rounded-[5px] bg-[#212121]  mt-60      flex  cursor-pointer      text-white`,
    headerDiv: `flex flex-col items-start w-[100%] `,
    mainContent: `flex flex-col items-center  justify-center w-[100%] px-10 p-6 gap-10`,
    img: `h-[400px] max-w-[80%] `,
    raiting: ` h-[100%] w-[30px] absolute bg-[#262525] rounded-t-[5px] rounded-b-[5px]`,
    btn: `flex flex-col items-center py-2`,
    icon: `text-[1.6rem] text-gray-500`,
  }
  const [valueTitle, setValueTitle] = React.useState<string>(title)
  const [valuePost, setValuePost] = React.useState<string>(post)
  const [valuePhotoUrl, setValuePhotoUrl] = React.useState<string>(realPhoto)

  const EditPost = async () => {
    const data = {
      title: valueTitle,
      post: `${valuePost} ~ Edited`,
      date: new Date(),
    }
    await dispatch(UpdatePost({ id: _id || '', update: data }))
  }
  return (
    <div className={style.mainDiv}>
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
          <input
            value={valueTitle}
            onChange={(e) => setValueTitle(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        {realPhoto && (
          <div className="flex items-center justify-center">
            <BsTrash3
              onClick={() => setValuePhotoUrl('')}
              className="absolute text-[4rem] text-red-600 hover:text-red-700"
            />
            <img className={style.img} src={String(valuePhotoUrl)} />
          </div>
        )}

        <textarea
          onChange={(e) => setValuePost(e.target.value)}
          className="bg-gray-50 h-[300px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {valuePost}
        </textarea>
        <button
          className=" inline-block rounded bg-green-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
          onClick={() => EditPost()}
        >
          Edit
        </button>
      </section>
    </div>
  )
}

export default EditPost
