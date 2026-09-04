export function Alert({tone='info',title,children,actions,className=''}){
  return <div className={('alert alert-'+tone+' '+className).trim()}>
    <div style={{flex:1,minWidth:0}}>{title&&<div className="alert-title">{title}</div>}<div>{children}</div></div>
    {actions&&<div className="row gap-2">{actions}</div>}
  </div>;
}
