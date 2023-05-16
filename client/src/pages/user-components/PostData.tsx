import React, { useEffect } from 'react'

const PostData = () => {
  return (
    <div>
      <form>
        <input type="text" placeholder="wrestlers name" />
        <select>
          <option>RAW</option>
          <option>Smack Down</option>
        </select>
        <input type="text" placeholder=" IMG URL " />
        <input type="number" placeholder=" stats" />
        <input type="number" placeholder=" weight" />
        <input type="number" placeholder=" height" />
        <button type="submit">POST DATA</button>
      </form>
    </div>
  )
}

export default PostData
