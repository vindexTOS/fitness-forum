import React, { useEffect } from 'react'
import { useMainContext } from '../../context'

const PostData = () => {
  const { postDispatch, PostWrestler } = useMainContext()
  useEffect(() => {}, [])
  return (
    <div>
      <form onSubmit={(e) => PostWrestler(e)}>
        <input
          type="text"
          placeholder="wrestlers name"
          onChange={(e) =>
            postDispatch({ type: 'name', payload: e.target.value })
          }
        />
        <select
          onChange={(e) =>
            postDispatch({ type: 'faction', payload: e.target.value })
          }
        >
          <option>RAW</option>
          <option>Smack Down</option>
        </select>
        <input
          onChange={(e) =>
            postDispatch({ type: 'photo', payload: e.target.value })
          }
          type="text"
          placeholder=" IMG URL "
        />
        <input
          onChange={(e) =>
            postDispatch({ type: 'stats', payload: Number(e.target.value) })
          }
          type="number"
          placeholder=" stats"
        />
        <input
          onChange={(e) =>
            postDispatch({ type: 'weight', payload: Number(e.target.value) })
          }
          type="number"
          placeholder=" weight"
        />
        <input
          onChange={(e) =>
            postDispatch({ type: 'height', payload: Number(e.target.value) })
          }
          type="number"
          placeholder=" height"
        />
        <button type="submit">POST DATA</button>
      </form>
    </div>
  )
}

export default PostData
