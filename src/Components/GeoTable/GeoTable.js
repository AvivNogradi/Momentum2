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

import Divider from '@material-ui/core/Divider';

import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const filter = require('../../Assets/filter.png');

let id = 0;
function createData(ישוב, אזור, מתנגדים, מתלבטים, תומכים, מטרה, פער) {
  id += 1;
  return { ישוב, אזור, מתנגדים, מתלבטים, תומכים, מטרה, פער};
}

const data = [
    { id: 'ישוב', numeric: true, disablePadding: true, label: 'ישוב' },
    { id: 'אזור', numeric: true, disablePadding: true, label: 'אזור' },
    { id: 'מתנגדים', numeric: true, disablePadding: true, label: 'מתנגדים' },
    { id: 'מתלבטים', numeric: true, disablePadding: true, label: 'מתלבטים' },
    { id: 'תומכים', numeric: true, disablePadding: true, label: 'תומכים' },
    { id: 'מטרה', numeric: true, disablePadding: true, label: 'מטרה' },
    { id: 'פער', numeric: true, disablePadding: true, label: 'פער' },
  ];

const rows = [
  createData('חיפה', 'צפון', 100000, 50000, 5000, 35000, 10000 ),
  createData('באר-שבע','דרום',120000, 20000, 4500, 15000, 6000),
  createData('ירושלים','ירושלים', 70000, 40000, 25000, 65000, 25000),
  createData('תל-אביב','מרכז', 250000, 82000, 35000, 68000, 36000),
  createData('נהריה','חיפה', 130000, 57000, 3000, 31000, 7000),
  createData('קרית-ים','חיפה', 130000, 57000, 3000, 31000, 7000),
  createData('עכו','חיפה', 130000, 57000, 3000, 31000, 7000),
  createData('עכו','חיפה', 130000, 57000, 3000, 31000, 7000),
  createData('עכו','חיפה', 130000, 57000, 3000, 31000, 7000),
  createData('עכו','חיפה', 130000, 57000, 3000, 31000, 7000),
  createData('עכו','חיפה', 130000, 57000, 3000, 31000, 7000),
  createData('עכו','חיפה', 130000, 57000, 3000, 31000, 7000),
  createData('עכו','חיפה', 130000, 57000, 3000, 31000, 7000),
  createData('עכו','חיפה', 130000, 57000, 3000, 31000, 7000),
  createData('עכו','חיפה', 130000, 57000, 3000, 31000, 7000),
  
].sort((a, b) => (a.calories < b.calories ? -1 : 1))



const styles = {
    tableWrapper: {
        display:'flex',
        flexDirection:'row-reverse',
        backgroundColor:'white',
        width:'80%',
        minHeight:'700px',
        margin:'50px auto',
        boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)',

    },
    root: {
        padding:'0 30px',
        height: '555px',
      },
      table: {
        minWidth: 750,
        direction:'rtl',
        
      },
      chartTitle: {
        display: 'flex',
        justifyContent: 'flex-end',
        height:'100%',
        width:'100%',
        marginRight: '30px',
    },
    footer:{ 
        justifyContent:'flex-start',
    },
    paginator: {
        color:'grey',
    }
}


class GeoTable extends Component {
    constructor(props){
        super(props)

        this.state = {
            page: 0,
            rowsPerPage: 10,
            order: 'asc',
            orderBy: 'ישוב',
            selected: [],
        }
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
    render(){
        const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, rows.length - this.state.page * this.state.rowsPerPage);

        return(
          <div style={styles.tableWrapper}>
          <div style={styles.chartTitle}>
                <h2 style={{position:'absolute'}}>פריסה גאוגרפית</h2>
            </div>
            <div style={{display:'flex', flexDirection:'column'}}>
            <div style={{display: 'flex',alignItems: 'center',padding:'20px'}}>
               <div  style={{borderRight: '0.1em solid grey', padding: '0.5em'}}>
                  <img src={filter} style={{cursor:'pointer'}}/>
               </div>
                <i class="material-icons" style={{margin:'0 10px',cursor:'pointer'}}>
                   save_alt
                </i>
                <span style={{fontSize:'20px'}}>יצוא</span>
            </div>
              
    <Paper style={styles.root}>
      <Table 
      style={styles.table}
      order={this.state.order}
      orderBy={this.state.orderBy}
      onRequestSort={this.handleRequestSort}>
         <TableHead>
           <TableRow>
          {data.map( (row, index) => {
              let modifieCelldStyle = {cursor:'pointer'}
              let modifiedSortLabelStyle = {transform:'translate(30px,15px)',padding:0}
              if(row.id === "ישוב" ){
                modifieCelldStyle = {cursor:'pointer',paddingTop:'20px'}
                modifiedSortLabelStyle = {padding:0}
              }
              if(row.id === "אזור" ){
                modifieCelldStyle = {cursor:'pointer',paddingTop:'20px',paddingRight:'50px'}
                modifiedSortLabelStyle = {padding:0}
              } 
              return (
                  
                <TableCell
                    sortDirection={this.state.orderBy === row.id ? this.state.order : false}
                    key={row.id}
                    numeric={row.numeric}
                    onClick={this.createSortHandler(row.id)}
                    style={modifieCelldStyle}
                >
                <TableSortLabel
                    style={modifiedSortLabelStyle}
                    active={this.state.orderBy === row.id}
                    direction={this.state.order}
                    onClick={this.createSortHandler(row.id)}
                />
                   <span>{row.label}</span>
                </TableCell>
               
              )
            }, this)}
            </TableRow>
          </TableHead>
        <TableBody>
        {this.stableSort(rows, this.getSorting(this.state.order, this.state.orderBy)).slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(row => {
            return (
              <TableRow key={row.id}>
                <TableCell key={row.id} component="th" scope="row" sortDirection={this.state.orderBy === row.id ? this.state.order : false}>
                  {row.ישוב}
                </TableCell>
                <TableCell>{row.אזור}</TableCell>
                <TableCell numeric>{row.מתנגדים}</TableCell>
                <TableCell numeric>{row.מתלבטים}</TableCell>
                <TableCell numeric>{row.תומכים}</TableCell>
                <TableCell numeric>{row.מטרה}</TableCell>
                <TableCell numeric>{row.פער}</TableCell>
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
                  count={rows.length}
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
        )
    }
}

export default GeoTable;