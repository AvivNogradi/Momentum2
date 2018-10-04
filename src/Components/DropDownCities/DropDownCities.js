import React, {Component} from 'react'
import MenuItem from '@material-ui/core/MenuItem';

const rawCities = require('../../Assets/cities.json');
class DropDownCities extends Component {
    constructor(props){
        super(props)
        this.rawSearch = ''
        this.selectedArea = ''
        this.state = {
           rawSearch: '',
           dropDownCities:[],
           citySelected:'',
           selectedAreaName: '',
        }
    }

    handleCityChosen = (e,el) => {
       this.props.handleCityChosen(el)
    }

    componentWillReceiveProps(newProps){

        this.selectedArea = newProps.selectedArea;
        this.rawSearch = newProps.rawSearch;
       
       if(this.props.rawSearch !== newProps.rawSearch){
        this.onChangeInput();
       }
       this.setState({rawSearch: newProps.rawSearch})
    }
    onChangeInput = () => {
        let searchedCity = this.rawSearch
       // let searchedCityArray = searchedCity.split('')

        var displayedCities = rawCities.filter(element => {
            
            let sameCityName = (element.name.indexOf(searchedCity) !== -1) 
            let withinSearchedAreaSelected = element.areaName === this.selectedArea.name || this.selectedArea.name === 'הכל'
            if(sameCityName && withinSearchedAreaSelected){
                return true
            }
            return false;  
                      
        })
           if(displayedCities.length !== 0){
             
            this.props.displayFilteredCities(displayedCities)
            this.props.displayInitialCities(displayedCities)
           }
           else{
               let emptyArray = [];
               this.props.displayFilteredCities(emptyArray)
           }
          
        }


    render(){

        let displayedCities = this.props.displayedCities
        let dropDownCities =  displayedCities.map(el => {
          if(el && el._id){
           return <MenuItem key={el._id} onClick={(e) =>  this.handleCityChosen(e,el)} style={{color:'#757575',paddingRight:'5px'}}>
           { this.props.citySelected === el.name ?
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

        return(
        <React.Fragment>
           {dropDownCities}
       </React.Fragment>
        )
    }
}

export default DropDownCities