import React, { useState, useEffect } from 'react'
import { UpdateUser } from '../../../redux/features/async-thunk/UserDataThunk'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { useParams } from 'react-router-dom'
import { useMainContext } from '../../../context'
import { FireBasePhotoThunk } from '../../../redux/features/async-thunk/FireStoreThunks/ProfilePhotoThunk'
const UserEdit = () => {
  const { imgUploadDrag, imgUpload, image } = useMainContext()
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const { userID } = useParams()
  const user = useSelector((state: any) => state.LoginReducer.data)
  if (user && user.user) {
    const url = useSelector((state: any) => state.FireBasePhotoReducer.url)
    const { _id, name, avatar } = user.user
    const [valueName, setValueName] = useState<string>(name)

    const [valueAvatar, setValueAvatar] = useState<string>(avatar)
    const style = {
      mainDiv: `w-[100%] h-[100vh] flex-col flex items-center justify-center`,
    }
    const EditUser = async () => {
      const obj = { name: valueName, avatar: valueAvatar }

      if (image) {
        await dispatch(FireBasePhotoThunk({ image, dispatch }))
        setValueAvatar(url)
      } else {
        if (userID) {
          dispatch(UpdateUser({ userID, obj }))
        }
      }
    }
    useEffect(() => {
      const obj = { name: valueName, avatar: url }
      if (userID && url) {
        dispatch(UpdateUser({ userID, obj }))
      }
    }, [url])
    return (
      <div className={style.mainDiv}>
        <button onClick={() => console.log(url)}>ONcli</button>
        <input
          value={valueName}
          type="text"
          onChange={(e) => setValueName(e.target.value)}
        />
        <label
          onDrop={(e) => imgUploadDrag(e)}
          className="text-[2rem] h-[2.2rem]    items-center justify-center text-gray-400   cursor-pointer w-[20rem] rounded-[6px] flex "
          htmlFor="photo"
        >
          <input
            onChange={(e) => imgUpload(e)}
            id="photo"
            className=" block w-full text-sm  text-[#ec2b58]  boxshaddow  border border-gray-300 rounded-lg cursor-pointer   bg-[#2e2d2d] dark:text-gray-400 focus:outline-none bg-[#2e2d2d]   dark:border-gray-600 dark:placeholder-gray-400"
            type="file"
          />
        </label>
        <img src={valueAvatar} />
        <button onClick={() => EditUser()}>SAVE</button>
      </div>
    )
  } else {
    return <div>No user</div>
  }
}

export default UserEdit
