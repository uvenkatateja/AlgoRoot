import { Layout, Dropdown, Avatar, Space, Button } from 'antd'
import { UserOutlined, LogoutOutlined, DeleteOutlined, MenuOutlined, DownOutlined } from '@ant-design/icons'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

const { Header } = Layout

const Navbar = () => {
  const { user, logout, deleteAccount } = useAuth()
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false)

  const items = [
    {
      key: '1',
      label: (
        <div style={{ padding: '8px' }}>
          <p style={{ margin: 0 }}>{user?.email}</p>
        </div>
      ),
    },
    {
      key: '2',
      label: 'Logout',
      icon: <LogoutOutlined />,
      onClick: logout,
    },
    {
      key: '3',
      label: 'Delete Account',
      icon: <DeleteOutlined />,
      onClick: deleteAccount,
      danger: true,
    },
  ]

  const headerStyle = {
    background: '#fff',
    padding: '0 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 64,
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    position: 'sticky',
    top: 0,
    zIndex: 1000
  }

  const logoStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#262626',
    margin: 0
  }

  const mobileMenuButtonStyle = {
    marginRight: '16px',
    display: 'none',
    '@media screen and (maxWidth: 768px)': {
      display: 'block'
    }
  }

  const logoContainerStyle = {
    display: 'flex',
    alignItems: 'center'
  }

  const logoImageStyle = {
    height: '40px',
    marginRight: '16px',
    objectFit: 'contain'
  }

  return (
    <Header style={headerStyle}>
      <div style={logoContainerStyle}>
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setIsMobileMenuVisible(!isMobileMenuVisible)}
          style={mobileMenuButtonStyle}
        />
        <img 
          src="/src/assets/logo.png" 
          alt="AlgoRoot Logo" 
          style={logoImageStyle}
        />
        <span style={logoStyle}>
          AlgoRoot
        </span>
      </div>
      
      <div>
        <Dropdown menu={{ items }} trigger={['click']}>
          <Space style={{ cursor: 'pointer' }}>
            <Avatar icon={<UserOutlined />} />
            <DownOutlined />
          </Space>
        </Dropdown>
      </div>
    </Header>
  )
}

export default Navbar 