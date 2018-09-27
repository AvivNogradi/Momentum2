import React, { Component } from 'react';
import './App.css';
import Dashboard from './Components/Dashboard/Dashboard'
import MainDashboard from './Components/MainDashboard/MainDashboard'
import { Route, BrowserRouter} from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <div style={{width:'100%', height:'100%',backgroundColor:'white'}}>
       <BrowserRouter>
          <div style={{width:'100%',height:'100%'}}>
              <Route exact path='/' component={MainDashboard}/>              
              <Route path='/voters' component={Dashboard}/>
          </div>
            </BrowserRouter>
      </div>
    );
  }
}

export default App;
