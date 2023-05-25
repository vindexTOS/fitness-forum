import React, { FC } from 'react'
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
type DataType = {
  data: CommentType
}
const CommentCard: FC<DataType> = ({ data }) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

  const [dropDown, setDropDown] = React.useState<boolean>(false)
  const [replyDrop, setReplyDrop] = React.useState<boolean>(false)
  const dropDownRef = React.useRef<HTMLDivElement | null>(null)

  const handleDropDownCancle = () => {
    setDropDown(false)
    setReplyDrop(false)
  }

  useOutClick(dropDownRef, handleDropDownCancle)
  const style = {
    commentDiv: `bg-[#363434] py-5 flex flex-col p-4 rounded-[5px] gap-2  relative`,
    nameDiv: `flex items-center gap-5 py-5 bg-[#262525] px-5 rounded-[8px]`,
    img: `w-[50px] h-[50px] rounded-[10%]`,
  }
  if (data) {
    const loggedINUserData = useSelector(
      (state: any) => state.LoginReducer.data,
    )
    const [edit, setEdit] = React.useState<boolean>(false)
    const { comment, userID, postID, date, _id } = data
    const { name, avatar } = data?.user
    const [editComment, setEdditComment] = React.useState<string>(comment)

    const deleteData = async () => {
      await dispatch(DeleteCommentThunk(_id))
      dispatch(GetCommentThunk({ dispatch, postID, pages: '1' }))
    }

    const SettingButtons = ({ _id }: { _id: string }) => {
      return (
        <div className="absolute w-[100px] max-h-[100px]  top-10 bg-[#262525] outline outline-[1px] outline-[#363434]  rounded-[10px] flex flex-col items-center   p-2">
          <button onClick={() => setEdit(!edit)}>Edit</button>
          <button onClick={() => deleteData()}>Delete</button>
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
      <div ref={dropDownRef} className={style.commentDiv}>
        <div className="w-[100%] flex items-end justify-end">
          <BiDotsVerticalRounded
            onClick={() => setDropDown(!dropDown)}
            className="cursor-pointer"
          />
          {dropDown && <SettingButtons _id={_id} />}{' '}
        </div>

        <div className={style.nameDiv}>
          <div className="flex flex-col items-center gap-2  ">
            <img className={style.img} src={avatar} />
            <h1>{name}</h1>
          </div>

          <div>
            {!edit ? (
              <p className="px-10   py-4 rounded-[8px] ">{comment}</p>
            ) : (
              <div>
                <textarea
                  className="px-10  bg-gray-800 outline-none  w-[700px]   py-4 rounded-[8px] "
                  onChange={(e) => setEdditComment(e.target.value)}
                  value={editComment}
                ></textarea>
                <button onClick={() => EditData()}>Edit</button>
              </div>
            )}
            <p className="text-[10px]">{date.slice(0, 16)}</p>
          </div>
        </div>
        <h1
          onClick={() => setReplyDrop(!replyDrop)}
          className="text-end cursor-pointer"
        >
          replay
        </h1>
        {replyDrop && (
          <CommentReplyComponent
            name={loggedINUserData.user.name}
            avatar={loggedINUserData.user.avatar}
            loggedINUserId={loggedINUserData.user._id}
            commentUser={name}
            rootCommentID={_id}
            postID={postID}
            setReplyDrop={setReplyDrop}
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
