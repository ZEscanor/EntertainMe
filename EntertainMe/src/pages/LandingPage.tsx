import React, { PropsWithChildren, useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined } from '@ant-design/icons';
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
  { label: 'Login', key: 'sub2', icon: <UserOutlined />, href: '/login' },
];

const items2: MenuItem[] = [
  { label: 'Map', key: 'sub1', icon: <UserOutlined />, href: '/map' },
  { label: 'Movies', key: 'sub2', icon: <UserOutlined />, href: '/movies' },
  { label: 'Itinerary', key: 'sub3', icon: <UserOutlined />, href: '/itinerary' },
];

const LandingPage: React.FC<PropsWithChildren<{}>> = ({children}) => {

  const location = useLocation();
  const [dateList, setDateList] = useState([])

  const isMapRoute = location.pathname === '/map'
  const itinRoute = location.pathname === '/itinerary'


  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']}>
          {items1.map(item => (
            <Menu.Item key={item.key}>
              <Link to={item.href}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu mode="inline" defaultSelectedKeys={['sub1']} defaultOpenKeys={['sub1']}>
            {items2.map(item => (
              <Menu.Item key={item.key}>
                <Link to={item.href}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
         
          <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
            {isMapRoute && <Map/>}
           
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default LandingPage;
