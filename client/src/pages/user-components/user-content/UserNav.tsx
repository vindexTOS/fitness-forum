import React, { FC } from 'react'
import { AiOutlineStar } from 'react-icons/ai'
import { MdOutlineDateRange } from 'react-icons/md'
type UserNavProps = {
  user: {
    name: string
    avatar: string
    date?: string
    description: string
  }
  userDataLength: number
}
const UserNav: FC<UserNavProps> = ({ user, userDataLength }) => {
  const { name, avatar, date, description } = user

  const style = {
    nav: `bg-[#383737] w-[300px] h-[470px]  max-h-[1200px] flex max_xml:absolute  max_xml:w-[70%]  max_smm:w-[95%] flex-col items-center py-5  gap-20 rounded-[9px] boxshaddow`,
    img: ` w-[200px] h-[200px] rounded-[50%] `,
    profileDiv: `flex flex-col items-center justify-center gap-2`,
    nameHeader: `text-gray-400 text-[1.4rem]`,
    karmaAndDateDiv: `flex justify-around w-[90%]`,
    p: `text-gray-200 break-words	 `,
  }
  return (
    <nav className={style.nav}>
      <div className={style.profileDiv}>
        <img className={style.img} src={avatar} />
        <h1 className={style.nameHeader}>{name}</h1>
        <p className={style.p}>{description}</p>
      </div>
      <div className={style.karmaAndDateDiv}>
        <div>
          <p className="text-gray-400 ">XP</p>
          <p className="text-gray-500 flex items-center justify-center gap-1">
            {' '}
            <AiOutlineStar />
            {Number(userDataLength) * 43}
          </p>
        </div>
        <div>
          <p className="text-gray-400 ">Protein Day</p>
          <p className="text-gray-500 flex items-center justify-center gap-1">
            <MdOutlineDateRange />
            {date ? date : '2023/5/19'}
          </p>
        </div>
      </div>
    </nav>
  )
}

export default UserNav
