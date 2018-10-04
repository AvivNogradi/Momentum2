import React, {Component} from 'react'
import MenuItem from '@material-ui/core/MenuItem';

const rawAreas = require('../../Assets/areas.json');
const rawCities = require('../../Assets/cities.json');

class DropDownAreas extends Component {
    constructor(props){
        super(props)

        this.state = {
            rawSearch: '',
            dropDownCities:[],
            displayedAreas:[],
        }
    }

    handleAreaClose(e,el){

        let areaFilter = el.name
        let  selectedArea = el
        let displayedAreaCities = rawCities.filter(city => {
              if(el.name === 'הכל'){
                return true;
              }
              else{
                return city.areaName === el.name
              }
            });
        this.props.handleAreaClose(e,areaFilter,selectedArea,displayedAreaCities)
    }

    renderAreasDisplayed(){
        let dropDownAreas;
        let workingAreas = rawAreas.filter((testedArea)=>{
            if(this.props.areaFilter === 'הכל' && this.props.rawSearch === '') return true;

            if(testedArea.name === this.props.areaFilter || testedArea.name === this.props.cityChosen.areaName) return true;

        })


        dropDownAreas = workingAreas.map(el => {
            if(el && el._id){
              return  <MenuItem key={el._id} onClick={(e) => this.handleAreaClose(e,el)} style={{color:'#757575',paddingRight:'5px'}}>
              { this.props.areaFilter === el.name || this.props.cityChosen.areaName === el.name ?
                <i className="material-icons" style={{color:'#399fd0',marginLeft:'5px'}}>
                  check
                  </i>
                  :
                  <span style={{width:'30px'}}></span>
                }
              {el.name}
              </MenuItem>
            }
            return null
         });
        
        return dropDownAreas
    
    }

    render(){
        
        let dropDownAreas =  this.renderAreasDisplayed();

        return(
            <React.Fragment>
          {dropDownAreas}
          </React.Fragment>
        )
    }
}

export default DropDownAreas