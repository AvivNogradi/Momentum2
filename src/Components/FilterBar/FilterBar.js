import React, {Component} from 'react'
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import DropDownAreas from '../DropDownAreas/DropDownAreas'
import DropDownCities from '../DropDownCities/DropDownCities'
import axios from 'axios';

const rawCities = require('../../Assets/cities.json');
const rawAreas = require('../../Assets/areas.json');
var initialDropDownCount = 10;
var endDropDownCount = 20;

const styles = {
    root: {
      display: 'flex',
    },
    dropDown: {
        display: 'flex',
        alignItems: 'center',
        width:'100%',
        zIndex: 100,
    },
    container: {
        display:'flex',
        width: '100%',
        alignItems:'center',
    },
    menuItem: {
      color:'#757575',
      marginRight:'-12px',
      paddingLeft:'30px',
    },
   
  };

class FilterBar extends Component {
    constructor(props){
        super(props)
        this.searchedValue = '';
        this.state = {
           displayedCities:[],
           displayedAreaCities:[],
           filteredCities:[],
           displayedAreas:[],
           rawCitySearch:'',
           selectedArea:{
             _id:0,
             name:'הכל',
           },
           cityChosen:{},
           selectedCity:'',
           rawSearch:'',
           initial : 10,
           end : 20,
           mainOpen:false,
           areaOpen:false,
           timeOpen:false,
           mainFilter: 'ראשי',
           areaFilter: 'הכל',
           timeFilter: 'שבוע אחרון'
        };
        
    }

componentWillMount(){
  this.displayInitialCities(rawCities);
  this.setState({filteredCities:rawCities,displayedAreas:rawAreas})
  this.changeFilterTitle()
}

displayInitialCities(filteredArr){
  let tempCities = [];
  for(let i = 0; i < 10; i++){
    tempCities.push(filteredArr[i])
  }
  this.setState({displayedCities: tempCities})
}

    handleMainToggle = (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.setState({ mainOpen: !this.state.mainOpen });
    }
      handleMainClose = (e,value) => {
        e.preventDefault();
        e.stopPropagation();
        if((e.target.parentElement.parentElement.classList)[4] === 'mainDropdaownButton') return;
    
      if(value){
        this.setState({ mainFilter:value});
        switch(value){
          case "ראשי":
          this.props.dashBoardSelected("main")
          break;
          case "בוחרים":
          this.props.dashBoardSelected("voters")
          break;
          case "פעילים":
          this.props.dashBoardSelected("activists")
          break;
          case "אירועים":
          this.props.dashBoardSelected("events")
          break;
          case "משתמשים":
          this.props.dashBoardSelected("users")
          break;
          default:
          this.props.dashBoardSelected("main")
        }
        
      }
      this.setState({ mainOpen: false});
      };

      handleAreaToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.setState({ areaOpen: !this.state.areaOpen });
      };
    
      handleAreaClose = (e,areaFilter,selectedArea,displayedAreaCities) => {
        e.preventDefault();
        e.stopPropagation();

        if(areaFilter){
          let timeFilter = this.state.timeFilter
          this.setState({areaFilter:areaFilter,selectedArea:selectedArea})
     
      axios({
        method: 'post',
        url: 'http://35.157.215.191/api/echo',
        data: {
          areaFilter: areaFilter,
          timeFilter: timeFilter
        }
      }).then(res => {
      
        console.log(res)
      })
      
        }

      
     
        if((e.target.parentElement.parentElement.classList)[4] === 'areaDropdaownButton') return;
         if(displayedAreaCities){

          this.setState({displayedCities: displayedAreaCities,displayedAreaCities: displayedAreaCities,filteredCities:displayedAreaCities})
          this.displayInitialCities(displayedAreaCities)
         }
      
        this.setState({ areaOpen: false });
      };

      handleAreaCloseAfterChooseAll = (e,object) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({areaFilter: object.name,selectedArea: object,displayedCities:rawCities,rawSearch:'',filteredCities:rawCities})
        this.setState({ areaOpen: false });
        this.displayInitialCities(rawCities)
      }

      handleTimeToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.setState({ timeOpen: !this.state.timeOpen });
      };
    
      handleTimeClose = (event,value) => {
        let areaFilter = this.state.areaFilter
        event.preventDefault();
        event.stopPropagation();

     
        if((event.target.parentElement.parentElement.classList)[4] === 'timeDropdaownButton') return;
        if(value){
          this.setState({ timeFilter:value});
          axios({
            method: 'post',
            url: 'http://35.157.215.191/api/echo',
            data: {
              areaFilter: areaFilter,
              timeFilter: value
            }
          }).then(res => {
            console.log(res)
          })
          
        }
        this.setState({ timeOpen: false });
      };

     loadNextTenCities(){
       
      let initial = initialDropDownCount;
      let end = endDropDownCount;
       let nextTenCities = this.state.displayedCities
       for(let i= initial; i < end; i++){
         if(this.state.rawSearch !== ''){
          nextTenCities.push(this.state.filteredCities[i])

         }
       else if(this.state.selectedArea.name !== 'הכל' && this.state.rawSearch === ''){
          nextTenCities.push(this.state.displayedAreaCities[i])
       }
         else{
          nextTenCities.push(rawCities[i])
         }
          
       }
        this.setState({displayedCities:nextTenCities})
        initialDropDownCount += 10;
        endDropDownCount += 10;
        
     }

     handleScroll = (e) => {
      let bottom = (e.target.scrollHeight - (Math.round(e.target.scrollTop)) - e.target.clientHeight < 1)
     
      if(bottom){
        this.loadNextTenCities();
      }
     }

    //  onChangeInput = (event) => {
     
    //   this.setState({rawSearch: event.target.value})

    //   let searchedCity = event.target.value

    //   var filteredCities = rawCities
    //   var displayedCities = filteredCities.filter(element => {
     
    //          let regex = new RegExp(searchedCity)
    //           if(regex.test(element && element.name) &&  (element.areaName === this.state.selectedArea.name || this.state.selectedArea.name === 'הכל') ){
    //               return true
    //           }
    //       else{
    //         return false;  
    //       }
               
    //   })
  
    //      if(displayedCities.length !== 0){
           
    //       this.setState({ displayedCities:displayedCities, filteredCities:displayedCities, displayedAreas:[]})
    //       this.displayInitialCities(displayedCities)
    //      }
        
    //     //  else{
    //     //   this.displayInitialCities(rawCities);
    //     //   this.setState({displayedAreas:rawAreas})
    //     //  }
    //   }

      handleCityChosen(city){
       
        this.setState({areaFilter:city.name,cityChosen:city})
        this.setState({areaOpen:false})
      }

      displayFilteredCities(displayedCities){
        this.setState({displayedCities:displayedCities,filteredCities:displayedCities})
      }

      changeFilterTitle(){
       
        switch(this.props.filterBarSelection){
          case "main":
          this.setState({mainFilter:'ראשי'})
          break;
          case "voters":
          this.setState({mainFilter:'בוחרים'})
          break;
          case "events":
          this.setState({mainFilter:'אירועים'})
          break;
          case "activists":
          this.setState({mainFilter:'פעילים'})
          break;
          case "users":
          this.setState({mainFilter:'משתמשים'})
          break;
          default:
          this.setState({mainFilter:'ראשי'})
        }
      }

   
    render(){
      
  //      let displayedCities = this.state.displayedCities
  //    let dropDownCities = displayedCities.map(el => {
  //      if(el && el._id){
  //       return <MenuItem key={el._id} onClick={(e) =>  this.handleAreaClose(e,el)} style={{color:'#757575',paddingRight:'5px'}}>
  //       { this.state.areaFilter === el.name ?
  //       <i className="material-icons" style={{color:'#399fd0',marginLeft:'5px'}}>
  //         check
  //         </i>
  //         :
  //         <span style={{width:'30px'}}></span>
  //        }
  //     {el.name}
  //     </MenuItem>
  //      }
        
  //     });

  
  //   let dropDownAreas = [];
    
  //  if(this.state.rawSearch === '') {

  //    dropDownAreas = rawAreas.map(el => {
  //     if(el && el._id){
  //       return  <MenuItem key={el._id} onClick={(e) =>  this.handleAreaClose(e,el)} style={{color:'#757575',paddingRight:'5px'}}>
  //       { this.state.areaFilter === el.name ?
  //         <i className="material-icons" style={{color:'#399fd0',marginLeft:'5px'}}>
  //           check
  //           </i>
  //           :
  //           <span style={{width:'30px'}}></span>
  //         }
  //       {el.name}
  //       </MenuItem>
  //     }
  //  });
  // }
  
     
  
        const { mainOpen } = this.state;
        const { areaOpen } = this.state;
        const { timeOpen } = this.state;

        return(
          
         
         
         <div className="dropDownsWrapper" style={styles.container}> 
         <div style={{display:'flex', justifyContent:'flex-end'}}>
         <div style={styles.dropDown}>
             <Button
         buttonRef={node => {
           this.timeAnchorEl = node;
         }}
         aria-owns={timeOpen ? 'menu-list-grow' : null}
         aria-haspopup="true"
         onClick={this.handleTimeToggle}
         className='timeDropdaownButton'
       >
       <div className="timeAndIconRegularSizeScreen" style={{display:'flex'}}>
       <i className="material-icons" style={{color:'#399fd0'}}>
           keyboard_arrow_down
        </i>
        <span className="dropDownTitles" style={{fontWeight: 'bold', fontSize:'initial', direction:'rtl'}}>{this.state.timeFilter}</span> 
        </div>
        <i className="material-icons timeTitleIconSmallScreen" style={{color:'#00ace6',display:'none'}}>
           date_range
        </i>
          </Button>
    
          <Popper open={timeOpen} anchorEl={this.timeAnchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper style={{direction:'rtl'}}>
                  <ClickAwayListener onClickAway={this.handleTimeClose}>
                    <MenuList>
                      <MenuItem onClick={(e) =>  this.handleTimeClose(e,'שבוע אחרון')} style={{color:'#757575',paddingRight:'5px'}}>
                      { this.state.timeFilter === 'שבוע אחרון' ?
                        <i className="material-icons" style={{color:'#399fd0',marginLeft:'5px'}}>
                          check
                          </i>
                          :
                          <span style={{width:'30px'}}></span>
                        }
                      &nbsp;  &nbsp;<span> שבוע אחרון </span>
                      </MenuItem>
                      <MenuItem onClick={(e) =>  this.handleTimeClose(e,'30 ימים אחרונים')} style={{color:'#757575',paddingRight:'5px'}}>
                      { this.state.timeFilter === '30 ימים אחרונים' ?
                        <i className="material-icons" style={{color:'#399fd0',marginLeft:'5px'}}>
                          check
                          </i>
                          :
                          <span style={{width:'30px'}}></span>
                        }
                      &nbsp;  30 &nbsp;<span> ימים אחרונים </span>
                      </MenuItem>
                      <MenuItem onClick={(e) =>  this.handleTimeClose(e,"90 ימים אחרונים")} style={{color:'#757575',paddingRight:'5px'}}>
                      { this.state.timeFilter === '90 ימים אחרונים' ?
                        <i className="material-icons" style={{color:'#399fd0',marginLeft:'5px'}}>
                          check
                          </i>
                          :
                          <span style={{width:'30px'}}></span>
                        }
                      &nbsp; 90 &nbsp;<span> ימים אחרונים </span>
                      </MenuItem>
                      <MenuItem onClick={(e) =>  this.handleTimeClose(e,"180 ימים אחרונים")} style={{color:'#757575',paddingRight:'5px'}}>
                      { this.state.timeFilter === '180 ימים אחרונים' ?
                        <i className="material-icons" style={{color:'#399fd0',marginLeft:'5px'}}>
                          check
                          </i>
                          :
                          <span style={{width:'30px'}}></span>
                        }
                      &nbsp; 180 &nbsp;<span> ימים אחרונים </span></MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
          <Divider />
          </div>
          <Divider />
         <div style={styles.dropDown}>
         <Divider />
             <Button
         buttonRef={node => {
           this.areaAnchorEl = node;
         }}
         aria-owns={areaOpen ? 'menu-list-grow' : null}
         aria-haspopup="true"
         onClick={this.handleAreaToggle}
         className='areaDropdaownButton'
       >
       <i className="material-icons" style={{color:'#399fd0'}}>
           keyboard_arrow_down
        </i>
        <span className="dropDownTitles" style={{fontWeight: 'bold', fontSize:'initial'}}>{this.state.areaFilter}</span> 
          </Button>
          <span style={{color:'#757575'}}>:אזור/ישוב</span>
            
          <Popper open={areaOpen} anchorEl={this.areaAnchorEl} transition disablePortal onScroll={this.handleScroll}>
            {({ TransitionProps, placement }) => (
              <Grow
              onScroll={this.handleScroll}
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper style={{direction:'rtl',maxHeight: 400, overflowY: 'auto', overFlowY:'hidden'}} onScroll={this.handleScroll}>
                  <ClickAwayListener onClickAway={this.handleAreaClose}>
                    <MenuList style={{display:'flex',flexDirection:'column',justifyContent:'flex-end',paddingTop:0}}>
                    <TextField
                       onChange={(event) => {this.searchedValue = event.target.value;this.setState({rawSearch: event.target.value})}}
                         style={{paddingTop:0,marginTop:0}}
                          id="search"
                          placeholder="חיפוש"
                          type="search"
                          InputProps={{
                          disableUnderline: true,
                          style: { marginRight: '12px',paddingLeft:'10px', paddingTop:'10px'}
                       }}
                       InputLabelProps={{
                        style: {display:'flex',justifyContent:'flex-start',width:'100%', margin:'0 -12px'}
                        
                     }}
                        margin="normal"
                      
                      />
                      <Divider />
                      
                        <MenuItem onClick={(e) =>  this.handleAreaCloseAfterChooseAll(e,{name:"הכל",_id:0} )} style={{color:'#757575',paddingRight:'5px'}}>
                        { this.state.areaFilter === 'הכל' ?
                          <i className="material-icons" style={{color:'#399fd0',marginLeft:'5px'}}>
                            check
                            </i>
                            :
                            <span style={{width:'30px'}}></span>
                          }
                        הכל
                        </MenuItem>
                        
                      }
                      <DropDownAreas 
                      cityChosen={this.state.cityChosen}
                      areaFilter={this.state.areaFilter} 
                      rawSearch={this.state.rawSearch} 
                      handleAreaClose={(e,areaFilter,selectedArea,displayedAreaCities) => this.handleAreaClose(e,areaFilter,selectedArea,displayedAreaCities)}
                      />
                      <Divider />
                      <DropDownCities 
                      handleCityChosen={(city) => this.handleCityChosen(city)} 
                      citySelected={this.state.cityChosen.name}
                      rawSearch={this.searchedValue} 
                      handleAreaClose={(e,el) => this.handleAreaClose(e,el)}
                      displayedCities={this.state.displayedCities}
                      displayFilteredCities={(displayedCities)=> this.displayFilteredCities(displayedCities)}
                      displayInitialCities={(displayedCities) => this.displayInitialCities(displayedCities)}
                      selectedArea={this.state.selectedArea}/>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
          </div>  
          </div>
          <div style={{display:'flex', justifyContent:'flex-end',width:'100%'}}>
            <div style={styles.areaAndTimeFilters}>
            <div style={styles.dropDown}>
             <Button
         buttonRef={node => {
           this.mainAnchorEl = node;
         }}
         aria-owns={mainOpen ? 'menu-list-grow' : null}
         aria-haspopup="true"
         className='mainDropdaownButton'
         onClick={this.handleMainToggle}
       >
       <i className="material-icons" style={{color:'#399fd0'}}>
           keyboard_arrow_down
        </i>
        <span className="dropDownTitles" style={{fontWeight: 'bold', fontSize:'initial'}}>{this.state.mainFilter}</span> 
          </Button>
          <span style={{color:'#757575'}}>:דוחות</span>
            
        
        
          <Popper open={mainOpen} anchorEl={this.mainAnchorEl} transition disablePortal style={{zIndex:200}}>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper style={{direction:'rtl',zIndex:200}}>
                  <ClickAwayListener onClickAway={this.handleMainClose}>
                    <MenuList>
                        <MenuItem onClick={(e) =>  this.handleMainClose(e,"ראשי")} style={styles.menuItem}>
                        { this.state.mainFilter === 'ראשי' ?
                        <i className="material-icons" style={{color:'#399fd0',marginLeft:'5px'}}>
                        check
                        </i>
                        :
                        <span style={{width:'30px'}}></span>
                        }
                          ראשי
                        </MenuItem>
                        <MenuItem onClick={(e) =>  this.handleMainClose(e,"בוחרים")} style={styles.menuItem}>
                        { this.state.mainFilter === 'בוחרים' ?
                        <i className="material-icons" style={{color:'#399fd0',marginLeft:'5px'}}>
                          check
                          </i>
                          :
                          <span style={{width:'30px'}}></span>
                        }
                        בוחרים
                        </MenuItem>
                        <MenuItem onClick={(e) =>  this.handleMainClose(e,"פעילים")} style={styles.menuItem}>
                        { this.state.mainFilter === 'פעילים' ?
                        <i className="material-icons" style={{color:'#399fd0',marginLeft:'5px'}}>
                          check
                          </i>
                          :
                          <span style={{width:'30px'}}></span>
                        }
                        פעילים
                        </MenuItem>
                        <MenuItem onClick={(e) =>  this.handleMainClose(e,"אירועים")} style={styles.menuItem}>
                        { this.state.mainFilter === 'אירועים' ?
                        <i className="material-icons" style={{color:'#399fd0',marginLeft:'5px'}}>
                          check
                          </i>
                          :
                          <span style={{width:'30px'}}></span>
                        }
                        אירועים
                        </MenuItem>
                        <MenuItem onClick={(e) =>  this.handleMainClose(e,"משתמשים")} style={styles.menuItem}>
                        { this.state.mainFilter === 'משתמשים' ?
                        <i className="material-icons" style={{color:'#399fd0',marginLeft:'5px'}}>
                          check
                          </i>
                          :
                          <span style={{width:'30px'}}></span>
                        }
                        משתמשים
                        </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
          </div>
           </div>
        </div>
         </div>
       
        )
    }
  }



export default FilterBar;
