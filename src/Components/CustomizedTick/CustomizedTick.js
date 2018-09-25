import React, {Component} from 'react'

class CustomizedTick extends Component {
    constructor(props){
        super(props)

        this.state = {
         aviv:'aviv'
        }
    }


    render(){
    let tickData = this.props.data || [];
    let index =  this.props.index
    let result = `${tickData[index].day} \n ${tickData[index].date}`
    console.log(result)
        return(
                   
                  <text x={this.props.x} y={this.props.y}>{result}</text>
                   
        )
    }
}

export default CustomizedTick