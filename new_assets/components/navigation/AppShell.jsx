export function AppShell({brand='Emplora',org,nav=[],active,topbar,children,footer}){
  return <div className="shell">
    <aside className="sidebar">
      <div className="brand"><span className="brand-mark">E</span>{brand}</div>
      {org&&<div style={{padding:'0 8px 8px',fontSize:'var(--text-xs)',color:'var(--color-text-subtle)'}}>{org}</div>}
      {nav.map((g,i)=><div key={i}>
        {g.label&&<div className="nav-group">{g.label}</div>}
        <div className="stack gap-1">
          {(g.items||[]).map(it=><a key={it.label} href={it.href||'#'} className={'nav-item'+(it.label===active?' is-active':'')}>{it.icon}{it.label}{it.count!=null&&<span className="count">{it.count}</span>}</a>)}
        </div>
      </div>)}
      <div style={{marginTop:'auto'}}>{footer}</div>
    </aside>
    <main style={{minWidth:0}}>
      {topbar&&<div className="topbar">{topbar}</div>}
      {children}
    </main>
  </div>;
}
export function PageHeader({title,sub,actions,tabs}){
  return <div>
    <div className="page-head"><div><div className="page-title">{title}</div>{sub&&<div className="page-sub">{sub}</div>}</div>{actions&&<div className="row gap-2">{actions}</div>}</div>
    {tabs}
  </div>;
}
