export function Modal({open=true,title,children,actions,onClose,width=480,className=''}){
  if(!open)return null;
  return <div className="dialog-backdrop" onClick={onClose}>
    <div className={('dialog '+className).trim()} style={{width:'min('+width+'px,100%)'}} role="dialog" aria-modal="true" onClick={e=>e.stopPropagation()}>
      <div className="dialog-head"><div className="dialog-title">{title}</div><button type="button" className="btn btn-ghost btn-sm btn-icon" onClick={onClose} aria-label="Close">\u00d7</button></div>
      <div className="dialog-body">{children}</div>
      {actions&&<div className="dialog-actions">{actions}</div>}
    </div>
  </div>;
}
