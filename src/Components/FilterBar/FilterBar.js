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
      //   console.log("got to main close")
      //  if(value){

      //     this.setState({mainFilter:value})
      //     if (this.mainAnchorEl.contains(event.target)) {
      //       return;
      //     }
      //   }
      //    this.handleMainToggle();
      // if(e.path.indexOf('mainDropdaownButton') > 1) return;
      if(value){
        this.setState({ mainFilter:value});
      }
      this.setState({ mainOpen: false});
        
      };

      handleAreaToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.setState({ areaOpen: !this.state.areaOpen });
      };
    
      handleAreaClose = (event,value) => {
    
        event.preventDefault();
        event.stopPropagation();

        // if(value){
        //   this.setState({areaFilter:value})
        //   if (this.areaAnchorEl.contains(event.target)) {
        //     return;
        //   }
        // }
     
        if((event.target.parentElement.parentElement.classList)[4] === 'areaDropdaownButton') return;
        if(value && value.name){

          this.setState({ areaFilter:value.name, selectedArea:value});
          let displayedAreaCities = rawCities.filter(city => {
            if(value.name === 'הכל'){
              return true;
            }
            else{
              return city.areaName === value.name
            }
           
          });
          this.setState({displayedCities: displayedAreaCities,displayedAreaCities: displayedAreaCities})
          this.displayInitialCities(displayedAreaCities)
        }
        // else (value){
        //   this.setState({ areaFilter:value, selectedArea:value});
        // }
        this.setState({ areaOpen: false });
      };

      handleTimeToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.setState({ timeOpen: !this.state.timeOpen });
      };
    
      handleTimeClose = (event,value) => {
        event.preventDefault();
        event.stopPropagation();

        if(value){
         
          if (this.timeAnchorEl.contains(event.target)) {
          
          }
        }
     
        if((event.target.parentElement.parentElement.classList)[4] === 'timeDropdaownButton') return;
        if(value){
          this.setState({ timeFilter:value});
        }
        this.setState({ timeOpen: false });
      };

     loadNextTenCities(){
       
      let initial = initialDropDownCount;
      let end = endDropDownCount;
       let nextTenCities = this.state.displayedCities
       for(let i= initial; i < end; i++){
         if(this.state.rawSearch !== ''){
          nextTenCities.push(this.state.displayedCities[i])

         }
         if(this.state.selectedArea.name !== 'הכל' && this.state.rawSearch === ''){
          nextTenCities.push(this.state.displayedAreaCities[i])
         }
         else{
          nextTenCities.push(this.state.filteredCities[i])
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

     onChangeInput = (event) => {
     
      this.setState({rawSearch: event.target.value})

      let searchedCity = event.target.value

      var filteredCities = rawCities
      var displayedCities = filteredCities.filter(element => {
     
             let regex = new RegExp(searchedCity)
              if(regex.test(element && element.name) &&  (element.areaName === this.state.selectedArea.name || this.state.selectedArea.name === 'הכל') ){
                  return true
              }
          else{
            return false;  
          }
               
      })
  
         if(displayedCities.length !== 0){
           
          this.setState({ displayedCities:displayedCities, filteredCities:displayedCities, displayedAreas:[]})
          this.displayInitialCities(displayedCities)
         }
        
        //  else{
        //   this.displayInitialCities(rawCities);
        //   this.setState({displayedAreas:rawAreas})
        //  }
      }

   
    render(){
      
       let displayedCities = this.state.displayedCities
     let dropDownCities = displayedCities.map(el => {
       if(el && el._id){
        return <MenuItem key={el._id} onClick={(e) =>  this.handleAreaClose(e,el)} style={{color:'#757575',paddingRight:'5px'}}>
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

  
    let dropDownAreas = [];
    
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
  
     
  
        const { mainOpen } = this.state;
        const { areaOpen } = this.state;
        const { timeOpen } = this.state;

        return(
         <div style={styles.container}> 
         <div style={{display:'flex', justifyContent:'flex-end',width:'35%'}}>
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
       <i className="material-icons" style={{color:'#399fd0'}}>
           keyboard_arrow_down
        </i>
        <span style={{fontWeight: 'bold', fontSize:'initial', direction:'rtl'}}>{this.state.timeFilter}</span> 
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
        <span style={{fontWeight: 'bold', fontSize:'initial'}}>{this.state.areaFilter}</span> 
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
                       onChange={(event) => {this.setState({rawCitySearch: event.target.value}), this.onChangeInput(event)}}
                         style={{paddingTop:0,marginTop:0}}
                          id="search"
                          placeholder="חיפוש"
                          type="search"
                          InputProps={{
                          disableUnderline: true,
                          style: { marginRight: '12px'}
                       }}
                       InputLabelProps={{
                        style: {display:'flex',justifyContent:'flex-start',width:'100%', margin:'0 -12px'}
                        
                     }}
                        margin="normal"
                      
                      />
                      <Divider />
                      {
                     
                        (this.state.rawSearch === '' && this.state.areaFilter !== 'הכל')?
                        
                        <MenuItem onClick={(e) =>  this.handleAreaClose(e,{name:"הכל",_id:0} )} style={{color:'#757575',paddingRight:'5px'}}>
                        { this.state.areaFilter === 'הכל' ?
                          <i className="material-icons" style={{color:'#399fd0',marginLeft:'5px'}}>
                            check
                            </i>
                            :
                            <span style={{width:'30px'}}></span>
                          }
                        הכל
                        </MenuItem>
                        :
                        null
                      }
                      {dropDownAreas}
                      <Divider />
                      {dropDownCities}
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
        <span style={{fontWeight: 'bold', fontSize:'initial'}}>{this.state.mainFilter}</span> 
          </Button>
          <span style={{color:'#757575'}}>:דוחות</span>
            
        
        
          <Popper open={mainOpen} anchorEl={this.mainAnchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper style={{direction:'rtl'}}>
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
