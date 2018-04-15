import React, { Component } from 'react';
import { connect } from 'react-redux';

const withCurrentUser = (WrapComponent) => {

  class WithCurrentUser extends Component {
    render() {
      return (
        <WrapComponent {...this.props}/>
      );
    }
  }

  const mapStateToProps = (state) => ({
    isLoggedIn: !!state.getIn(['auth', 'accessToken'], null),
    roles: state.getIn(['auth', 'payload', 'roles'], []),
  });

  return connect(mapStateToProps)(WithCurrentUser);
}

export default withCurrentUser;
