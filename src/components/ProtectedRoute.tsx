import { Navigate } from 'react-router-dom'
import { JSX } from 'react'
import { getToken } from '../lib/auth'

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = getToken()

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}
