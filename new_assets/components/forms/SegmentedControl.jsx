export function SegmentedControl({options=[],value,onChange,className=''}){
  const opts=options.map(o=>typeof o==='string'?{value:o,label:o}:o);
  return <div className={('seg '+className).trim()} role="tablist">
    {opts.map(o=><button key={o.value} type="button" role="tab" className="seg-opt" aria-selected={o.value===value} onClick={()=>onChange&&onChange(o.value)}>{o.label}</button>)}
  </div>;
}
