import { useEffect, useState } from 'react'
import { followUser, unfollowUser, isUserFollowed } from '../api'

interface User {
  id: number
  username: string
}

export const UserCard = ({ user }: { user: User }) => {
  const [followed, setFollowed] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    isUserFollowed(user.id).then((res) => setFollowed(res.data.isFollowed))
  }, [user.id])

  const toggleFollow = async () => {
    setLoading(true)
    try {
      if (followed) {
        await unfollowUser(user.id)
      } else {
        await followUser(user.id)
      }
      setFollowed(!followed)
    } catch (err) {
      console.error('Follow/unfollow failed', err)
      alert('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="user-card">
      <span>@{user.username}</span>
      <button onClick={toggleFollow} disabled={loading}>
        {followed ? 'Unfollow' : 'Follow'}
      </button>
    </div>
  )
}
