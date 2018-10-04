import React, {Component} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, Tooltip,ResponsiveContainer} from 'recharts';
import CustomizedTick from '../CustomizedTick/CustomizedTick'

import eventsApiData from '../../Assets/eventsApiData.json'
import EventsCustomizedTooltip from '../CustomizedTooltip/EventsCustomizedTooltip';

const daysOfWeek = {
    0: 'יום ראשון',
    1: 'יום שני',
    2: 'יום שלישי',
    3: 'יום רביעי',
    4: 'יום חמישי',
    5: 'יום שישי',
    6: 'יום שבת',
}
   
   


const styles = {
    chart: {
        display:'flex',
        flexDirection:'row-reverse',
        backgroundColor:'white',
        alignItems:'center',
        width:'80%',
        height:'500px',
        margin:'50px auto',
        boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
        overflow: 'hidden',
        overflowX: 'visible',
    },
    chartTitle: {
        display: 'flex',
        justifyContent: 'flex-end',
        height:'100%',
        marginRight: '30px',
    },
}

  
class SummaryChart extends Component {
    constructor(props){
        super(props)

        this.state = {
            apiData: [],
            revisedDateAndDay:[],
        }
    }

    componentWillMount(){

        //mock api data
        setTimeout(() => {
          //  let FileContentArray= this.getJSONFileContent(__dirname +"apiData.json");
            
             this.setState({apiData:eventsApiData})
        }, 3000);

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

    getDayFromDate(date){
        let dayOfWeek = date.getDay();
        let myDayOfWeek = daysOfWeek[dayOfWeek]

        return myDayOfWeek;
    }

    setDateAndDay(){

        let alteredArray = this.state.apiData

        alteredArray.map(item=>{
            if(item.date.length > 8){
                let revisedDate = parseInt(item.date, 10)
                 let tempDate = new Date(revisedDate)
                 item.day = this.getDayFromDate(tempDate)
                 item.date = this.getDateFormat(tempDate)
            }
            item.אירועים = parseInt(item.אירועים, 10)
            item.נרשמים = parseInt(item.נרשמים, 10)
            item.תומכיםחדשים = parseInt(item.תומכיםחדשים, 10)
            return item;
        })

     return alteredArray
    }


  //simple json file reading function
  
//   getJSONFileContent(filepath) {
//     console.time("read JSON")
//     let jsonOfFile = JSON.parse(fs.readFileSync(filepath, 'utf8'));
  
//     console.timeEnd("read JSON");
//     console.log("entries in ", filepath, " file: ", jsonOfFile.length)
//     return jsonOfFile
//   }
    

    render(){

      let altered = this.setDateAndDay();
        return(

          <div className="chartAndSmallScreenTitleWrapper">
                <div className="smallScreenChartTitle" style={{backgroundColor:'#00ace6', display:'none',justifyContent:'flex-end',width:'80%'}}>
                     <h2 style={{color:'white',paddingRight: '10px',fontSize:'22px'}}>דוח מסכם</h2>
               </div>
             <div className="chart" style={styles.chart}>
                <div style={styles.chartTitle}>
                    <h2 className="bigScreenTitle" style={{position:'absolute'}}>דוח מסכם</h2>
                </div>
            
                <ResponsiveContainer minWidth={950} height="90%" style={{paddingTop:"10px"}}>
                    <LineChart data={altered}
                            margin={{ top: 15, right: 0, left: 20, bottom: 15 }}>
                            <CartesianGrid  vertical={false}/>
                            <XAxis
                            dataKey="date"
                            tick={<CustomizedTick data={altered} daysOfWeek={daysOfWeek}/>}
                            tickMargin={20} 
                            tickLine={false}
                            axisLine={false}  
                            padding={{left:0, right:130}}
                            />
                            <YAxis tickLine={false} axisLine={false} />
                            <Tooltip content={<EventsCustomizedTooltip data={altered} style={{width:'30px',color:'red',backgroundColor:'red'}}/>}/>
                            <Legend verticalAlign="top" align="left" wrapperStyle={{top:"-8px"}}/>
                            <Line type="monotone" dataKey="אירועים" stroke="#33adff" />
                            <Line type="monotone" dataKey="נרשמים" stroke="#ff751a" name="נרשמים לאירועים"/>
                            <Line type="monotone" dataKey="תומכיםחדשים" stroke="#00cc99" name="תומכים חדשים מאירועים"/>
                        </LineChart>
                </ResponsiveContainer>
            
                
              </div>
          </div>
        )
    }
    
}

export default SummaryChart;