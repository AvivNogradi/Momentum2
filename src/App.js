import React, { Component } from 'react';
import './App.css';
import Dashboard from './Components/Dashboard/Dashboard'
import MenuDashboard from './Components/MenuDashboard/MenuDashboard'
import MainDashboard from './Components/MainDashboard/MainDashboard'
import ActivistsDashboard from './Components/ActivistsDashboard/ActivistsDashboard'
import EventsDashboard from './Components/EventsDashboard/EventsDashboard'
import UsersDashboard from './Components/UsersDashboard/UsersDashboard'
import { Route, BrowserRouter} from 'react-router-dom'


class App extends Component {
  render() {
    return (
      <div style={{width:'100%', height:'100%',backgroundColor:'white'}}>
       <BrowserRouter>
          <div style={{width:'100%',height:'100%'}}>
              <Route exact path='/' component={MenuDashboard}/>              
              <Route path='/voters' component={Dashboard}/>
              <Route path='/main' component={MainDashboard}/>
              <Route path='/activists' component={ActivistsDashboard}/>
              <Route path='/events' component={EventsDashboard}/>
              <Route path='/users' component={UsersDashboard}/>
          </div>
            </BrowserRouter>
      </div>
    );
  }
}

export default App;
