import React, { FC, useState } from 'react'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
type ChoseThreadProp = {
  threads: string
  forumData: any
  setThreads: React.Dispatch<React.SetStateAction<string>>
}
const ChoseThreadComponent: FC<ChoseThreadProp> = ({
  threads,
  forumData,
  setThreads,
}) => {
  const [threadImg, setThreadImg] = useState<string>('')
  const [dropDown, setDropDown] = useState<boolean>(false)
  return (
    <div className="max_smm:w-[60%]">
      <div
        onClick={() => setDropDown(!dropDown)}
        className=" cursor-pointer text-white outline outline-[1px] outline-[#ec2b58] w-[16rem] max_smm:w-[100%]  items-center justify-center flex max_smm:p-1 gap-5 py-2 px-2 rounded-[10px]"
      >
        <img
          className="w-[30px]  h-[30px]  max_smm:w-[20px] max_smm:h-[20px] bg-yellow-300 rounded-[50%] "
          src={threadImg}
        />{' '}
        <p className="w-[9rem]   max_smm:text-[10px]">thread/{threads}</p>
        {!dropDown ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
      </div>
      {dropDown && (
        <div className=" cursor-pointer absolute bg-[#232323] gap-5 flex flex-col items-center justify-center  p-2 py-3 rounded-[10px] boxshaddow w-[16rem] ">
          {forumData.map((val: any) => (
            <div
              className="text-white flex items-center justify-center gap-2 w-[12rem]"
              onClick={() => {
                setThreads(String(val.forumID)),
                  setThreadImg(String(val.avatar))
              }}
              key={val._id}
            >
              <img
                src={val.avatar}
                className="w-[30px] h-[30px] bg-yellow-300 rounded-[50%]"
              />{' '}
              <p> thread/{val.forumID}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ChoseThreadComponent
