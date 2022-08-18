import React, { useState } from 'react';
import './App.css';
import classes from './styles.module.scss';
import { Layout, Menu } from 'antd';
import { navItems } from './constants/navItems';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import { Helmet } from 'react-helmet';

const { Content, Footer, Sider } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <BrowserRouter>
      <Helmet>
        <title>Simplicity Coffee Shop | Admin Dashboard</title>
      </Helmet>
      <Layout className={classes.layout}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className={classes.logo}></div>
          <Menu
            theme="dark"
            // defaultSelectedKeys={['1']}
            mode="inline"
            items={navItems}
          />
        </Sider>
        <Layout className="site-layout">
          <Content>
            <div className={classes['inner-layout']}>
              <Routes>
                {Object.keys(routes).map((key) => {
                  return (
                    <Route
                      key={key}
                      path={routes[key].path}
                      element={routes[key].component}
                    />
                  );
                })}
              </Routes>
            </div>
          </Content>
          <Footer className={classes.footer}>
            Simplicity Coffee Shop © 2022 Created by Simplicity Team
          </Footer>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
