import { useState } from 'react'
import { likeMurmur, unlikeMurmur, deleteMurmur } from '../api'
import type { Murmur } from '../type'
import './MurmurCard.scss'
import { Link } from 'react-router-dom'
import { getUserID } from '../../../lib/auth'

interface Props {
  murmur: Murmur
  currentUserId: number
  onDelete: (id: number) => void
  fromTimeline: boolean
}

export function MurmurCard({ murmur, currentUserId, onDelete, fromTimeline }: Props) {
  const [likes, setLikes] = useState(murmur.likeCount)
  const [liked, setLiked] = useState(murmur.isLiked)

  const userId = getUserID()
  let isOwner = false
  if (userId) {
    isOwner = murmur.user_id.toString() === userId
  }

  const handleLike = async () => {
    try {
      if (liked) {
        await unlikeMurmur(murmur.id)
        setLikes((l) => l - 1)
        setLiked(false)
      } else {
        await likeMurmur(murmur.id)
        setLikes((l) => l + 1)
        setLiked(true)
      }
    } catch (err) {
      console.error('Failed to like/unlike murmur', err)
      alert('Something went wrong. Please try again.')
    }
  }

  const handleDelete = async () => {
    try {
      await deleteMurmur(murmur.id)
      onDelete(murmur.id)
    } catch (err) {
      console.error('Failed to delete murmur', err)
      alert('Cannot delete murmur. Try again.')
    }
  }

  const formattedTime = new Date(murmur.created_at).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="murmur-card">
      <div className="murmur-header">
        <span className="murmur-username">
          <Link to={`/users/${murmur.user_id}`}>{murmur.username}</Link>
        </span>
        <span className="murmur-time">{formattedTime}</span>
      </div>
      <div className="murmur-content">{murmur.content}</div>

      <div className="murmur-actions">
        <button onClick={handleLike}>
          {liked ? 'Unlike' : 'Like'} ({likes})
        </button>

        {isOwner && !fromTimeline && (
          <button className="danger" onClick={handleDelete}>
            Delete
          </button>
        )}
      </div>
    </div>
  )
}
