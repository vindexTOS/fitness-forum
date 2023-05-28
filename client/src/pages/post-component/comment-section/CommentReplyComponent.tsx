import React, { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Addreply,
  GetCommentThunk,
} from '../../../redux/features/async-thunk/CommentThunk'
import { ThunkDispatch } from '@reduxjs/toolkit'
type loggedUserType = {
  avatar: string
  name: string
  loggedINUserId: string
  commentUser: string
  rootCommentID: string
  postID: string
  setReplyDrop: React.Dispatch<React.SetStateAction<boolean>>
}

const CommentReplyComponent: FC<loggedUserType> = ({
  avatar,
  name,
  loggedINUserId,
  commentUser,
  rootCommentID,
  postID,
  setReplyDrop,
}) => {
  const style = {
    mainDiv: `w-[100%] h-[150px]   max_smm:flex-col  max_smm:h-[300px] bg-[#232323] p-5 gap-4 flex items-end  rounded-[5px] boxshaddow`,
    btn: `  text-white bg-gradient-to-r from-[#cf1b4e] via-[#cf1b4e] to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm    text-center w-[9rem] h-[2rem] `,
  }
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const [replyComment, setReplyComment] = useState<string>('')
  const [zoomTextArea, setZoomTextArea] = useState<boolean>(false)
  const replyHanndler = async () => {
    if (replyComment) {
      await dispatch(
        Addreply({
          replyID: rootCommentID,
          reply: { reply: [{ comment: replyComment, userID: loggedINUserId }] },
        }),
      )
      dispatch(GetCommentThunk({ dispatch, postID, pages: '1' }))
      setReplyDrop(false)
    }
  }
  if (name && avatar) {
    return (
      <div className={style.mainDiv}>
        <div className="flex flex-col w-[10%]  max_smm:flex-row  max_smm:w-[90%]  items-center  gap-4">
          {/* <img src={avatar} className="w-[50px] h-[50px] rounded-[10px]" /> */}

          <p className="text-[12px] w-[6rem]">
            Reply as <span>{name}</span>
          </p>
        </div>
        <textarea
          onClick={() => setZoomTextArea(!zoomTextArea)}
          onChange={(e) => setReplyComment(e.target.value)}
          placeholder={`reply to ${commentUser}`}
          className={`px-10 h-[100px] bg-gray-800 outline-none  w-[80%]  max_smm:w-[100%]  py-4 rounded-[8px] ${
            zoomTextArea &&
            ` max_smm:h-[300px] max_smm:absolute max_smm:right-1 bottom-60  max_smm:w-[100%]`
          }`}
          //   onChange={(e) => setEdditComment(e.target.value)}
        ></textarea>
        <button className={style.btn} onClick={() => replyHanndler()}>
          Comment
        </button>
      </div>
    )
  } else {
    return <div>no</div>
  }
}

export default CommentReplyComponent
