import React, {Component} from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActions from '../TablePaginationAction/TablePaginationAction'
import TableSortLabel from '@material-ui/core/TableSortLabel';
import FilterBar from '../FilterBar/FilterBar'

import { library } from '@fortawesome/fontawesome-svg-core'
// import { faFilter } from '@fortawesome/free-solid-svg-icons'

// library.add(faFilter)

const usersApiData = require('../../Assets/usersApiData.json'); 
const myFilter = require('../../Assets/filter.png');


let id = 0
function createData(משתמש, תפקיד, ישוב, אזור, ביקוראחרון, מספרביקורים) {

    id += 1
  
  מספרביקורים = parseInt(מספרביקורים, 10)
  
 
  return {משתמש, תפקיד, ישוב, אזור, ביקוראחרון, מספרביקורים, id};
}

const data = [
    { id: 'משתמש', numeric: true, disablePadding: true, label: 'משתמש' },
    { id: 'תפקיד', numeric: true, disablePadding: true, label: 'תפקיד' },
    { id: 'ישוב', numeric: true, disablePadding: true, label: 'ישוב' },
    { id: 'אזור', numeric: true, disablePadding: true, label: 'אזור' },
    { id: 'ביקוראחרון', numeric: true, disablePadding: true, label: 'ביקור אחרון' },
    { id: 'מספרביקורים', numeric: true, disablePadding: true, label: 'מספר ביקורים' },
  ];


const styles = {

    tableAndSmallScreenTitleWrapper: {
        height:'100%',
        backgroundColor: 'rgb(242, 242, 242)',
    },
    tableWrapper: {
        display:'flex',
        flexDirection:'column',
        width:'80%',
        minHeight:'710px',
        margin:'50px auto',
        boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
        overflowY:'auto',
        backgroundColor:'white'
    },
    root: {
        padding:'0 30px',
        height: '555px',
        width: '80%',
      },
      table: {
        minWidth: 750,
        direction:'rtl',
        width:'100%',
       
        
      },
      chartTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection:'row-reverse',
        height:'100%',
        width:'100%',
        marginRight: '30px',
    },
    footer:{ 
        justifyContent:'flex-start',
    },
    paginator: {
        color:'grey',
    },
    smallScreentableTitle:{
        backgroundColor:'#00ace6', 
        display:'none',  
        width:'80%', 
        justifyContent:'space-between',
        alignItems:'center',
        fontSize:'13px',
    },
    FilterBar: {
        width: '80%',
        margin: '0 auto',
        zIndex:200,
    },
}


class ActivistsGeoTable extends Component {
    constructor(props){
        super(props)

        this.state = {
            page: 0,
            rowsPerPage: 10,
            order: 'asc',
            orderBy: 'ישוב',
            selected: [],
            usersApiData:[],
        }
    }

    componentWillMount(){
        let tempusersApiData = this.handleApiJsonData(usersApiData);
      setTimeout(() => {
        this.setState({usersApiData:tempusersApiData})
      })
        
    }
    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';
    
        if (this.state.orderBy === property && this.state.order === 'desc') {
          order = 'asc';
        }
    
        this.setState({ order:order, orderBy:orderBy });
      };

    createSortHandler = property => event => {
        this.handleRequestSort(event, property);
      };
    
     desc(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
          return -1;
        }
        if (b[orderBy] > a[orderBy]) {
          return 1;
        }
        return 0;
      }
      
      stableSort(array, cmp) {
     
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
          const order = cmp(a[0], b[0]);
          if (order !== 0) return order;
          return a[1] - b[1];
        });
        return stabilizedThis.map(el => el[0]);
      }
      
     getSorting(order, orderBy) {
        return order === 'desc' ? (a, b) => this.desc(a, b, orderBy) : (a, b) => -this.desc(a, b, orderBy);
      }

      createSortHandler = property => event => {
        this.handleRequestSort(event, property);
      };

    handleChangePage = (event, page) => {
        this.setState({ page });
      };
    
      handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
      };

      dataForExcel(){
          let newDataArray = [];
          for(let i = 0;i < this.state.usersApiData.length; i++){
             newDataArray.push(createData(this.state.usersApiData[i]))
          }
          return newDataArray;
      }

      areaColorFiller(area){
         let areaActivists = 0;
         let areaActivistsTarget = 0;

          let gap = 0
          for(let i = 0; i < this.state.usersApiData.length; i++){
            if(this.state.usersApiData[i].אזור === area){
                areaActivists += this.state.usersApiData[i].פעילים
                areaActivistsTarget += this.state.usersApiData[i].יעדפעילים
                // if(this.state.apiTableData[i].מטרה > rows[i].תומכים){
                //     gap -= ((this.state.apiTableData[i].מטרה - this.state.apiTableData[i].תומכים) / this.state.apiTableData[i].מטרה) *100
                // } 
            
                // else{
                //     gap += ((this.state.apiTableData[i].תומכים - this.state.apiTableData[i].מטרה) / this.state.apiTableData[i].תומכים) *100
                // }
            }
          }
         if(areaActivists < areaActivistsTarget){
             gap = (areaActivistsTarget - areaActivists) / areaActivistsTarget *100
         }
          if(gap === 0){
              return 'green'
          }
          else if(gap > 0 && gap < 31){
              return 'orange'
          }
          else{
              return 'red'
          }
      }

      handleApiJsonData(JsonFile){
          let returnedFixedData = [];
          

          JsonFile.forEach(line => {
             let tempDate = new Date(parseInt(line.date, 10))
            let modifiedDate = this.getDateFormat(tempDate)
             line.ביקוראחרון = modifiedDate
              returnedFixedData.push(createData(line.משתמש, line.תפקיד, line.ישוב, line.אזור, line.ביקוראחרון, line.מספרביקורים))
          })
        
         return returnedFixedData;
      }

      getDateFormat(date){
     
        if(date.toString().length > 8){
          let day = date.getDate();
          let month = date.getMonth();
          let tempYear = date.getFullYear().toString();
          let year = tempYear.substring(2,4)
          let newDate = `${day}.${month}.${year}`
         
  
          return newDate
        }
    }

    dashBoardSelected(value){
        this.props.history.push({
            pathname: value,
            state : {
                dashboardSelected: value
            }
        })
    }
    render(){

        return(

            <div className="tableAndSmallScreenTitleWrapper" style={styles.tableAndSmallScreenTitleWrapper}> 
            <div style={{backgroundColor:'white'}}>
             <div style={styles.FilterBar}>
            <FilterBar dashBoardSelected={(value) => this.dashBoardSelected(value)} filterBarSelection={this.props.location.state.dashboardSelected}/>
            </div>             
              </div>
          <div className="tableWrapper" style={styles.tableWrapper}>
          
            <div className="tableAndMapWrapper" style={{display:'flex',justifyContent:'center'}}>
            
    <Paper className="root" style={styles.root}>
      <Table 
      style={styles.table}
      order={this.state.order}
      orderby={this.state.orderBy}
      >
         <TableHead>
           <TableRow>
          {data.map( (row, index) => {
              let modifieCelldStyle = {cursor:'pointer'}
              let modifiedSortLabelStyle = {padding:0}
            
              return (
                  
                <TableCell
                    sortDirection={this.state.orderBy === row.id ? this.state.order : false}
                    key={row.id}
                    numeric={row.numeric}
                    onClick={this.createSortHandler(row.id)}
                    style={modifieCelldStyle}
                >
                <span>{row.label}</span>
                <TableSortLabel
                    style={modifiedSortLabelStyle}
                    active={this.state.orderBy === row.id}
                    direction={this.state.order}
                    onClick={this.createSortHandler(row.id)}
                />
                   
                </TableCell>
               
              )
            }, this)}
            </TableRow>
          </TableHead>
        <TableBody>
        {this.stableSort(this.state.usersApiData, this.getSorting(this.state.order, this.state.orderBy)).slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(row => {
        
        
            return (
              <TableRow key={row.id}>
                <TableCell  style={{textAlign:'right'}} component="th" scope="row" sortDirection={this.state.orderBy === row.id ? this.state.order : false}>
                  {row.משתמש}
                </TableCell>
                <TableCell  style={{textAlign:'right'}}>{row.תפקיד}</TableCell>
                <TableCell  numeric>{row.ישוב}</TableCell>
                <TableCell  numeric>{row.אזור}</TableCell>
                <TableCell  numeric>{row.ביקוראחרון}</TableCell>
                <TableCell  numeric>{row.מספרביקורים}</TableCell>
              </TableRow>
            );
          })}
       
        </TableBody>
        <TableFooter style={styles.footer}>
              <TableRow >
                <TablePagination
                  labelDisplayedRows={({ from, to, count }) => `${from}-${to} מתוך ${count}`}
                  labelRowsPerPage={'שורות בעמוד:'}
                  style={{marginLeft:0, paddingLeft:0}}
                  colSpan={7}
                  count={this.state.usersApiData.length}
                  rowsPerPage={this.state.rowsPerPage}
                  page={this.state.page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
      </Table>
    </Paper>
            </div>
    
          </div>
          </div>
        )
    }
}

export default ActivistsGeoTable;