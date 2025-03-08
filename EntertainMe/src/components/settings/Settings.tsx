import React, { useState } from "react";
import { Layout, Menu, Card, Form, Input, Switch, Button, message } from "antd";
import { SettingOutlined, UserOutlined, DatabaseOutlined } from "@ant-design/icons";
import LandingPage from "../../pages/LandingPage";


const { Header, Sider, Content } = Layout;

const Settings: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");

  const onFinish = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      message.success("Settings updated successfully");
      setLoading(false);
    }, 1000);
  };

  const renderContent = () => {
    switch (selectedKey) {
      case "1":
        return (
            
          <Form layout="vertical" onFinish={onFinish} initialValues={{ notifications: true }}>
            <Form.Item label="Username" name="username" rules={[{ required: true, message: "Please enter your username" }]}>            
              <Input placeholder="Enter your username" />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}>            
              <Input placeholder="Enter your email" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        );
      case "2":
        return (
          <Form layout="vertical" onFinish={onFinish} initialValues={{ notifications: true }}>
            <Form.Item label="Notifications" name="notifications" valuePropName="checked">            
              <Switch />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Save Preferences
              </Button>
            </Form.Item>
          </Form>
        );
      case "3":
        return <p>View and manage your data here.</p>;
      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#001529", padding: "0 20px", color: "white", fontSize: "20px" }}>User Settings</Header>
      <Layout>
        <Sider width={200} style={{ background: "#fff" }}>
          <Menu mode="inline" selectedKeys={[selectedKey]} onClick={(e) => setSelectedKey(e.key)} style={{ height: "100%", borderRight: 0 }}>
            <Menu.Item key="1" icon={<UserOutlined />}>Account Settings</Menu.Item>
            <Menu.Item key="2" icon={<SettingOutlined />}>Manage Preferences</Menu.Item>
            <Menu.Item key="3" icon={<DatabaseOutlined />}>Your Data</Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: "24px" }}>
          <Content style={{ background: "#fff", padding: 24, margin: 0, minHeight: 280 }}>
            <Card>{renderContent()}</Card>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Settings;
