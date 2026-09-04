export function Checkbox({label,description,type='checkbox',className='',...rest}){
  return <label className={('check '+className).trim()}>
    <input type={type} {...rest}/>
    <span>
      <span style={{display:'block'}}>{label}</span>
      {description&&<span className="hint" style={{display:'block'}}>{description}</span>}
    </span>
  </label>;
}
