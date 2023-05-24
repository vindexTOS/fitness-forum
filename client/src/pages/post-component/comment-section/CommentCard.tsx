import React, { FC } from 'react'
import { CommentType } from './CommentsSection'
import { useDispatch } from 'react-redux'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import useOutClick from '../../../Hooks/useOutClick'
import { DeleteCommentThunk } from '../../../redux/features/async-thunk/CommentThunk'
import { ThunkDispatch } from '@reduxjs/toolkit'
type DataType = {
  data: CommentType
}
const CommentCard: FC<DataType> = ({ data }) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const SettingButtons = ({ _id }: { _id: string }) => {
    return (
      <div className="absolute w-[100px] max-h-[100px]  top-10 bg-[#262525] outline outline-[1px] outline-[#363434]  rounded-[10px] flex flex-col items-center   p-2">
        <button>Edit</button>
        <button onClick={() => dispatch(DeleteCommentThunk(_id))}>
          Delete
        </button>
      </div>
    )
  }

  const [dropDown, setDropDown] = React.useState<boolean>(false)
  const dropDownRef = React.useRef<HTMLDivElement | null>(null)

  const handleDropDownCancle = () => {
    setDropDown(false)
  }

  useOutClick(dropDownRef, handleDropDownCancle)
  const style = {
    commentDiv: `bg-[#363434] py-5 flex flex-col p-4 rounded-[5px] gap-2  relative`,
    nameDiv: `flex items-center gap-5 py-5 bg-[#262525] px-5 rounded-[8px]`,
    img: `w-[50px] h-[50px] rounded-[10%]`,
  }
  if (data) {
    const { comment, userID, postID, date, _id } = data
    const { name, avatar } = data?.user
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
            <p className="px-10   py-4 rounded-[8px] ">{comment}</p>
            <p className="text-[10px]">{date.slice(0, 16)}</p>
          </div>
        </div>
        {/* <h2 onClick={() => console.log(userData)}>On click</h2> */}
      </div>
    )
  } else {
    return <div>loading</div>
  }
}

export default CommentCard
