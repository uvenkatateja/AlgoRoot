import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    let mounted = true

    const checkAuth = () => {
      const loggedInUser = localStorage.getItem('loggedInUser')
      if (loggedInUser && mounted) {
        setUser(JSON.parse(loggedInUser))
        navigate('/details', { replace: true })
      }
      if (mounted) {
        setLoading(false)
      }
    }

    checkAuth()

    return () => {
      mounted = false
    }
  }, [navigate])

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('loggedInUser', JSON.stringify(userData))
    message.success('Successfully logged in!')
    navigate('/details', { replace: true })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('loggedInUser')
    message.success('Successfully logged out!')
    navigate('/login', { replace: true })
  }

  const deleteAccount = () => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const updatedUsers = users.filter(u => u.email !== user.email)
      localStorage.setItem('users', JSON.stringify(updatedUsers))
      localStorage.removeItem('loggedInUser')
      setUser(null)
      message.success('Account successfully deleted!')
      navigate('/login', { replace: true })
    } catch (error) {
      message.error('Failed to delete account')
    }
  }

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        logout, 
        deleteAccount, 
        isAuthenticated,
        loading 
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 