import React, { FC } from 'react'
import { useMainContext } from '../../../context'
import { TbPhotoX } from 'react-icons/tb'
type ImgProp = {
  htmlImg: String | null
}
const ImgUpload: FC<ImgProp> = ({ htmlImg }) => {
  const { imgUploadDrag, imgUpload, removeImgFromHtml } = useMainContext()
  return (
    <div className="flex items-center justify-center">
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
      {htmlImg && (
        <TbPhotoX
          className="text-white text-[1.6rem] absolute right-80"
          onClick={() => removeImgFromHtml()}
        />
      )}
    </div>
  )
}

export default ImgUpload
