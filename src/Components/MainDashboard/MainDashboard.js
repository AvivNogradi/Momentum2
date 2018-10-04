import React, {Component} from 'react'
import FilterBar from '../FilterBar/FilterBar'
import OverViewContainer from '../OverViewContainer/OverViewContainer'
import SummaryChart from '../SummaryChart/SummaryChart'


const styles = {
    AppContainer: {
        display:'flex',
         flexDirection: 'column',
         height:'100%',
         width:'100%'
    },
    ContentContainer: {
        backgroundColor: '#f2f2f2',
       height:'100%'
    },
    OverViewContainersContainer: {
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent:'space-between',
        width:'80%',
        margin:'0 auto',
        marginTop: '30px'
    },
    FilterBar: {
        width: '80%',
        margin: '0 auto',
        zIndex:200,
    }
}
class MainDashboard extends Component {
    constructor(props){
        super(props)

        this.state = {

        }
    }
    
    dashBoardSelected(value){
        this.props.history.push({
            pathname: value,
            state : {
                dashboardSelected: value
            }
        })
    }
    render(){
        return(
            <div style={styles.AppContainer}>
            <div style={{background:'white'}}>
            <div style={styles.FilterBar}>
            <FilterBar dashBoardSelected={(value) => this.dashBoardSelected(value)} filterBarSelection={this.props.location.state.dashboardSelected}/>
            </div>
            </div>
            
              <div style={styles.ContentContainer}>
                <div className="overViewContainersWrapper" style={styles.OverViewContainersContainer}>
                <OverViewContainer
                title="פעילים"
                numbers="30500"
                changes="-150"
                style={{borderRight:'3px solid #b366ff'}}
                titleColor='#b366ff'
                />
                <OverViewContainer
                title="תומכים"
                numbers="301200"
                changes="2500"
                style={{borderRight:'3px solid #33adff'}}
                titleColor='#33adff'
                />
                <OverViewContainer
                title="מתנגדים"
                numbers="15169"
                changes="3600"
                style={{borderRight:'3px solid #00cc99'}}
                titleColor='#00cc99'
                />
                <OverViewContainer
                title="מתלבטים"
                numbers="140700"
                changes="-2100"
                style={{borderRight:'3px solid #ff751a'}}
                titleColor='#ff751a'
                />
                <OverViewContainer
                title="לא ידוע"
                numbers="800500"
                changes="6000"
                style={{borderRight:'3px solid #ffcc00'}}
                titleColor='#ffcc00'
                />
                </div>
                  <SummaryChart />
                </div>

            </div>
        )
    }
}

export default MainDashboard;