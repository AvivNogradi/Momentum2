import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './Components/Dashboard/Dashboard'


class App extends Component {
  render() {
    return (
      <div style={{width:'100%', height:'100%'}}>
         <Dashboard/>
      </div>
    );
  }
}

export default App;
