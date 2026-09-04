export function Tabs({tabs=[],value,onChange,className=''}){
  const items=tabs.map(t=>typeof t==='string'?{value:t,label:t}:t);
  return <div className={('tabs '+className).trim()} role="tablist">
    {items.map(t=><button key={t.value} type="button" role="tab" className="tab" aria-selected={t.value===value} onClick={()=>onChange&&onChange(t.value)}>{t.label}{t.count!=null&&<span className="muted num" style={{marginLeft:6}}>{t.count}</span>}</button>)}
  </div>;
}
