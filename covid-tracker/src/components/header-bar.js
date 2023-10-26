

export const HeaderBar = ()=>{
  

  return (
    <div style={{color: 'white', fontSize: 24, fontWeight: 700 ,display: 'flex', flexDirection:'row', justifyContent:'space-between',paddingRight: 60, paddingLeft: 60, paddingTop: 30, paddingBottom: 30, width: 'auto', backgroundColor: 'orange'}}>
     <span>National Covid Data for the United States</span>
     <span>Data gathered from CovidTrackingAPI</span>
    </div>
  )
}