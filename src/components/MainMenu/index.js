import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

const data = require('./data.json');

// TODO: This component shouble be PureComponent,
// states should mangements by Parent.
// TODO: All menu items should be filter (by permission and by search)
// before passing to this component.
class MainMenu extends Component {
  static defaultProps = {
    menus: data,
  };

  static propTypes = {
    currentRoute: PropTypes.string.isRequired,
    menus: PropTypes.array.isRequired,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { currentRoute } = nextProps;

    const routes = currentRoute.split('/');
    const current = [routes[0]];
    if (routes.length > 1) {
      if (currentRoute.match(/\w\/[0-9]/g)) {
        current.push(`${routes[0]}/detail`);
      } else {
        current.push(`${routes[0]}/${routes[1]}`);
      }
    }

    return { openKeys: [routes[0]], current };
  };

  state = {};

  render() {
    return (
      <Menu
        mode="inline"
        defaultOpenKeys={this.state.openKeys}
        selectedKeys={this.state.current}
        theme="dark"
      >
        {this.props.menus.map(m => {
          if (Array.isArray(m.subMenus) && m.subMenus.length > 0) {
            return (
              <Menu.SubMenu
                key={m.key}
                title={(
                  <Fragment>
                    <Icon type={m.icon}/>
                    <span>{m.text}</span>
                  </Fragment>
                )}
              >
                {m.subMenus.map(s => {
                  return (
                    <Menu.Item key={s.key}>
                      <Link to={`/${s.key}`}>{s.text}</Link>
                    </Menu.Item>
                  );
                })}
              </Menu.SubMenu>
            );
          } else {
            return (
              <Menu.Item key={m.key}>
                <Link to={`/${m.key}`}>
                  <Icon type={m.icon}/>
                  <span>{m.text}</span>
                </Link>
              </Menu.Item>
            );
          }
        })}
      </Menu>
    )
  }
}

export default MainMenu;
