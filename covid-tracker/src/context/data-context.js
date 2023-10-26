import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import axios from 'axios'
const endpointUrl = 'https://api.covidtracking.com/v1/'



const DataContext = createContext()

 const DataProvider = ({children}) =>{
  const [covidData, setCovidData] = useState([])
  const [dataByDate, setDataByDate] = useState({})
  const [usDataByDate, setUsDataByDate] = useState({})
  const [usaCovidData, setUsaCovidData] = useState([])
  const [usDateFilter, setUsDateFilter] = useState({date:''})
  const [filters, setFilters] = useState({stateName: '', state: '', date: ''})

  useEffect(()=>{
    axios.get(`${endpointUrl}us/daily.json`).then((resp)=>{
      setUsaCovidData(resp.data.reverse())
    })
    if(usDateFilter.date){
      axios.get(`${endpointUrl}us/${usDateFilter.date}.json`).then((resp)=>{
        setUsDataByDate(resp.data)
      })
    }
    if(filters.state && !filters.date){
      axios.get(`${endpointUrl}states/${filters.state}/daily.json`).then((resp)=>{
        setCovidData(resp.data.reverse())
      })
    }
    if(filters.state && filters.date){
      axios.get(`${endpointUrl}states/${filters.state}/${filters.date}.json`).then((resp)=>{
        setDataByDate(resp.data)
      })
    }
  },[filters, usDateFilter])

  const contextValue =  useMemo(()=>({
    covidData,
    setCovidData,
    filters,
    setFilters,
    usaCovidData,
    setUsaCovidData,
    dataByDate,
    usDataByDate,
    usDateFilter, 
    setUsDateFilter

  }),[covidData, dataByDate, filters, usDataByDate, usDateFilter, usaCovidData])

  return(
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  )
}

const useData = () =>{
  const context = useContext(DataContext)
  if(context === null){
    throw new Error('Error')
  }
  return context
}

export {DataProvider, useData}