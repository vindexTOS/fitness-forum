import React, { FC, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PostTopInfo from './PostTopInfo'
import UpVote from './UpVote'
import PostBottomInfo from './PostBottomInfo'
import ImgOrParagraph from './ImgOrParagraph'
import { ThunkDispatch } from '@reduxjs/toolkit'
import {
  UpVoteThunk,
  GetVotes,
} from '../../../redux/features/async-thunk/UpVoteDownVoteThunks'
export type PostsComponentCardType = {
  _id: string
  forumID?: string
  photo: null | any
  post: string
  userID: string
  date?: string
  title: string
  upvote: number
}
export type DataInterFace = {
  data: PostsComponentCardType
}
const PostsComponentCard: FC<DataInterFace> = ({ data }) => {
  const { _id, forumID, photo, post, userID, title, date, upvote } = data
  const navigate = useNavigate()
  const realPhoto = photo !== 'No Photo' && photo

  const userData = useSelector((state: any) => state.GeneralReducer.userData)
  const userVotes = useSelector((state: any) => state.GeneralReducer.votesData)
  const userLogin = useSelector((state: any) => state.LoginReducer.data)
  const user = userData && userData.find((val: any) => val._id === userID)
  //checking if user is author of the post
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const votePostID = userVotes?.voteData?.find(
    (val: any) => val.postID === String(_id),
  )

  // faking actual number so we can reduce server requests for voting number
  const [voteNum, setVoteNum] = useState<number>(upvote)
  // changing color based on return value , for now we fake the UI result so we dont make bunch of unessasary requests to server
  // after user reloads page himself true data will be retraved from the server
  const [userRatedPost, setUserRatedPost] = useState<string>(
    String(votePostID?.Votes[0]?.voteType),
  )
  const upVote = async () => {
    await dispatch(
      UpVoteThunk({
        id: _id,
        userID: userLogin.user._id,
        voteType: true,
        query: `upvote`,
      }),
    )
    setVoteNum(voteNum + 1)
    setUserRatedPost('true')
  }

  const downVote = async () => {
    await dispatch(
      UpVoteThunk({
        id: _id,
        userID: userLogin.user._id,
        voteType: false,
        query: `upvote`,
      }),
    )
    setVoteNum(voteNum - 1)
    setUserRatedPost('false')
  }

  // React.useEffect(() => {
  //   if (userLogin.user) {
  //     dispatch(GetVotes({ dispatch, userID: userLogin.user._id }))
  //   }
  //   setUserRatedPost(String(votePostID?.Votes[0]?.voteType))
  // }, [])

  const upVoteColor = (
    arrowColor: string,
    arrowColor2: string,
    defaultColor: string,
  ) => {
    if (userRatedPost === 'true') {
      return arrowColor
    } else if (userRatedPost === 'false') {
      return arrowColor2
    } else if (userRatedPost === 'undefiend') {
      return defaultColor
    }
  }

  const style = {
    mainDiv: `w-[100%] relative rounded-[5px] bg-[#212121]   outline outline-[1px] outline-gray-600 hover:outline-[#ec2b58] max-h-[600px]  max_smm:max-h-[1200px] flex  cursor-pointer      text-white`,
    headerDiv: `flex flex-col items-start w-[100%] `,
    mainContent: `flex flex-col items-center  justify-center w-[100%]  max_smm:gap-10    px-10 p-6 `,
    img: `h-[400px] max-w-[80%] `,

    btn: `flex flex-col items-center py-2`,
    icon: `text-[1.6rem] text-gray-500`,
    subInfo: ``,
  }

  return (
    <div onClick={() => console.log(votePostID)} className={style.mainDiv}>
      <UpVote
        _id={_id}
        userID={userID}
        downVote={downVote}
        upVoteColor={upVoteColor}
        upVote={upVote}
        voteNum={voteNum}
      />
      <section className={style.mainContent}>
        <PostTopInfo
          title={title}
          userID={userID}
          _id={_id}
          forumID={forumID}
          date={date}
        />
        <ImgOrParagraph
          realPhoto={realPhoto}
          post={post}
          forumID={forumID}
          _id={_id}
        />

        <PostBottomInfo postID={_id} forumID={forumID} _id={_id} />
      </section>
    </div>
  )
}

export default PostsComponentCard
