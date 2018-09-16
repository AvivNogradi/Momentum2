import React, {Component} from 'react'

const rawAreas = require('../../Assets/areas.json');
class DropDownAreas extends Component {
    constructor(props){
        super(props)

        this.state = {
            rawSearch: '',
            dropDownCities:[],
        }
    }

    render(){
        if(this.state.rawSearch === '') {

            dropDownAreas = rawAreas.map(el => {
             if(el && el._id){
               return  <MenuItem key={el._id} onClick={(e) =>  this.handleAreaClose(e,el)} style={{color:'#757575',paddingRight:'5px'}}>
               { this.state.areaFilter === el.name ?
                 <i className="material-icons" style={{color:'#399fd0',marginLeft:'5px'}}>
                   check
                   </i>
                   :
                   <span style={{width:'30px'}}></span>
                 }
               {el.name}
               </MenuItem>
             }
          });
         }
        return(
          {dropDownAreas}
        )
    }
}

export default DropDownAreas