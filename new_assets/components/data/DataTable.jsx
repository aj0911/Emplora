export function DataTable({columns=[],rows=[],selectable=false,rowKey,toolbar,footer,totalRow,emptyLabel='Nothing to show',onRowClick,className=''}){
  const [sort,setSort]=React.useState(null);
  const [sel,setSel]=React.useState([]);
  const key=(r,i)=>rowKey?r[rowKey]:i;
  const sorted=React.useMemo(()=>{
    if(!sort)return rows;
    const c=columns.find(c=>c.key===sort.key);
    const get=r=>c&&c.sortValue?c.sortValue(r):r[sort.key];
    return rows.slice().sort((a,b)=>{const x=get(a),y=get(b);return (x>y?1:x<y?-1:0)*(sort.dir==='asc'?1:-1);});
  },[rows,sort,columns]);
  const toggle=k=>setSel(s=>s.includes(k)?s.filter(x=>x!==k):s.concat(k));
  const allOn=sel.length>0&&sel.length===rows.length;
  return <div className={('table-wrap '+className).trim()}>
    {(toolbar||sel.length>0)&&<div className="table-toolbar">
      {sel.length>0?<><b style={{fontSize:'var(--text-sm)'}}>{sel.length} selected</b><span className="grow"/></>:toolbar}
    </div>}
    <div style={{overflow:'auto'}}>
      <table className="table">
        <thead><tr>
          {selectable&&<th style={{width:36}}><label className="check"><input type="checkbox" checked={allOn} onChange={()=>setSel(allOn?[]:rows.map(key))}/></label></th>}
          {columns.map(c=><th key={c.key} className={[c.align==='right'?'num':'',c.sortable?'sortable':''].filter(Boolean).join(' ')} style={c.width?{width:c.width}:undefined}
            onClick={c.sortable?()=>setSort(s=>({key:c.key,dir:s&&s.key===c.key&&s.dir==='asc'?'desc':'asc'})):undefined}>
            {c.header}{c.sortable&&<span className="caret">{sort&&sort.key===c.key?(sort.dir==='asc'?'\u2191':'\u2193'):'\u2195'}</span>}
          </th>)}
        </tr></thead>
        <tbody>
          {sorted.length===0&&<tr><td colSpan={columns.length+(selectable?1:0)} style={{textAlign:'center',color:'var(--color-text-subtle)',height:96}}>{emptyLabel}</td></tr>}
          {sorted.map((r,i)=>{const k=key(r,i);return <tr key={k} className={sel.includes(k)?'is-selected':undefined} onClick={onRowClick?()=>onRowClick(r):undefined} style={onRowClick?{cursor:'pointer'}:undefined}>
            {selectable&&<td><label className="check"><input type="checkbox" checked={sel.includes(k)} onChange={e=>{e.stopPropagation();toggle(k);}}/></label></td>}
            {columns.map(c=><td key={c.key} className={c.align==='right'?'num':undefined}>{c.render?c.render(r):r[c.key]}</td>)}
          </tr>;})}
          {totalRow&&<tr className="table-total">{selectable&&<td/>}{columns.map(c=><td key={c.key} className={c.align==='right'?'num':undefined}>{totalRow[c.key]}</td>)}</tr>}
        </tbody>
      </table>
    </div>
    {footer&&<div className="table-foot">{footer}</div>}
  </div>;
}
