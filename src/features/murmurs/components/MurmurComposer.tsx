import { useState } from 'react'
import { createMurmur } from '../api'
import './MurmurComposer.scss'

interface MurmurComposerProps {
  onMurmurPosted: () => void
}

export const MurmurComposer: React.FC<MurmurComposerProps> = ({
  onMurmurPosted,
}) => {
  const [content, setContent] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createMurmur(content)
      setContent('')
      onMurmurPosted()
    } catch (err) {
      console.error('Failed to save murmur', err)
      alert('Cannot save murmur. Try again.')
    }
  }

  return (
    <div className="murmur-composer">
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's happening?"
        />
        <button type="submit">Post</button>
      </form>
    </div>
  )
}
