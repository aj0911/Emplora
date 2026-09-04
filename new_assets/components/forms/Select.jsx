export function Select({label,hint,error,required,options=[],placeholder,id,className='',...rest}){
  const fid=id||('se-'+Math.random().toString(36).slice(2,8));
  const opts=options.map(o=>typeof o==='string'?{value:o,label:o}:o);
  return <div className="field">
    {label&&<label htmlFor={fid} className={required?'label-req':undefined}>{label}</label>}
    <select id={fid} className={('select '+(error?'input-invalid ':'')+className).trim()} {...rest}>
      {placeholder&&<option value="">{placeholder}</option>}
      {opts.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
    {error?<span className="error">{error}</span>:hint?<span className="hint">{hint}</span>:null}
  </div>;
}
