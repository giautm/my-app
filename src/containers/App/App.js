import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Calendar } from 'antd';
import LocaleToggle from '../LocaleToggle';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <LocaleToggle/>
        <p className="App-intro">
          OK Man
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Button type="primary">Test</Button>
        <Calendar onPanelChange={this.onPanelChange} />
      </div>
    );
  }
}

export default App;
