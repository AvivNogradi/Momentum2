import React, {Component} from 'react'


const styles = {
    TooltipWrapper: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor:'white',
        width:'200px',
        height:'200px',
        zIndex:'3',
        boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
    },
    TooltipHeader: {
        display:'flex',
        justifyContent:'flex-end',
        alignItems: 'center',
        marginBottom:'5px',
        padding:'5px 10px',
        color:'white',
        backgroundColor:'#203880',
    },
    TooltipContent: {
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start',
       
    },
    ContentLine: {
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:'3px',
        padding:'10px'
    }
}

class ActivistsCustomizedTooltip extends Component {
    constructor(props){
        super(props)

        this.state = {
            label: '',
            displayData: [],
        }
    }

    componentWillReceiveProps(){
        
        this.setState({label:this.props.label})
        let label = this.props.label
        if(label !== ''){
            let newData = this.props.data.filter(el =>{
                return el.date === this.props.label
            })
            this.setState({displayData: newData})
        }
      
       
    }

    render(){
        let displayData = this.state.displayData
     

        return(
            <div style={styles.TooltipWrapper}>
            <div style={styles.TooltipHeader}>
              {this.state.label}
            </div>
            { this.state.label !== '' ?

            <div style={styles.TooltipContent}>
            <div style={styles.ContentLine}>
                <span style={{color:'grey', fontSize:'15px'}}>{displayData[0]&&displayData[0].אירועים}</span>
                <div>
                <span>אירועים</span>
                <i className="material-icons" style={{color:'#33adff',fontSize:'10px',margin:'0 3px'}}>
                    fiber_manual_record
                </i>
                </div>
            </div>
            <div style={styles.ContentLine}>
                <span style={{color:'grey', fontSize:'15px'}}>{displayData[0]&&displayData[0].נרשמים}</span>
                <div>
                    <span>נרשמים לאירועים</span>
                    <i className="material-icons" style={{color:'#ff751a',fontSize:'10px',margin:'0 3px'}}>
                        fiber_manual_record
                    </i>
                </div>
            </div>
            <div style={styles.ContentLine}>
            <span style={{color:'grey', fontSize:'15px'}}>{displayData[0]&&displayData[0].תומכיםחדשים}</span>
               <div>
                <span>תומכים חדשים</span>
                <i className="material-icons" style={{color:'#00cc99',fontSize:'10px',margin:'0 3px'}}>
                    fiber_manual_record
                </i>
              </div>
           
            </div>

            </div>
            :
            null
            }
            
        </div>
        )
    }
}

export default ActivistsCustomizedTooltip;