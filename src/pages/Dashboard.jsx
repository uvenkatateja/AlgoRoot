import { useState } from 'react'
import { 
  Card, Row, Col, Typography, Statistic, 
  Table, Tag, Space, Button, DatePicker
} from 'antd'
import {
  UserOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  TeamOutlined,
  FileOutlined,
  CheckCircleOutlined,
  SyncOutlined
} from '@ant-design/icons'

const { Title } = Typography
const { RangePicker } = DatePicker


const recentActivities = [
  { id: 1, user: 'John Doe', action: 'Added new user', status: 'success', date: '2024-02-20' },
  { id: 2, user: 'Jane Smith', action: 'Updated profile', status: 'processing', date: '2024-02-19' },
  { id: 3, user: 'Bob Johnson', action: 'Deleted record', status: 'success', date: '2024-02-18' },
  { id: 4, user: 'Alice Brown', action: 'Modified data', status: 'processing', date: '2024-02-17' },
  { id: 5, user: 'Charlie Wilson', action: 'Added new entry', status: 'success', date: '2024-02-16' },
]

const Dashboard = () => {
  const [loading, setLoading] = useState(false)

  const columns = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      render: (text) => (
        <Space>
          <UserOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'success' ? 'success' : 'processing'}>
          {status === 'success' ? (
            <Space>
              <CheckCircleOutlined />
              Completed
            </Space>
          ) : (
            <Space>
              <SyncOutlined spin />
              In Progress
            </Space>
          )}
        </Tag>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
  ]

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <Row gutter={[24, 24]} align="middle" justify="space-between" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={3}>Dashboard Overview</Title>
        </Col>
        <Col>
          <Space>
            <RangePicker />
            <Button type="primary">Export Data</Button>
          </Space>
        </Col>
      </Row>

      {/* Statistics Cards */}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="stat-card">
            <Statistic
              title="Total Users"
              value={2456}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
            <div className="stat-footer">
              <span style={{ color: '#3f8600' }}>
                <ArrowUpOutlined /> 12%
              </span>
              <span style={{ marginLeft: 8, color: '#666' }}>
                vs last week
              </span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="stat-card">
            <Statistic
              title="Active Sessions"
              value={142}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
            <div className="stat-footer">
              <span style={{ color: '#3f8600' }}>
                <ArrowUpOutlined /> 8%
              </span>
              <span style={{ marginLeft: 8, color: '#666' }}>
                vs last week
              </span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="stat-card">
            <Statistic
              title="Total Files"
              value={1284}
              prefix={<FileOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
            <div className="stat-footer">
              <span style={{ color: '#cf1322' }}>
                <ArrowDownOutlined /> 5%
              </span>
              <span style={{ marginLeft: 8, color: '#666' }}>
                vs last week
              </span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="stat-card">
            <Statistic
              title="System Load"
              value={42}
              suffix="%"
              valueStyle={{ color: '#fa8c16' }}
            />
            <div className="stat-footer">
              <span style={{ color: '#3f8600' }}>
                <ArrowUpOutlined /> 3%
              </span>
              <span style={{ marginLeft: 8, color: '#666' }}>
                vs last hour
              </span>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Recent Activities */}
      <Card 
        title="Recent Activities" 
        style={{ marginTop: 24 }}
        extra={<Button type="link">View All</Button>}
      >
        <Table
          columns={columns}
          dataSource={recentActivities}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </Card>

      {/* Additional Info Cards */}
      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={12}>
          <Card title="System Status" bordered={false}>
            <div style={{ padding: '20px 0' }}>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Statistic
                    title="CPU Usage"
                    value={68}
                    suffix="%"
                    valueStyle={{ color: '#1890ff' }}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title="Memory Usage"
                    value={42}
                    suffix="%"
                    valueStyle={{ color: '#52c41a' }}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title="Disk Space"
                    value={82}
                    suffix="%"
                    valueStyle={{ color: '#fa8c16' }}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title="Network Load"
                    value={34}
                    suffix="%"
                    valueStyle={{ color: '#722ed1' }}
                  />
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Quick Actions" bordered={false}>
            <Space direction="vertical" style={{ width: '100%' }} size="large">
              <Button type="primary" block icon={<UserOutlined />}>
                Add New User
              </Button>
              <Button block icon={<FileOutlined />}>
                Generate Report
              </Button>
              <Button block icon={<TeamOutlined />}>
                View Team Activity
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard 