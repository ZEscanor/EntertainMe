import React, { PropsWithChildren, useState, useEffect } from 'react';
import { Layout, Menu, Dropdown, Avatar } from 'antd';
import { UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import Map from '../components/Map/Map';
import Itinerary from '../components/Itinerary/Itinerary';

const { Header, Content, Sider } = Layout;

interface MenuItem {
  label: string;
  key: string;
  icon: React.ReactNode;
  href: string;
}

const items1: MenuItem[] = [
  { label: 'Home', key: 'home', icon: <UserOutlined />, href: '/' },
  { label: 'Login', key: 'login', icon: <UserOutlined />, href: '/login' },
];

const items2: MenuItem[] = [
  { label: 'Map', key: 'map', icon: <UserOutlined />, href: '/map' },
  { label: 'Movies', key: 'movies', icon: <UserOutlined />, href: '/movies' },
  { label: 'Itinerary', key: 'itinerary', icon: <UserOutlined />, href: '/itinerary' },
];

const LandingPage: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const location = useLocation();
  const [dateList, setDateList] = useState([]);
  const [user, setUser] = useState<any>(null);

  const isMapRoute = location.pathname === '/map';
  const itinRoute = location.pathname === '/itinerary';

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // const userMenu = (
  //   <Menu>
  //     <Menu.Item key="logout" onClick={handleLogout} icon={<LogoutOutlined />}>
  //       Logout
  //     </Menu.Item>
  //     <Menu.Item key="Settingsnnn" onClick={handleLogout} icon={<LogoutOutlined />}>
  //       Setting
  //     </Menu.Item>
  //     <Menu.Item key="Hmm" onClick={handleLogout} icon={<LogoutOutlined />}>
  //       Logout
  //     </Menu.Item>
  //   </Menu>
    
  // );

  const userMenuItems = [
    {
      key: 'settings',
      label: 'Settings',
      icon: <SettingOutlined />,
      onClick: () => console.log('Settings clicked'), // Replace with your settings handler
    },
    {
      key: 'logout1',
      label: 'Logoutmnn',
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
    {
      key: 'logout2',
      label: 'Logout',
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  return (
    <Layout>
      <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']}>
          {items1.map(item => (
            item.key !== 'login' || !user ? (
              <Menu.Item key={item.key}>
                <Link to={item.href}>{item.label}</Link>
              </Menu.Item>
            ) : null
          ))}
        </Menu>
        {user && (
          <Dropdown     menu={{
            items: userMenuItems,
            selectable: true,
            defaultSelectedKeys: ['3'],
          }}>
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginLeft: '-2000px' }}>
              <Avatar icon={<UserOutlined />} />
              <span style={{ marginLeft: 8 }}>{user.name}</span>
            </div>
          </Dropdown>
        )}
      </Header>
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu mode="inline" defaultSelectedKeys={['map']} defaultOpenKeys={['sub1']}>
            {items2.map(item => (
              <Menu.Item key={item.key}>
                <Link to={item.href}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
            {isMapRoute && <Map />}
            {/* {itinRoute && <Itinerary />} */}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default LandingPage;
