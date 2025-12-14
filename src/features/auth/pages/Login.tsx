import { useState } from 'react'
import { login } from '../api'
import { useNavigate } from 'react-router-dom'
import { setToken, setUserID } from '../../../lib/auth'

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
      setUserID(res.data.payload.id)
    } catch (err) {
      if(Array.isArray(err.response.data.message)){
        setError(err.response.data.message[0])
      }
      else {
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
      <button type="submit">Login</button>
      {error && <div className="alert alert-error">{error}</div>}
    </form>
  )
}
