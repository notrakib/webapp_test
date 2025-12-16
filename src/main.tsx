import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './assets/styles/theme.scss'
import App from './app/App'
import { AuthProvider } from './app/providers/AuthProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
