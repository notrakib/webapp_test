import { useState } from 'react'
import { createMurmur } from '../api'

interface MurmurComposerProps {
  onMurmurPosted: () => void
}

export const MurmurComposer: React.FC<MurmurComposerProps> = ({
  onMurmurPosted,
}) => {
  const [content, setContent] = useState('')

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    await createMurmur(content)
    setContent('')
    onMurmurPosted()
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
