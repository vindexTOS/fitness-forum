import { useDispatch, useSelector } from 'react-redux'
import { DeletePost } from '../../../redux/features/async-thunk/DeleteAndUpdatePostThunk'
import { useNavigate } from 'react-router-dom'
import { ThunkDispatch } from '@reduxjs/toolkit'

const SettingButtons = ({ _id, userID }: { _id: string; userID: string }) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const userData = useSelector((state: any) => state.GeneralReducer.userData)
  const userVotes = useSelector((state: any) => state.GeneralReducer.votesData)

  const userLogin = useSelector((state: any) => state.LoginReducer.data)
  const user = userData && userData.find((val: any) => val._id === userID)
  const votePostID = userVotes?.voteData?.find(
    (val: any) => val.postID === String(_id),
  )

  const navigate = useNavigate()
  if (userLogin && userLogin.user && userLogin.user._id && _id) {
    return (
      <div className="absolute w-[100px] h-[100px] mt-5 ml-20 bg-[#262525] boxshaddow rounded-[10px] flex flex-col items-start   p-2">
        <button>Shear</button>
        <button onClick={() => navigate(`/edit-post/${_id}`)}>Edit</button>
        {userLogin.user._id === user._id && (
          <button
            onClick={() =>
              dispatch(
                DeletePost({ id: _id || '', voteID: String(votePostID._id) }),
              )
            }
          >
            Delete
          </button>
        )}
      </div>
    )
  } else {
    return (
      <div className="absolute w-[100px] h-[100px] mt-5 ml-20 bg-[#262525] boxshaddow rounded-[10px] flex flex-col items-start   p-2">
        <button>Shear</button>
      </div>
    )
  }
}

export default SettingButtons
