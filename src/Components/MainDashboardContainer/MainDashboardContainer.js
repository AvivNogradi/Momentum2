import React, {Component} from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
    MainDashboardContainer: {
        cursor:'pointer', 
        backgroundColor:'#203880', 
        width:'26%',height:'130px', 
        display:'flex', 
        justifyContent:'center',
        alignItems:'center',
        margin:'50px'
    }
}
class MainDashboardContainer extends Component{
    constructor(props){
        super(props)

        this.state = {

        }
    }

    render(){
        return(
            <Card className="MainDashboardContainer" style={styles.MainDashboardContainer} onClick={this.props.clicked}>
                <CardContent>
                    <Typography style={{color:'white',paddingTop:'10px',fontSize:'30px'}}>
                       {this.props.content}
                    </Typography>
                </CardContent>
            </Card>
        )
    }
}

export default MainDashboardContainer