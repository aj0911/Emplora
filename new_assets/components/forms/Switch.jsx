export function Switch({label,description,className='',...rest}){
  return <label className={('switch '+className).trim()} style={{alignItems:description?'flex-start':'center'}}>
    <input type="checkbox" {...rest}/>
    <span>
      <span style={{display:'block'}}>{label}</span>
      {description&&<span className="hint" style={{display:'block'}}>{description}</span>}
    </span>
  </label>;
}
