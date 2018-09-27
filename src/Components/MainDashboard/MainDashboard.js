import React, {Component} from 'react'
import MainDashboardContainer from '../MainDashboardContainer/MainDashboardContainer'


class MainDashboard extends Component{
    constructor(props){
        super(props)

        this.state = {

        }
    }

    dashBoardSelected(dashboardSelected){
        this.props.history.push({
            pathname: dashboardSelected,
            state : {
                dashboardSelected: dashboardSelected
            }
        })
    }
    render(){
        return(
          <div className="MainDashboard" style={{display:'flex', justifyContent:'flex-end', flexWrap:'wrap',marginTop:'100px',padding:'0 100px'}}>
            <MainDashboardContainer content="פעילים" clicked={() => this.dashBoardSelected('activists')}/>   
            <MainDashboardContainer content="בוחרים" clicked={() => this.dashBoardSelected('voters')}/>
            <MainDashboardContainer content="ראשי" clicked={() => this.dashBoardSelected('main')}/>
            <MainDashboardContainer content="משתמשים" clicked={() => this.dashBoardSelected('users')}/>
            <MainDashboardContainer content="אירועים" clicked={() => this.dashBoardSelected('events')}/>
          </div>
        )
    }
}

export default MainDashboard