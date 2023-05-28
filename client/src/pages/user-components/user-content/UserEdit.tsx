import React, { useState, useEffect } from 'react'
import { UpdateUser } from '../../../redux/features/async-thunk/UserDataThunk'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { useNavigate, useParams } from 'react-router-dom'
import { useMainContext } from '../../../context'
import { FireBasePhotoThunk } from '../../../redux/features/async-thunk/FireStoreThunks/ProfilePhotoThunk'
const UserEdit = () => {
  const { imgUploadDrag, imgUpload, image } = useMainContext()
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const navigate = useNavigate()
  const { userID } = useParams()
  const user = useSelector((state: any) => state.LoginReducer.data)
  if (user && user.user) {
    const url = useSelector((state: any) => state.FireBasePhotoReducer.url)
    const { _id, name, avatar } = user.user
    const [valueName, setValueName] = useState<string>(name)

    const [valueAvatar, setValueAvatar] = useState<string>(avatar)
    const style = {
      mainDiv: `w-[100%] h-[100vh] flex-col flex items-center justify-center gap-3`,
      btn: `relative  max_smm:w-[90%]  w-[250px] flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-[#cf1b4e] group-hover:from-purple-500 group-hover:to-[#cf1b4e] hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800`,
      btnSpan: `relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 w-[99%]`,
    }
    const EditUser = async () => {
      const obj = { name: valueName, avatar: valueAvatar }

      if (image) {
        await dispatch(FireBasePhotoThunk({ image, dispatch }))
        setValueAvatar(url)
        navigate('/home')
      } else {
        if (userID) {
          dispatch(UpdateUser({ userID, obj }))
          navigate('/home')
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
        {/* <button onClick={() => console.log(url)}>ONcli</button> */}

        <label
          onDrop={(e) => imgUploadDrag(e)}
          className="text-[2rem] h-[2.2rem]   flex-col  items-center justify-center text-gray-400   cursor-pointer w-[250px]  h-[300px] rounded-[6px] flex "
          htmlFor="photo"
        >
          <img
            className="w-[250px] h-[250px] rounded-t-[9px]"
            src={valueAvatar}
          />

          <input
            onChange={(e) => imgUpload(e)}
            id="photo"
            className=" block w-full text-sm  text-[#ec2b58]  boxshaddow  border border-gray-300 rounded-lg cursor-pointer   bg-[#2e2d2d] dark:text-gray-400 focus:outline-none bg-[#2e2d2d]   dark:border-gray-600 dark:placeholder-gray-400"
            type="file"
          />
        </label>
        <div className="w-[250px]  bg-gray-300 flex items-center justify-around h-[2.4rem] rounded-[9px] py-1">
          <p>Name:</p>
          <div className="w-[1px] h-[80%] bg-gray-400/50"></div>
          <input
            className="bg-transparent outline-none "
            value={valueName}
            type="text"
            onChange={(e) => setValueName(e.target.value)}
          />
        </div>
        <button onClick={() => EditUser()} className={style.btn}>
          <span className={style.btnSpan}>Save Changes</span>
        </button>
      </div>
    )
  } else {
    return <div>No user</div>
  }
}

export default UserEdit
