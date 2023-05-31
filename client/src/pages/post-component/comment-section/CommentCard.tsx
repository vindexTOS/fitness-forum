import React, { FC, useState } from 'react'
import { CommentType } from './CommentsSection'
import { useDispatch } from 'react-redux'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import useOutClick from '../../../Hooks/useOutClick'
import {
  DeleteCommentThunk,
  GetCommentThunk,
  UpdateCommentThunk,
} from '../../../redux/features/async-thunk/CommentThunk'
import { ThunkDispatch } from '@reduxjs/toolkit'
import CommentReplyComponent from './CommentReplyComponent'
import { useSelector } from 'react-redux'
import Replies from './Replies'
import { useNavigate } from 'react-router-dom'
import { useMainContext } from '../../../context'
type DataType = {
  data: CommentType
}
const CommentCard: FC<DataType> = ({ data }) => {
  // const { replyDrop, setReplyDrop } = useMainContext()
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const [replyDrop, setReplyDrop] = React.useState<boolean>(false)

  const [dropDown, setDropDown] = React.useState<boolean>(false)
  const [edit, setEdit] = React.useState<boolean>(false)

  const dropDownRef = React.useRef<HTMLDivElement | null>(null)

  const handleDropDownCancle = () => {
    setDropDown(false)
    setReplyDrop(false)
    setEdit(false)
  }

  useOutClick(dropDownRef, handleDropDownCancle)
  const style = {
    commentDiv: `bg-[#363434] py-5 flex flex-col p-4 rounded-[5px] gap-2     relative`,
    nameDiv: `flex max_smm:flex-col items-start  gap-5 py-5  max_smm:px-10 bg-[#262525] px-5 max_smm:px-0  rounded-[8px]`,
    img: `w-[50px] h-[50px] rounded-[10%]`,
  }
  if (data) {
    const loggedINUserData = useSelector(
      (state: any) => state.LoginReducer.data,
    )
    const { comment, userID, postID, date, _id } = data
    const { name, avatar } = data?.user
    const userLogin = useSelector((state: any) => state.LoginReducer.data)

    const [editComment, setEdditComment] = React.useState<string>(comment)
    const navigate = useNavigate()
    const deleteData = async () => {
      await dispatch(DeleteCommentThunk(_id))
      dispatch(GetCommentThunk({ dispatch, postID, pages: '1' }))
    }
    const [popUp, setPopUp] = useState<boolean>(false)
    const SettingButtons = ({ _id }: { _id: string }) => {
      return (
        <div className="absolute w-[100px] max-h-[100px]  top-10 bg-[#262525] outline outline-[1px] outline-[#363434]  rounded-[10px] flex flex-col items-center   p-2">
          <button onClick={() => setEdit(!edit)}>Edit</button>
          <button onClick={() => setPopUp(!popUp)}>Delete</button>
        </div>
      )
    }
    const PopUpDelete = () => {
      const s = {
        redBtn: `text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`,
        greenBtn: `text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`,
      }
      return (
        <div className="w-[90%] h-[200px] bg-[#262525] absolute flex flex-col items-center justify-around  right-10  top-[40%] rounded-[20px] boxshaddow  ">
          <p>Are You Sure You Want To Delete This Comment ?</p>
          <div className="flex gap-5">
            <button
              className={s.redBtn}
              onClick={() => {
                deleteData(), setDropDown(false)
              }}
            >
              Yes
            </button>
            <button
              className={s.greenBtn}
              onClick={() => {
                setPopUp(!popUp), setDropDown(false)
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )
    }
    const EditData = async () => {
      await dispatch(
        UpdateCommentThunk({
          commentID: _id,
          comment: `${editComment} ~ Edited`,
        }),
      )
      dispatch(GetCommentThunk({ dispatch, postID, pages: '1' }))
      setEdit(false)
    }
    return (
      <div className={style.commentDiv}>
        {popUp && <PopUpDelete />}
        <div className="w-[100%] flex items-end justify-end">
          <BiDotsVerticalRounded
            onClick={() => setDropDown(!dropDown)}
            className="cursor-pointer"
          />
          {dropDown && <SettingButtons _id={_id} />}{' '}
        </div>

        <div className={style.nameDiv}>
          <div
            className="flex flex-col items-center  gap-2"
            onClick={() => navigate(`/user/${userID}`)}
          >
            <img className={style.img} src={avatar} />
            <h1>{name}</h1>
          </div>

          <div className="w-[100%] flex  max_smm:items-center justify-center flex-col">
            {!edit ? (
              <p className="px-10 max_smm:px-0 max_smm:text-[12px] break-words max_smm:w-[110%]     max_smm:text-center py-4 rounded-[8px] ">
                {comment}
              </p>
            ) : (
              <div className="w-[90%] ">
                <textarea
                  className="px-10  bg-gray-800 outline-none  w-[700px]  max_smm:w-[100%]  max_smm:h-[100%]  max_smm:px-0 max_smm:text-[12px]   py-4 rounded-[8px] "
                  onChange={(e) => setEdditComment(e.target.value)}
                  value={editComment}
                ></textarea>
                <button onClick={() => EditData()}>Edit</button>
              </div>
            )}
            <p onClick={() => console.log(name)} className="text-[10px]">
              {date.slice(0, 10)}
            </p>
          </div>
        </div>
        {!userLogin?.user?.name ? (
          <h1
            onClick={() => navigate('/login')}
            className={`text-end cursor-pointer  `}
          >
            Log-in to reply
          </h1>
        ) : (
          <h1
            onClick={() => setReplyDrop(!replyDrop)}
            className={`text-end cursor-pointer  `}
          >
            replay
          </h1>
        )}

        {replyDrop && (
          <CommentReplyComponent
            name={loggedINUserData.user.name}
            avatar={loggedINUserData.user.avatar}
            loggedINUserId={loggedINUserData.user._id}
            commentUser={name}
            rootCommentID={_id}
            postID={postID}
            setReplyDrop={setReplyDrop}
            userID={userID}
          />
        )}
        {/* <h2 onClick={() => console.log(userData)}>On click</h2> */}
        {data?.reply.map((val: any) => {
          return <Replies key={val._id} replyData={val} />
        })}
      </div>
    )
  } else {
    return <div>loading</div>
  }
}

export default CommentCard
