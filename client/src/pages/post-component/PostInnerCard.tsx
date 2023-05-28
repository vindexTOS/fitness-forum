import React, { FC, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { ThunkDispatch } from '@reduxjs/toolkit'
import { UpVoteThunk } from '../../redux/features/async-thunk/UpVoteDownVoteThunks'
import UpVote from './Post-Card/UpVote'

type PostsComponentCardType = {
  _id: string
  forumID?: string
  photo: null | any
  post: string
  userID: string
  date?: string
  title: string
  name: string
  upvote: number
}
type DataInterFace = {
  data: PostsComponentCardType
}
const PostInnerCard: FC<DataInterFace> = ({ data }) => {
  const { _id, forumID, photo, post, userID, title, name, date, upvote } = data
  const realPhoto = photo !== 'No Photo' && photo
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const navigate = useNavigate()
  const style = {
    mainDiv: `w-[80%]  max_smm:w-[100%] relative rounded-[5px] bg-[#212121]       flex  cursor-pointer      text-white`,
    headerDiv: `flex flex-col items-start w-[100%] `,
    mainContent: `flex flex-col items-center  justify-center w-[100%] px-10 p-6 `,
    img: `h-[400px] max-w-[80%] `,
    raiting: ` h-[100%] w-[30px] absolute bg-[#262525] rounded-t-[5px] rounded-b-[5px]`,
    btn: `flex flex-col items-center py-2`,
    icon: `text-[1.6rem] text-gray-500`,
  }

  const userVotes = useSelector((state: any) => state.GeneralReducer.votesData)
  const votePostID = userVotes?.voteData?.find(
    (val: any) => val.postID === String(_id),
  )

  // faking actual number so we can reduce server requests for voting number
  // changing color based on return value , for now we fake the UI result so we dont make bunch of unessasary requests to server
  // after user reloads page himself true data will be retraved from the server
  const [userRatedPost, setUserRatedPost] = useState<string>(
    String(votePostID?.Votes[0]?.voteType),
  )
  const [voteNum, setVoteNum] = useState<number>(upvote)

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
  const userLogin = useSelector((state: any) => state.LoginReducer.data)

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
  return (
    <div className={style.mainDiv}>
      <div className={style.raiting}>
        <div className={style.btn}>
          <UpVote
            _id={_id}
            userID={userID}
            downVote={downVote}
            upVoteColor={upVoteColor}
            upVote={upVote}
            voteNum={voteNum}
          />
        </div>
      </div>
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
            <p className="text-gray-400">
              Posted by{' '}
              <span
                className="text-pink-600 hover:underline hoveR:text-pink-700"
                onClick={() => navigate(`/user/${userID}`)}
              >
                {name ? name : 'User '}
              </span>
            </p>
            <p className="text-[10px] text-gray-500">
              {date ? date.slice(0, 10) : 'long time ago'}
            </p>
          </div>
          <h1 className="text-[1.2rem] font-bold text-gray-300">{title}</h1>
        </div>

        {realPhoto && <img className={style.img} src={String(realPhoto)} />}

        <p className="w-[90%]  max_smm:w-[100%]  max_smm:text-center  break-words  text-start ">
          {post}
        </p>
      </section>
    </div>
  )
}

export default PostInnerCard
