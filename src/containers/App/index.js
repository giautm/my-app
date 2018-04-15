import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Main from 'containers/Dashboard';
import Authen from 'containers/LoginPage';
//import { loggedIn } from 'utils/authService';
import injectSaga from 'utils/injectSaga';
import auth0Saga from 'containers/Auth0/saga';

class App extends Component {

  state = { loading: true };

  componentDidMount() {
    this.setState({ loading: false });
  }

  render() {
    const auth = false; // loggedIn();
    let renderContent;

    if (auth) {
      renderContent = <Route path="/" component={Main} />;
    } else {
      renderContent = <Route path="*" component={Authen} />;
    }

    return (
      <BrowserRouter>
        {renderContent}
      </BrowserRouter>
    );
  }
}

const withSaga = injectSaga({ key: 'auth0', saga: auth0Saga });

export default withSaga(App);
