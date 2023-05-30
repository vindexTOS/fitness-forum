import React, { FC, useState } from 'react'
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti'
import { BsThreeDots } from 'react-icons/bs'
import SettingButtons from './SettingButtons'
import { useSelector } from 'react-redux'

type UpVoteType = {
  _id: string
  userID: string
  upVoteColor: (
    arrowColor: string,
    arrowColor2: string,
    defaultColor: string,
  ) => string | undefined
  downVote: () => void
  upVote: () => void
  voteNum: number
  upvote: number
}

const UpVote: FC<UpVoteType> = ({
  _id,
  userID,
  upVoteColor,
  downVote,
  upVote,
  voteNum,
}) => {
  const style = {
    raiting: ` h-[100%] w-[30px] absolute bg-[#262525] rounded-t-[5px] rounded-b-[5px] flex flex-col items-center py-2`,
    btn: `flex flex-col items-center py-2`,
    icon: `text-[1.6rem] text-gray-500`,
  }
  const [dropDown, setDropDown] = useState<boolean>(false)

  return (
    <div className={style.raiting}>
      <BsThreeDots title="setting" onClick={() => setDropDown(!dropDown)} />
      {dropDown && <SettingButtons _id={_id} userID={userID} />}
      <div className={style.btn}>
        <TiArrowSortedUp
          style={{ color: upVoteColor('green', 'gray', 'gray') }}
          onClick={() => upVote()}
          className={style.icon}
        />
        {voteNum}
        <TiArrowSortedDown
          style={{ color: upVoteColor('gray', 'red', 'gray') }}
          onClick={() => downVote()}
          className={style.icon}
        />
      </div>
    </div>
  )
}

export default UpVote
