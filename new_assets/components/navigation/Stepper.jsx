export function Stepper({steps=[],current=0,className=''}){
  return <div className={('stepper '+className).trim()}>
    {steps.map((s,i)=>{const label=typeof s==='string'?s:s.label;const state=i<current?'is-done':i===current?'is-current':'';
      return <React.Fragment key={label}>
        {i>0&&<span className="step-line"/>}
        <span className={('step '+state).trim()}><span className="step-dot">{i<current?'\u2713':i+1}</span>{label}</span>
      </React.Fragment>;})}
  </div>;
}
