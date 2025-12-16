import { useState } from 'react'
import './Login.scss'
import { login } from '../api'
import { useNavigate } from 'react-router-dom'
import { setToken, setUserID } from '../../../lib/auth'

export const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (loading) return

    setError(null)
    try {
      setLoading(true)
      const res = await login({ username, password })

      setToken(res.data.access_token)
      setUserID(res.data.id)
      setTimeout(() => {
        navigate('/timeline', { replace: true })
      }, 500);
    } catch (err) {
      const msg = err?.response?.data?.message
      if (Array.isArray(msg)) setError(msg[0])
      else if (typeof msg === 'string') setError(msg)
      else setError('Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2 className="title">Welcome back</h2>

        <input
          className="input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          aria-label="Username"
        />

        <input
          className="input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-label="Password"
        />

        <button className="btn" type="submit" disabled={loading}>{loading ? 'Logging in…' : 'Login'}</button>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="signup-hint">Don't have an account? <a href="/register">Sign up</a></div>
      </form>
    </div>
  )
}
