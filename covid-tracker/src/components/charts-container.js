import React from 'react';
import {Bar} from 'react-chartjs-2'
import { useData } from '../context/data-context'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField';
import { states } from '../models/states'
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { InfoCard } from './info-card';


const maxDate = dayjs(new Date(2021,2,7))
const minDate = dayjs(new Date(2020,0,13))




export const ChartsContainer = () =>{
  Chart.register(CategoryScale);
  const { covidData, filters, usaCovidData, setFilters, dataByDate, usDataByDate, setUsDateFilter } = useData()
  const usaChartData = {
    labels: usaCovidData.map((item)=>item.date),
    datasets: [
        {
          label: `Covid Deaths in the United States`,
          data: usaCovidData.map((item)=>item.death),
         
          backgroundColor: [
            'rgba(0, 0, 0, 0.6)',
           
          ],
          borderWidth: 1,
        }
    ]
}
const emptyChartData = {
  labels: usaCovidData.map((item)=>item.date),
  datasets: [
      {
        label: `Select a state to view related Covid Data`,
        data:[],
       
        backgroundColor: [
          'rgba(0, 0, 0, 0.6)',
         
        ],
        borderWidth: 1,
      }
  ]
}
  const chartData = {
    labels: covidData.map((item)=>item.date),
    datasets: [
        {
          label: `Covid Deaths in ${filters.stateName}`,
          data: covidData.map((item)=>item.death),
         
          backgroundColor: [
            'rgba(0, 0, 0, 0.6)',
           
          ],
          borderWidth: 1,
        }
    ]
}

const getStateInput = (event,val) => {
  console.log(val)
  return val ?  setFilters(prev=>({...prev, stateName:val.label , state: val.abbreviation.toLowerCase()})): undefined
}
const getDateInput = (val) => {
  const date = dayjs(val).format('YYYYMMDD')
  console.log()
  return val ?  setFilters(prev=>({...prev, date })): undefined
}
const getUsDateInput = (val) => {
  const date = dayjs(val).format('YYYYMMDD')

  return val ?  setUsDateFilter(prev=>({...prev, date })): undefined
}



  return(
    <div style={{display: 'flex',marginTop: 30, flexDirection: 'row', flexWrap: 'wrap', width: '100%', justifyContent: 'space-around', height: 'auto'}}>
      <div >
      <DatePicker maxDate={maxDate} minDate={minDate}  style={{width: 300 }} onChange={(value)=>{
       getUsDateInput(value)
      }}/>
        <div style={{ border: 'orange solid 4px', padding: 30, borderRadius: 10, marginTop: 30}}>
          <Bar height={300} width={600}  data={usaChartData}/>
        </div>
        {Object.keys(usDataByDate).length !== 0 ? <InfoCard {...usDataByDate}/>: null}
      </div>
      <div>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30}}>
        <Autocomplete 
          style={{width: 300}}
          disablePortal
          options={states} 
          renderInput={(params)=>{
            console.log()
            return(<TextField {...params} label="State"/>)}}  
          onChange={getStateInput}
          />
        <DatePicker disabled={!covidData.length} maxDate={maxDate} minDate={minDate}  style={{width: 300}} onChange={(value)=>{
        getDateInput(value)
        }}/>
      </div>
        {covidData.length ? 
        <div style={{ border: 'orange solid 4px', padding: 30, borderRadius: 10}}>
          <Bar height={300} width={600}   data={chartData}/>
        </div>
        :
        <div style={{ border: 'orange solid 4px', padding: 30, borderRadius: 10}}>
          <Bar height={300} width={600}   data={emptyChartData}/>
        </div>}
          {Object.keys(dataByDate).length !== 0 ?<InfoCard {...dataByDate}/>: null}
      </div>
    </div>
  )
}