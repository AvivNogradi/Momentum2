import React, {Component} from 'react'
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

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
    areaAndTimeFilters: {

    }
  };

class FilterBar extends Component {
    constructor(props){
        super(props)

        this.state = {
            mainOpen:false,
            areaOpen:false,
            timeOpen:false,
           mainFilter: 'ראשי',
           areaFilter: 'הכל',
           timeFilter: '7 ימים אחרונים'
        }
    }



    handleMainToggle = () => {
     
     let tempMainOpen = this.state.mainOpen
     if(tempMainOpen == true){
        this.setState(state => ({ mainOpen: false }));
      }
      else{
        this.setState(state => ({ mainOpen: true }));
      }

    }
      handleMainClose = (event,value) => {
       
       if(value){

          this.setState({mainFilter:value})
          if (this.mainAnchorEl.contains(event.target)) {
            return;
          }
        }
        if(!(event.screenX > 1109 && event.screenX < 1182 && event.screenY > 65 && event.screenY < 98))
          this.setState({ mainOpen: false });
        
      };

      handleAreaToggle = () => {
        this.setState(state => ({ areaOpen: !this.state.areaOpen }));
      };
    
      handleAreaClose = (event,value) => {

        if(value){
          this.setState({areaFilter:value})
          if (this.areaAnchorEl.contains(event.target)) {
            return;
          }
        }
     
        if(!(event.screenX > 273 && event.screenX < 341 && event.screenY > 65 && event.screenY < 98))
        this.setState({ areaOpen: false });
      };

      handleTimeToggle = () => {
        this.setState(state => ({ timeOpen: !state.timeOpen }));
      };
    
      handleTimeClose = (event,value) => {
        console.log(event,value)
        if(value){
          this.setState({timeFilter:value})
          if (this.timeAnchorEl.contains(event.target)) {
            return;
          }
        }
     
        if(!(event.screenX > 133 && event.screenX < 258 && event.screenY > 65 && event.screenY < 98))
        this.setState({ timeOpen: false });
      };


    render(){
        const { classes } = this.props;
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
                <Paper>
                  <ClickAwayListener onClickAway={this.handleTimeClose}>
                    <MenuList>
                      <MenuItem onClick={(e) =>  this.handleTimeClose(e,'7 ימים אחרונים')} style={{color:'#757575'}}>&nbsp; ימים אחרונים &nbsp;<span> 7 </span></MenuItem>
                      <MenuItem onClick={(e) =>  this.handleTimeClose(e,'30 ימים אחרונים')} style={{color:'#757575'}}>&nbsp; ימים אחרונים &nbsp;<span> 30 </span></MenuItem>
                      <MenuItem onClick={(e) =>  this.handleTimeClose(e,"90 ימים אחרונים")} style={{color:'#757575'}}>&nbsp; ימים אחרונים &nbsp;<span> 90 </span></MenuItem>
                      <MenuItem onClick={(e) =>  this.handleTimeClose(e,"180 ימים אחרונים")} style={{color:'#757575'}}>&nbsp; ימים אחרונים &nbsp;<span> 180 </span></MenuItem>
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
       >
       <i className="material-icons" style={{color:'#399fd0'}}>
           keyboard_arrow_down
        </i>
        <span style={{fontWeight: 'bold', fontSize:'initial'}}>{this.state.areaFilter}</span> 
          </Button>
          <span style={{color:'#757575'}}>אזור/ישוב</span>
            
          <Popper open={areaOpen} anchorEl={this.areaAnchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleAreaClose}>
                    <MenuList >
                      <MenuItem onClick={(e) =>  this.handleAreaClose(e,"ראשי")} style={{color:'#757575'}}>חיפוש</MenuItem>
                      <Divider />
                      <MenuItem onClick={(e) =>  this.handleAreaClose(e,"הכל")} style={{color:'#757575'}}>הכל</MenuItem>
                      <MenuItem onClick={(e) =>  this.handleAreaClose(e,"צפון")} style={{color:'#757575'}}>צפון</MenuItem>
                      <MenuItem onClick={(e) =>  this.handleAreaClose(e,"מרכז")} style={{color:'#757575'}}>מרכז</MenuItem>
                      <MenuItem onClick={(e) =>  this.handleAreaClose(e,"דרום")} style={{color:'#757575'}}>דרום</MenuItem>
                      <Divider />
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
         onClick={() => this.handleMainToggle()}
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
                <Paper>
                  <ClickAwayListener onClickAway={this.handleMainClose}>
                    <MenuList>
                        <MenuItem onClick={(e) =>  this.handleMainClose(e,"ראשי")} style={{color:'#757575'}}>ראשי</MenuItem>
                        <MenuItem onClick={(e) =>  this.handleMainClose(e,"בוחרים")} style={{color:'#757575'}}>בוחרים</MenuItem>
                        <MenuItem onClick={(e) =>  this.handleMainClose(e,"פעילים")} style={{color:'#757575'}}>פעילים</MenuItem>
                        <MenuItem onClick={(e) =>  this.handleMainClose(e,"אירועים")} style={{color:'#757575'}}>אירועים</MenuItem>
                        <MenuItem onClick={(e) =>  this.handleMainClose(e,"משתמשים")} style={{color:'#757575'}}>משתמשים</MenuItem>
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
