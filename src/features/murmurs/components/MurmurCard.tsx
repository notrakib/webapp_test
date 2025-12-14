import { useState } from 'react'
import { likeMurmur, unlikeMurmur, deleteMurmur } from '../api'
import type { Murmur } from '../types'
import './MurmurCard.scss'

interface Props {
  murmur: Murmur
  currentUserId: number
  onDelete: (id: number) => void
}

export function MurmurCard({ murmur, currentUserId, onDelete }: Props) {
  const [likes, setLikes] = useState(murmur.likeCount)
  const [liked, setLiked] = useState(false)
  const isOwner = murmur.user_id === currentUserId

  const handleLike = async () => {
    if (liked) {
      await unlikeMurmur(murmur.id)
      setLikes((l) => l - 1)
      setLiked(false)
    } else {
      await likeMurmur(murmur.id)
      setLikes((l) => l + 1)
      setLiked(true)
    }
  }

  const handleDelete = async () => {
    await deleteMurmur(murmur.id)
    onDelete(murmur.id)
  }

  return (
    <div className="murmur-card">
      <div className="murmur-header">{murmur.username}</div>
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
