import { Layout } from 'antd'
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import LoginSignup from './pages/LoginSignup'
import Details from './pages/Details'

const { Content } = Layout

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  
  if (loading) {
    return null
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

// Public Route Component
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  
  if (loading) {
    return null
  }
  
  if (isAuthenticated) {
    return <Navigate to="/details" replace />
  }

  return children
}

const AppLayout = () => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={
          <PublicRoute>
            <LoginSignup />
          </PublicRoute>
        } />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    )
  }

  return (
    <Layout style={{ 
      minHeight: '100vh',
      background: '#f0f2f5'
    }}>
      <Navbar />
      <Layout hasSider>
        <Sidebar />
        <Layout style={{ 
          padding: '24px',
          marginLeft: { xs: 0, sm: 0, md: 0 },
          transition: 'all 0.2s',
          background: '#f0f2f5'
        }}>
          <Content 
            style={{ 
              background: '#fff',
              padding: { xs: 16, sm: 24, md: 32 },
              margin: 0,
              minHeight: 280,
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              overflow: 'hidden'
            }}
          >
            <Routes>
              <Route path="/details" element={
                <ProtectedRoute>
                  <Details />
                </ProtectedRoute>
              } />
              <Route path="*" element={<Navigate to="/details" replace />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
