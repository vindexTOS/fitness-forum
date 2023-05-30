import React, { useState, useEffect } from 'react'
import { UpdateUser } from '../../../redux/features/async-thunk/UserDataThunk'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { useNavigate, useParams } from 'react-router-dom'
import { useMainContext } from '../../../context'
import { FireBasePhotoThunk } from '../../../redux/features/async-thunk/FireStoreThunks/ProfilePhotoThunk'
import { getBench } from '../../../redux/features/slice/RegisterSlice'
import DefaultUser from '../../../assets/default-user.webp'
const UserEdit = () => {
  const {
    imgUploadDrag,
    imgUpload,
    image,

    userEditState,
    userEditDispatch,
  } = useMainContext()
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const navigate = useNavigate()
  const { userID } = useParams()
  const url = useSelector((state: any) => state.FireBasePhotoReducer.url)
  const user = useSelector((state: any) => state.LoginReducer.data)

  if (user && user.user && user.user.description) {
    const style = {
      mainDiv: `w-[100%] h-[100vh]  max_sm8:flex-col max_sm8:pb-20  max_sm8:pt-40 flex items-center justify-center gap-3`,
      btn: `relative  max_sm8:ml-4 max_smm:w-[90%]  w-[100%] flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-[#cf1b4e] group-hover:from-purple-500 group-hover:to-[#cf1b4e] hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800`,
      btnSpan: `relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 w-[100%]`,
      m: `bg-[#2e2d2d]  max_sm8:w-[90%]  max_smm1:flex flex-col max_smm1:gap-2   w-[50%] h-[300px] max_smm1:h-[500px] rounded-[5px]  `,
      t: `bg-[#2e2d2d] text-[#ec2b58] w-[100%]   max_sm8:h-[300px]  h-[100%] outline outline-[1px] outline-[#ec2b58] boxshaddow rounded-[5px] p-2 `,
      input: `flex items-center bg-[#2e2d2d]   max_XL3:w-[100%] text-white justify-around w-[20rem] h-[2.2rem] rounded-[5px] boxshaddow`,
    }
    // dispatch(getBench(bench))

    const EditUser = async () => {
      let description = {
        about: userEditState.about,
        bench: userEditState.bench,
        squat: userEditState.squat,
        deadlift: userEditState.deadlift,
      }
      const obj = {
        name: userEditState.name,
        avatar: userEditState.avatar,
        description: description,
      }

      if (image) {
        await dispatch(FireBasePhotoThunk({ image, dispatch }))

        userEditDispatch({ type: 'edit-avatar', payload: url })
        navigate('/home')

        const obj = { name: userEditState.name, avatar: url, description }
        if (userID && url) {
          dispatch(UpdateUser({ userID, obj }))
        }
      } else {
        if (userID) {
          dispatch(UpdateUser({ userID, obj }))
          navigate('/home')
        }
      }
    }

    return (
      <div className={style.mainDiv} onClick={() => console.log()}>
        {/* <button onClick={() => console.log(url)}>ONcli</button> */}
        <div className="flex flex-col items-center justify-center mt-5 ">
          <label
            onDrop={(e) => imgUploadDrag(e)}
            className="text-[2rem] h-[2.2rem]   flex-col  items-center justify-center text-gray-400   cursor-pointer w-[250px]  h-[300px] rounded-[6px] flex "
            htmlFor="photo"
          >
            <img
              className="w-[250px] h-[250px] rounded-t-[9px]"
              src={userEditState.avatar ? userEditState.avatar : DefaultUser}
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
              value={userEditState.name}
              type="text"
              onChange={(e) =>
                userEditDispatch({ type: 'edit-name', payload: e.target.value })
              }
            />
          </div>{' '}
        </div>{' '}
        <div className={style.m}>
          <textarea
            value={userEditState.about}
            onChange={(e) =>
              userEditDispatch({ type: 'edit-about', payload: e.target.value })
            }
            placeholder="Add description about yourself "
            className={style.t}
          ></textarea>
          <div className="flex justify-between   max_XL3:flex-col items-center justify-center gap-2">
            <label className="text-white">Bench</label>
            <input
              className={style.input}
              type="number"
              value={userEditState.bench}
              placeholder="Bench press"
              onChange={(e) =>
                userEditDispatch({
                  type: 'edit-bench',
                  payload: e.target.value,
                })
              }
            />
            <label className="text-white">Squat</label>
            <input
              className={style.input}
              type="number"
              value={userEditState.squat}
              placeholder="Squat"
              onChange={(e) =>
                userEditDispatch({
                  type: 'edit-squat',
                  payload: e.target.value,
                })
              }
            />
            <label className="text-white">Deadlift</label>
            <input
              className={style.input}
              type="number"
              value={userEditState.deadlift}
              placeholder="Deadlift"
              onChange={(e) =>
                userEditDispatch({
                  type: 'edit-deadlift',
                  payload: e.target.value,
                })
              }
            />
          </div>
          <button onClick={() => EditUser()} className={style.btn}>
            <span className={style.btnSpan}>Save Changes</span>
          </button>
        </div>
      </div>
    )
  } else {
    return <div>No user</div>
  }
}

export default UserEdit
