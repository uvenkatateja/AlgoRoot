import { Layout, Menu, Button } from 'antd'
import { 
  FileOutlined, 
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const { Sider } = Layout

const Sidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileView, setMobileView] = useState(window.innerWidth < 768)


  window.addEventListener('resize', () => {
    setMobileView(window.innerWidth < 768)
  })

  const menuItems = [
    {
      key: '/details',
      icon: <FileOutlined />,
      label: 'Details',
      onClick: () => navigate('/details')
    }
  ]

  return (
    <Sider 
      width={200}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      breakpoint="lg"
      collapsedWidth={mobileView ? 0 : 80}
      style={{ 
        background: '#fff',
        height: '100vh',
        position: 'sticky',
        top: 64,
        left: 0,
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column'
      }}
      trigger={null}
    >
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        style={{ 
          flex: 1,
          borderRight: 0 
        }}
        items={menuItems}
      />
      
    
      <div
        style={{
          padding: '10px',
          textAlign: 'center',
          borderTop: '1px solid #f0f0f0',
          background: '#fff'
        }}
      >
        <Button
          type="text"
          icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            width: '100%',
            color: '#1890ff'
          }}
        >
          {collapsed ? '' : 'Collapse Sidebar'}
        </Button>
      </div>
    </Sider>
  )
}

export default Sidebar 