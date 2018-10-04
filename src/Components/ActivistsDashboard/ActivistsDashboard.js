import React, {Component} from 'react'
import FilterBar from '../FilterBar/FilterBar'
import OverViewContainer from '../OverViewContainer/OverViewContainer'
import ActivistsSummaryChart from '../ActivistsSummaryChart/ActivistsSummaryChart'
import ActivistsGeoTable from '../ActivistsGeoTable/ActivistsGeoTable'

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
    narrowOverViewContainersContainer: {
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent:'space-between',
        width:'60%',
        margin:'0 auto',
        marginTop: '30px'
    },
    FilterBar: {
        width: '80%',
        margin: '0 auto',
        zIndex:200,
    }
}
class ActivistsDashboard extends Component {
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
                <div className="overViewContainersWrapper" style={styles.narrowOverViewContainersContainer}>
                <OverViewContainer
                title="סופר פעילים"
                numbers="7000"
                changes="95"
                style={{borderRight:'3px solid #33adff'}}
                titleColor='#33adff'
                />
                <OverViewContainer
                title="פעילים"
                numbers="13655"
                changes="167"
                style={{borderRight:'3px solid #ff751a'}}
                titleColor='#ff751a'
                />
                <OverViewContainer
                title="רוצים להתנדב"
                numbers="4256"
                changes="97"
                style={{borderRight:'3px solid #00cc99'}}
                titleColor='#00cc99'
                />
                </div>
                  <ActivistsSummaryChart />
                  <ActivistsGeoTable />
                </div>

            </div>
        )
    }
}

export default ActivistsDashboard;