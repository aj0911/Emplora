function initials(name=''){
  const p=String(name).trim().split(/\s+/).filter(Boolean);
  return ((p[0]||'')[0]||'').concat((p[1]||'')[0]||'').toUpperCase();
}
export function Avatar({name,src,size='md',className='',...rest}){
  const cls=['avatar',size!=='md'?'avatar-'+size:'',className].filter(Boolean).join(' ');
  return <span className={cls} title={name} {...rest}>{src?<img src={src} alt={name||''}/>:initials(name)}</span>;
}
export function PersonCell({name,meta,src,size='md'}){
  return <div className="cell-person"><Avatar name={name} src={src} size={size}/><div className="who"><div className="nm">{name}</div>{meta&&<div className="sub">{meta}</div>}</div></div>;
}
export function AvatarStack({people=[],max=3}){
  const shown=people.slice(0,max),rest=people.length-shown.length;
  return <span className="avatar-stack">{shown.map((p,i)=><Avatar key={i} name={typeof p==='string'?p:p.name} src={typeof p==='string'?undefined:p.src} size="sm"/>)}{rest>0&&<span className="avatar avatar-sm" style={{background:'var(--color-surface-inset)',color:'var(--color-text-muted)'}}>+{rest}</span>}</span>;
}
