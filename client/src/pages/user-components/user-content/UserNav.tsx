import React, { FC } from 'react'
import { AiOutlineStar } from 'react-icons/ai'
import { MdOutlineDateRange } from 'react-icons/md'
import { DescriptionType } from '../../../redux/features/async-thunk/Register'
import { useMainContext } from '../../../context'
import DefaultUser from '../../../assets/default-user.webp'
type UserNavProps = {
  user: {
    name: string
    avatar: string
    date?: string
    description: DescriptionType
  }
  userDataLength: number
}
const UserNav: FC<UserNavProps> = ({ user, userDataLength }) => {
  const { userEditState } = useMainContext()
  const { date, name, avatar, description } = user
  const { about, bench, deadlift, squat } = description

  const style = {
    nav: `bg-[#383737] w-[300px]   max-h-[600px] flex max_xml:absolute  max_xml:w-[70%]  max_smm:w-[95%] flex-col items-center py-5  gap-20 rounded-[9px] boxshaddow`,
    img: ` w-[200px] h-[200px] rounded-[50%] `,
    profileDiv: `flex flex-col items-center justify-center gap-2`,
    nameHeader: `text-gray-400 text-[1.4rem]`,
    karmaAndDateDiv: `flex justify-around w-[90%]`,
    p: `text-gray-200 break-words	 `,
  }
  return (
    <nav className={style.nav} onClick={() => console.log(user)}>
      <div className={style.profileDiv}>
        <img className={style.img} src={avatar ? avatar : DefaultUser} />
        <h1 className={style.nameHeader}>{name}</h1>
        <p className={style.p}>{about}</p>
        <ul
          className={
            'max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400'
          }
        >
          <li>Bench {bench}Kg</li>
          <li>Deadlift {deadlift}Kg</li>
          <li>squat{squat}Kg</li>
        </ul>
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
