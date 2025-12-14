import { useState } from 'react'
import { likeMurmur, unlikeMurmur, deleteMurmur } from '../api'
import type { Murmur } from '../type'
import './MurmurCard.scss'

interface Props {
  murmur: Murmur
  currentUserId: number
  onDelete: (id: number) => void
}

export function MurmurCard({ murmur, currentUserId, onDelete }: Props) {
  const [likes, setLikes] = useState(murmur.likeCount)
  const [liked, setLiked] = useState(murmur.isLiked)
  const isOwner = murmur.user_id === currentUserId

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
        <span className="murmur-username">{murmur.username}</span>
        <span className="murmur-time">{formattedTime}</span>
      </div>
      <div className="murmur-content">{murmur.content}</div>

      <div className="murmur-actions">
        <button onClick={handleLike}>
          {liked ? 'Unlike' : 'Like'} ({likes})
        </button>

        {isOwner && (
          <button className="danger" onClick={handleDelete}>
            Delete
          </button>
        )}
      </div>
    </div>
  )
}
