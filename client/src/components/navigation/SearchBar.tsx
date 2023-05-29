import React, { useState } from 'react'
import { getSearch } from '../../redux/features/slice/GetAllPosts'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { GetAllPostsThunk } from '../../redux/features/async-thunk/GetAllPostsThunk'
import { useSelector } from 'react-redux'
import { BsSearch } from 'react-icons/bs'
const SearchBar = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const searchText = useSelector((state: any) => state.GetAllPostReducer.search)
  const [searchBarShow, setSearchBarShow] = useState<boolean>(false)
  const style = {
    search: `${
      searchBarShow
        ? 'absolute w-[60%]'
        : 'max_md2:w-[2rem] max_md2:h-[2rem]  max_md2:rounded-[50%]'
    }    w-[50%] bg-[#363434] rounded-[20px] h-[30px] flex  items-center justify-around`,
    input: `${
      searchBarShow ? '' : 'max_md2:hidden '
    }   outline-none bg-transparent w-[90%] text-pink-600  `,
    icon: ` ${
      searchBarShow ? '' : ' max_md2:ml-0  max_md2:px-1'
    } ml-2 px-1  text-[1.6rem] text-gray-400`,
    btn: ` ${
      searchBarShow ? '' : 'max_md2:hidden'
    }   relative inline-flex items-center justify-center p-0.5   w-[5rem]  overflow-hidden text-sm font-medium text-gray-900 rounded-[30px] group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800`,
  }

  const SearchFunction = () => {
    dispatch(
      GetAllPostsThunk({ dispatch, pages: 1, search: `&search=${searchText}` }),
    )
  }
  return (
    <div className={style.search}>
      <BsSearch
        onClick={() => setSearchBarShow(!searchBarShow)}
        className={`${style.icon}  mdxl:hidden `}
      />
      <BsSearch className={`${style.icon} max_md2:hidden `} />
      <input
        className={style.input}
        type="text"
        onChange={(e) => dispatch(getSearch(e.target.value))}
      />
      <button className={style.btn} onClick={() => SearchFunction()}>
        Search
      </button>
    </div>
  )
}

export default SearchBar
