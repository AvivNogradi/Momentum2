import React, {Component} from 'react'

class CustomizedTick extends Component {
    constructor(props){
        super(props)

        this.state = {
       
        }
    }


    render(){
    let tickData = this.props.data || [];
    let index =  this.props.index
    let result = `${tickData[index].day} \n\n\n\n ${tickData[index].date}`
   console.log(result)
        return(    
                  <text x={this.props.x} y={this.props.y}><tspan>{result}</tspan><tspan>dd</tspan></text>
                   
        )
    }
}

export default CustomizedTick