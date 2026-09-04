export function StatCard({label,value,delta,direction='flat',hint,className='',...rest}){
  return <div className={('stat '+className).trim()} {...rest}>
    <div className="stat-label">{label}</div>
    <div className="stat-value">{value}</div>
    {delta&&<div className={'stat-delta delta-'+direction}>{direction==='up'?'\u2191':direction==='down'?'\u2193':''} {delta}</div>}
    {hint&&<div className="hint" style={{marginTop:4}}>{hint}</div>}
  </div>;
}
