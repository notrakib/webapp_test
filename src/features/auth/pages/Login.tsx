import { useState } from 'react'
import { login } from '../api'
import { useNavigate } from 'react-router-dom'
import { setToken } from '../../../lib/auth'

export const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const res = await login({ username, password })

      navigate('/timeline')
      setToken(res.data.access_token)
      localStorage.setItem('user_id', res.data.payload.id)
    } catch (err) {
      setError('Invalid username or password')
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
      <button type="submit">Login</button>
      {error && <div className="alert alert-error">{error}</div>}
    </form>
  )
}
