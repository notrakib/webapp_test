import { useState } from 'react'
import { register } from '../api'
import { useNavigate } from 'react-router-dom'

export const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      await register({ username, password })

      navigate('/login')
    } catch (err) {
      if (Array.isArray(err.response.data.message)) {
        setError(err.response.data.message[0])
      } else {
        setError(err.response.data.message)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>
      {error && <div className="alert alert-error">{error}</div>}
    </form>
  )
}
