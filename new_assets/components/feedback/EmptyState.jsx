export function EmptyState({title,children,action,className=''}){
  return <div className={('empty '+className).trim()}>
    <h4>{title}</h4>
    {children&&<p>{children}</p>}
    {action&&<div style={{marginTop:8}}>{action}</div>}
  </div>;
}
