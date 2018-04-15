import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';

import MainMenu from 'components/MainMenu';
import Router from 'components/Router';

const { Header, Content, Footer, Sider } = Layout;

class Dashboard extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  render() {
    const { location } = this.props;
    const currentRoute = location.pathname.replace(/^\//, '');

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo"/>
          <MainMenu currentRoute={currentRoute}/>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Router/>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Giau TM ©2018 Created by Giau. Tran Minh
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Dashboard;
