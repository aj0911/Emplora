export function Input({label,hint,error,required,prefix,money,id,className='',...rest}){
  const fid=id||('in-'+Math.random().toString(36).slice(2,8));
  const cls=['input',money?'input-money':'',error?'input-invalid':'',className].filter(Boolean).join(' ');
  const control=prefix
    ? <div className="input-affix"><span className="affix">{prefix}</span><input id={fid} className={cls} {...rest}/></div>
    : <input id={fid} className={cls} {...rest}/>;
  return <div className="field">
    {label&&<label htmlFor={fid} className={required?'label-req':undefined}>{label}</label>}
    {control}
    {error?<span className="error">{error}</span>:hint?<span className="hint">{hint}</span>:null}
  </div>;
}
export function Textarea({label,hint,error,required,id,className='',...rest}){
  const fid=id||('ta-'+Math.random().toString(36).slice(2,8));
  return <div className="field">
    {label&&<label htmlFor={fid} className={required?'label-req':undefined}>{label}</label>}
    <textarea id={fid} className={('textarea '+(error?'input-invalid ':'')+className).trim()} {...rest}/>
    {error?<span className="error">{error}</span>:hint?<span className="hint">{hint}</span>:null}
  </div>;
}
