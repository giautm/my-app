import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { CONTAINER_ID } from 'utils/auth0'; 

import { showLock } from 'containers/Auth0/actions';

class LoginPage extends PureComponent {
  componentDidMount() {
    this.props.dispatch(showLock());
  }

  render() {
    return (
      <div id={CONTAINER_ID}/>
    )
  }
}

export default connect()(LoginPage);
