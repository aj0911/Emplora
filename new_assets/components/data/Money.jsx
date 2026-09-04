const NF=new Intl.NumberFormat('en-IN',{maximumFractionDigits:0});
const NF2=new Intl.NumberFormat('en-IN',{minimumFractionDigits:2,maximumFractionDigits:2});
export function formatMoney(value,opts){
  const o=opts||{};
  const symbol=o.symbol!==false;
  const n=Number(value)||0;
  const body=(o.paise?NF2:NF).format(Math.abs(n));
  return (n<0?'-':'')+(symbol?'\u20b9':'')+body;
}
export function Money({value,paise=false,symbol=true,tone,className='',...rest}){
  const color=tone==='negative'?'var(--danger-700)':tone==='positive'?'var(--success-700)':undefined;
  return <span className={('num '+className).trim()} style={{color}} {...rest}>{formatMoney(value,{paise,symbol})}</span>;
}
