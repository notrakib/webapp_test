import { useState } from 'react'
import { register } from '../api'
import { useNavigate } from 'react-router-dom'
import './Login.scss'

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
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2 className="title">Create an account</h2>

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

        <button className="btn" type="submit">Register</button>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="signup-hint">Already have an account? <a href="/login">Log in</a></div>
      </form>
    </div>
  )
}
