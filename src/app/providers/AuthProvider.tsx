import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react'
import { getToken, setToken, clearToken } from '../../lib/auth'

interface AuthContextType {
  token: string | null
  user: any | null
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(getToken())
  const [user, setUser] = useState<any | null>(null)

  const login = (newToken: string) => {
    setToken(newToken)
    setTokenState(newToken)
  }

  const logout = () => {
    clearToken()
    setTokenState(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
