const MAP={
  draft:['neutral','Draft'],locked:['neutral','Locked'],exited:['neutral','Exited'],custom:['neutral','Custom'],
  processing:['info','Processing'],approved:['info','Approved'],generated:['info','Generated'],system:['info','System'],
  pending:['warning','Pending approval'],notice:['warning','On notice'],unverified:['warning','Bank unverified'],trial:['warning','Trial'],
  paid:['success','Paid'],sent:['success','Sent'],active:['success','Active'],verified:['success','Verified'],
  failed:['danger','Failed'],overdue:['danger','Overdue'],suspended:['danger','Suspended'],rejected:['danger','Rejected']
};
export function StatusBadge({status,label,className=''}){
  const m=MAP[status]||['neutral',status];
  return <span className={('badge badge-'+m[0]+' '+className).trim()}>{label||m[1]}</span>;
}
export const STATUSES=Object.keys(MAP);
