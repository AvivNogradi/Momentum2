import React, {Component} from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
      minWidth: 220,
      minHeight: 100,
      borderRadius:'2px',
    },
    header: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    title: {
        color: '#757575',
    },
    numbers: {
        fontWeight:'bold',
        fontSize:'30px',
    },
    content: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    }
  };

class OverViewContainer extends Component {
    constructor(props){
        super(props)

        this.state = {

        }
    }

    render(){


        let percentage = 0;

        if( (parseInt(this.props.changes) % parseInt(this.props.numbers)) !== 0  ){
             percentage = ((parseInt(this.props.changes))/(parseInt(this.props.numbers))*100).toFixed(1)
        }
        else{
             percentage = (parseInt(this.props.changes)/parseInt(this.props.numbers))*100
        }
        
        return (
            
           
            <Card style={{...styles.card,...this.props.style}}>
            <CardContent style={styles.content}>
                <div>
                <div style={styles.header}>
                    <Typography style={styles.title}>
                        {this.props.title}
                    </Typography>
                </div>
                <div style={styles.header}>
                    <Typography style={styles.numbers}>
                        {this.props.numbers}
                    </Typography>
                </div>
               
                </div>
                <div> 
                <div style={styles.changes}>
                {
                    this.props.changes < 0 ?
                    <i className="material-icons" style={{color:'red',marginLeft:'10px'}}>
                        arrow_downward
                    </i>
                    :
                    <i className="material-icons" style={{color:'green',marginLeft:'10px'}}>
                        arrow_upward
                    </i>
                }
                { this.props.changes < 0 ?
                    <Typography style={{marginLeft:'7px'}}>
                    {percentage}%
                    </Typography>
                    :
                    <Typography style={{marginLeft:'10px'}}>
                    {percentage}%
                    </Typography>
                }
                
                    <Typography style={styles.title}>
                        (<span>{this.props.changes > 0 ? '+' : '-'}</span>{this.props.changes})
                    </Typography>
                </div>

                </div>
            </CardContent>
           
          </Card>
           
           
        );
        
    }
}

export default OverViewContainer;