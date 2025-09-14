import React from 'react';
function StatCard({title,value,icon}){
  return(
    <div className="stat-card">
      <div classNmae="stat-icon">{icon}</div>
      <div className="stat-info">
        <h4>{title}</h4>
        <p>{value}</p>
      </div>
    </div>
  );
}
export default StatCard;