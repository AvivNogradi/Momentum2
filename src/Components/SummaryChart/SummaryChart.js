import React, {Component} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, Tooltip,ResponsiveContainer } from 'recharts';
import CustomizedTooltip from '../CustomizedTooltip/CustomizedTooltip'


const data = [
    {name: new Date(1986,5,13), תומכים:200000,מתלבטים:150000, מתנגדים:215000,חסר:350000,פעילים: 146000, date:new Date(1986,5,13)},
    {name:new Date(1986,5,14), תומכים:250000,מתלבטים:185000, מתנגדים:212000,חסר:330400,פעילים: 144200},
    {name:new Date(1986,5,15), תומכים:140000,מתלבטים:285500, מתנגדים:115000,חסר:325000,פעילים: 136000},
    {name:new Date(1986,5,16), תומכים:120000,מתלבטים:160000, מתנגדים:115600,חסר:250000,פעילים: 237000},
    {name:new Date(1986,5,17), תומכים:200000,מתלבטים:187000, מתנגדים:117000,חסר:330000,פעילים: 141000},
    {name:new Date(1986,5,18), תומכים:250000,מתלבטים:120000, מתנגדים:190100,חסר:335000,פעילים: 252000},
    {name:new Date(1986,5,19), תומכים:256000,מתלבטים:145000, מתנגדים:114000,חסר:370000,פעילים: 137000},

];

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
        height:'60%',
        margin:'50px auto',
        boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
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

        }
    }

    getDateFormat(date){
     
       let dayOfWeek = date.getDay();
        let day = date.getDate();
        let month = date.getMonth();
        let tempYear = date.getFullYear().toString();
        let year = tempYear.substring(2,4)
        let newDate = `${day}.${month}.${year}`
       let myDayOfWeek = daysOfWeek[dayOfWeek]

        return newDate + "\n" + myDayOfWeek;
    }

    

    render(){

       let newData = data.forEach(el => {
        
            el.name = this.getDateFormat(el.name)
        })
        this.data = newData
        // let lines =  data.map(el => {
        //     console.log(el.dataKey)})
        //     if(el.dataKey === 'חסר'){
        //         return  <Line type="monotone" dataKey='לא ידוע' stroke={el.stroke} />
        //     }
        //     else{
        //         return  <Line type="monotone" dataKey={el.dataKey} stroke={el.dataKey.stroke} />
        //     }
            
        // });

        return(
            <div style={styles.chart}>
            <div style={styles.chartTitle}>
                <h2 style={{position:'absolute'}}>דוח מסכם</h2>
            </div>
            
                <ResponsiveContainer width="100%" height="90%" >
                <LineChart  data={data}
                        margin={{ top: 15, right: 0, left: 20, bottom: 15 }}>
                        <CartesianGrid  vertical={false}/>
                        <XAxis 
                         dataKey="name"
                         interval={0} 
                         tickMargin={10} 
                         tickLine={false}
                         axisLine={false}  
                         padding={{left:100, right:100}}
                         
                         />
                        <YAxis tickLine={false} axisLine={false} />
                        <Tooltip content={<CustomizedTooltip data={data} />}/>
                        <Legend verticalAlign="top" align="left" wrapperStyle={{top:"-8px"}}/>
                        <Line type="monotone" dataKey="תומכים" stroke="#33adff" />
                        <Line type="monotone" dataKey="מתלבטים" stroke="#ff751a" />
                        <Line type="monotone" dataKey="מתנגדים" stroke="#00cc99" />
                        <Line name="לא ידוע" type="monotone" dataKey="חסר" stroke="#ffcc00" />
                        <Line type="monotone" dataKey="פעילים" stroke="#b366ff" />  
                    </LineChart>
                </ResponsiveContainer>
            
                
            </div>
           
        )
    }
    
}

export default SummaryChart;