import React, {Component} from 'react'
import FilterBar from '../FilterBar/FilterBar'
import OverViewContainer from '../OverViewContainer/OverViewContainer'
import SummaryChart from '../SummaryChart/SummaryChart'
import GeoTable from '../GeoTable/GeoTable'

const styles = {
    AppContainer: {
        display:'flex',
         flexDirection: 'column',
         height:'100%',
         width:'100%'
    },
    ContentContainer: {
        backgroundColor: '#f2f2f2',
       
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
        zIndex:100,
    }
}
class Dashboard extends Component {
    constructor(props){
        super(props)

        this.state = {

        }
    }

    render(){
        return(
            <div style={styles.AppContainer}>
            <div style={{background:'white'}}>
            <div style={styles.FilterBar}>
            <FilterBar />
            </div>
            </div>
            
              <div style={styles.ContentContainer}>
                <div style={styles.OverViewContainersContainer}>
                <OverViewContainer
                title="פעילים"
                numbers="30500"
                changes="-150"
                style={{borderRight:'3px solid #b366ff'}}
                />
                <OverViewContainer
                title="תומכים"
                numbers="301200"
                changes="2500"
                style={{borderRight:'3px solid #33adff'}}
                />
                <OverViewContainer
                title="מתנגדים"
                numbers="15169"
                changes="3600"
                style={{borderRight:'3px solid #00cc99'}}
                />
                <OverViewContainer
                title="מתלבטים"
                numbers="140700"
                changes="-2100"
                style={{borderRight:'3px solid #ff751a'}}
                />
                <OverViewContainer
                title="לא ידוע"
                numbers="800500"
                changes="6000"
                style={{borderRight:'3px solid #ffcc00'}}
                />
                </div>
                  <SummaryChart />
                  <GeoTable />
                </div>

            </div>
        )
    }
}

export default Dashboard;