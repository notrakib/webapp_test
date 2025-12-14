import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from '../features/auth/pages/Login'
import { Register } from '../features/auth/pages/Register'
import { Timeline } from '../features/murmurs/pages/Timeline'
import { ProtectedRoute } from '../components/ProtectedRoute'
import { UsersList } from '../features/users/pages/UsersList'

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/timeline"
          element={
            <ProtectedRoute>
              <Timeline />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UsersList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
