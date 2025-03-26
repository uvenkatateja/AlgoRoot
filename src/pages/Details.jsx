import { useState, useEffect } from 'react'
import { 
  Table, Input, Card, Row, Col, 
  Typography, Space, Button, Tag,
  Tooltip 
} from 'antd'
import { 
  SearchOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined
} from '@ant-design/icons'

const { Title } = Typography

// Mock Indian user data
const mockUsers = [
  {
    key: '1',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@gmail.com',
    phone: '+91 98765-43210',
    location: 'Mumbai, Maharashtra',
    status: 'Active',
    joinDate: '2024-01-15',
    role: 'User'
  },
  {
    key: '2',
    name: 'Priya Patel',
    email: 'priya.patel@gmail.com',
    phone: '+91 87654-32109',
    location: 'Bangalore, Karnataka',
    status: 'Active',
    joinDate: '2024-01-16',
    role: 'Admin'
  },
  {
    key: '3',
    name: 'Amit Kumar',
    email: 'amit.kumar@gmail.com',
    phone: '+91 76543-21098',
    location: 'Delhi, NCR',
    status: 'Inactive',
    joinDate: '2024-01-17',
    role: 'User'
  },
  {
    key: '4',
    name: 'Sneha Reddy',
    email: 'sneha.reddy@gmail.com',
    phone: '+91 65432-10987',
    location: 'Hyderabad, Telangana',
    status: 'Active',
    joinDate: '2024-01-18',
    role: 'User'
  },
  {
    key: '5',
    name: 'Vikram Singh',
    email: 'vikram.singh@gmail.com',
    phone: '+91 54321-09876',
    location: 'Chennai, Tamil Nadu',
    status: 'Active',
    joinDate: '2024-01-19',
    role: 'User'
  },
  {
    key: '6',
    name: 'Anjali Verma',
    email: 'anjali.verma@gmail.com',
    phone: '+91 43210-98765',
    location: 'Kolkata, West Bengal',
    status: 'Inactive',
    joinDate: '2024-01-20',
    role: 'User'
  },
  {
    key: '7',
    name: 'Rajesh Gupta',
    email: 'rajesh.gupta@gmail.com',
    phone: '+91 32109-87654',
    location: 'Pune, Maharashtra',
    status: 'Active',
    joinDate: '2024-01-21',
    role: 'Admin'
  },
  {
    key: '8',
    name: 'Meera Iyer',
    email: 'meera.iyer@gmail.com',
    phone: '+91 21098-76543',
    location: 'Ahmedabad, Gujarat',
    status: 'Active',
    joinDate: '2024-01-22',
    role: 'User'
  }
]

const Details = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        // Simulating API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        setData(mockUsers)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => (
        <Space>
          <UserOutlined style={{ fontSize: '18px' }} />
          <span style={{ fontSize: '16px' }}>{text}</span>
        </Space>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => (
        <Space>
          <MailOutlined style={{ fontSize: '18px' }} />
          <span style={{ fontSize: '16px' }}>{text}</span>
        </Space>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (text) => (
        <Space>
          <PhoneOutlined style={{ fontSize: '18px' }} />
          <span style={{ fontSize: '16px' }}>{text}</span>
        </Space>
      ),
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      render: (text) => (
        <Space>
          <GlobalOutlined style={{ fontSize: '18px' }} />
          <span style={{ fontSize: '16px' }}>{text}</span>
        </Space>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (status) => (
        <Tag color={status === 'Active' ? 'success' : 'error'} style={{ fontSize: '16px', padding: '5px 15px' }}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Join Date',
      dataIndex: 'joinDate',
      key: 'joinDate',
      sorter: (a, b) => new Date(a.joinDate) - new Date(b.joinDate),
      render: (text) => (
        <span style={{ fontSize: '16px' }}>{text}</span>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={role === 'Admin' ? 'blue' : 'default'} style={{ fontSize: '16px', padding: '5px 15px' }}>
          {role}
        </Tag>
      ),
    },
  ]

  // Search filter function
  const handleSearch = (value) => {
    setSearchText(value)
  }

  const filteredData = data.filter((record) =>
    Object.values(record).some(
      (val) =>
        val &&
        val.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  )

  return (
    <Card 
      variant="borderless"
      style={{
        width: '100%',
        maxWidth: '1600px',
        margin: '0 auto',
        padding: { xs: '20px', sm: '30px', md: '40px' }
      }}
    >
      <Row justify="space-between" align="middle" style={{ marginBottom: 32 }}>
        <Col>
          <Title level={2} style={{ fontSize: '32px', marginBottom: 0 }}>User Details</Title>
        </Col>
        <Col>
          <Space>
            <Input
              placeholder="Search users..."
              prefix={<SearchOutlined style={{ fontSize: '20px' }} />}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ 
                width: 400,
                height: '45px',
                fontSize: '16px'
              }}
              allowClear
            />
          </Space>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        pagination={{
          total: filteredData.length,
          pageSize: 8,
          showTotal: (total, range) => (
            <span style={{ fontSize: '16px' }}>
              {range[0]}-{range[1]} of {total} items
            </span>
          ),
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        scroll={{ x: 'max-content' }}
        size="large"
        onRow={(record) => ({
          style: {
            fontSize: '16px',
            padding: '20px 28px',
          },
        })}
        components={{
          header: {
            cell: (props) => (
              <th
                {...props}
                style={{
                  ...props.style,
                  fontSize: '18px',
                  fontWeight: 600,
                  padding: '20px 28px',
                  backgroundColor: '#fafafa'
                }}
              />
            ),
          },
          body: {
            cell: (props) => (
              <td
                {...props}
                style={{
                  ...props.style,
                  fontSize: '16px',
                  padding: '20px 28px'
                }}
              />
            ),
          },
        }}
      />
    </Card>
  )
}

export default Details 