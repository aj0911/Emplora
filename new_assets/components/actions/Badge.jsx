export function Badge({tone='neutral',dot=true,square,children,className='',...rest}){
  const cls=['badge','badge-'+tone,dot?'':'badge-plain',square?'badge-square':'',className].filter(Boolean).join(' ');
  return <span className={cls} {...rest}>{children}</span>;
}
