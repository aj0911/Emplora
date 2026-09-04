export function Button({variant='secondary',size='md',icon,iconRight,block,children,className='',...rest}){
  const cls=['btn','btn-'+variant,size!=='md'?'btn-'+size:'',children==null?'btn-icon':'',block?'btn-block':'',className].filter(Boolean).join(' ');
  return <button type="button" className={cls} {...rest}>{icon}{children}{iconRight}</button>;
}
export function ButtonGroup({children,className=''}){return <div className={('btn-group '+className).trim()}>{children}</div>;}
