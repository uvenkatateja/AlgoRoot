import { useState } from 'react'
import { Form, Input, Button, Card, Row, Col, message, Typography } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import { useAuth } from '../context/AuthContext'

const { Title } = Typography

const LoginSignup = () => {
  const [isSignup, setIsSignup] = useState(false)
  const { login } = useAuth()
  const [form] = Form.useForm()

  const onFinish = (values) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    
    if (isSignup) {
      const userExists = users.some(user => user.email === values.email)
      if (userExists) {
        message.error('User already exists!')
        return
      }
      localStorage.setItem('users', JSON.stringify([...users, values]))
      message.success('Account created successfully!')
      login(values)
    } else {
      const user = users.find(user => 
        user.email === values.email && user.password === values.password
      )
      if (user) {
        login(user)
      } else {
        message.error('Invalid credentials!')
      }
    }
  }

  const containerStyle = {
    minHeight: '100vh',
    background: '#f0f2f5',
    paddingTop: { xs: 12, sm: 20, md: 32, lg: 40 },
    paddingBottom: { xs: 12, sm: 20, md: 32, lg: 40 },
    paddingLeft: { xs: 12, sm: 20, md: 32, lg: 40 },
    paddingRight: { xs: 12, sm: 20, md: 32, lg: 40 },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

  const cardStyle = {
    width: '100%',
    minHeight: { xs: '90vh', sm: '85vh', md: '80vh' },
    borderRadius: { xs: 16, sm: 20, md: 24, lg: 28 },
    boxShadow: '0 12px 32px rgba(0,0,0,0.1)',
    background: '#ffffff',
    paddingTop: { xs: 20, sm: 28, md: 36, lg: 44, xl: 52 },
    paddingBottom: { xs: 20, sm: 28, md: 36, lg: 44, xl: 52 },
    paddingLeft: { xs: 20, sm: 28, md: 36, lg: 44, xl: 52 },
    paddingRight: { xs: 20, sm: 28, md: 36, lg: 44, xl: 52 },
    transition: 'all 0.3s ease',
    margin: '0 auto',
    border: 'none'
  }

  const titleStyle = {
    textAlign: 'center',
    marginBottom: { xs: 36, sm: 44, md: 52, lg: 60 },
    color: '#1a1a1a',
    fontSize: { xs: 36, sm: 40, md: 44, lg: 48, xl: 52 },
    fontWeight: 700,
    letterSpacing: '-0.5px'
  }

  const formStyle = {
    width: '100%',
    maxWidth: { xs: '100%', sm: 540, md: 640, lg: 720, xl: 800 },
    margin: '0 auto',
    paddingLeft: { xs: 16, sm: 24, md: 32, lg: 40 },
    paddingRight: { xs: 16, sm: 24, md: 32, lg: 40 }
  }

  const inputStyle = {
    borderRadius: { xs: 12, sm: 14, md: 16 },
    height: { xs: 52, sm: 56, md: 60, lg: 64 },
    fontSize: { xs: 16, sm: 17, md: 18, lg: 19 },
    border: '1px solid #d9d9d9',
    padding: '0 24px',
    transition: 'all 0.3s ease'
  }

  const buttonStyle = {
    height: { xs: 52, sm: 56, md: 60, lg: 64 },
    borderRadius: { xs: 12, sm: 14, md: 16 },
    fontSize: { xs: 18, sm: 19, md: 20, lg: 22 },
    fontWeight: 600,
    background: '#1890ff',
    border: 'none',
    marginTop: 16,
    transition: 'all 0.3s ease'
  }

  return (
    <div style={containerStyle}>
      <Row justify="center" align="middle" style={{ width: '100%', margin: 0 }}>
        <Col 
          xs={24}
          sm={23}
          md={22}
          lg={20}
          xl={18}
          xxl={16}
        >
          <Card
            variant="borderless"
            style={cardStyle}
            className="login-card"
          >
            <Title level={1} style={titleStyle}>
              {isSignup ? 'Create Account' : 'Welcome Back'}
            </Title>
            
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              size="large"
              style={formStyle}
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email!' },
                  { type: 'email', message: 'Please enter a valid email!' }
                ]}
                style={{ marginBottom: { xs: 28, sm: 32, md: 36 } }}
              >
                <Input 
                  prefix={<MailOutlined style={{ color: '#595959', fontSize: { xs: 20, md: 22, lg: 24 } }} />}
                  placeholder="Email"
                  style={inputStyle}
                  className="hover-input"
                />
              </Form.Item>
              
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Please enter your password!' },
                  { min: 6, message: 'Password must be at least 6 characters!' }
                ]}
                style={{ marginBottom: { xs: 36, sm: 40, md: 44 } }}
              >
                <Input.Password 
                  prefix={<LockOutlined style={{ color: '#595959', fontSize: { xs: 20, md: 22, lg: 24 } }} />}
                  placeholder="Password"
                  style={inputStyle}
                  className="hover-input"
                />
              </Form.Item>
              
              <Form.Item style={{ marginBottom: { xs: 32, sm: 36, md: 40 } }}>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  block
                  size="large"
                  style={buttonStyle}
                  className="hover-button"
                >
                  {isSignup ? 'Create Account' : 'Sign In'}
                </Button>
              </Form.Item>
              
              <div style={{ textAlign: 'center', marginTop: { xs: 28, sm: 32, md: 36, lg: 40 } }}>
                <Button 
                  type="link" 
                  onClick={() => setIsSignup(!isSignup)}
                  style={{ 
                    fontSize: { xs: 16, sm: 17, md: 18, lg: 19 }, 
                    color: '#1890ff',
                    fontWeight: 500
                  }}
                  className="hover-link"
                >
                  {isSignup 
                    ? 'Already have an account? Sign in' 
                    : 'New user? Create account'}
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>

      <style>{`
        .ant-form-item-label > label {
          font-size: 17px;
          height: 32px;
          color: #262626;
          font-weight: 500;
        }
        .ant-form-item-explain-error {
          font-size: 14px;
          margin-top: 6px;
          color: #ff4d4f;
        }
        .login-card {
          backdrop-filter: blur(10px);
        }
        .login-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.12);
        }
        .hover-input {
          transition: all 0.3s ease;
        }
        .hover-input:hover, .hover-input:focus {
          border-color: #1890ff;
          box-shadow: 0 0 0 2px rgba(24,144,255,0.1);
        }
        .hover-button {
          transition: all 0.3s ease;
        }
        .hover-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(24,144,255,0.35);
          background: #40a9ff !important;
        }
        .hover-link {
          transition: all 0.3s ease;
        }
        .hover-link:hover {
          color: #40a9ff !important;
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  )
}

export default LoginSignup 