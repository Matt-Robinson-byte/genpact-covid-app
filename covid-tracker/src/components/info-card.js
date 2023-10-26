

export const InfoCard = ({death, positive, hospitalizedCurrently})=>{

  const InfoData = ({infoTitle, infoText})=>{
    return(
      <div style={{display:"flex", flexDirection:"row", marginTop: 5}}>
        <span style={{fontSize: 14, fontWeight: 600}}>
        {infoTitle}:
        </span>
        <span style={{fontSize: 14, marginLeft: 10}}>
          {infoText}
        </span>
      </div>
    )
  }
  return(
    <div style={{paddingLeft: 30, marginTop:20}}>
     <InfoData infoTitle={'Deaths'} infoText={death ?? ''}/>
     <InfoData infoTitle={'Hospitalized'} infoText={hospitalizedCurrently ?? ''}/>
     <InfoData infoTitle={'Confirmed Positive Cases'} infoText={positive?? ''}/>
    </div>
  )
}