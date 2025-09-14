import React from 'react';
import {LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer} from'recharts';
import {format} from 'date-fns';

function OrdersChart({data}){
  const formattedData=data.map(item=>({
    ...item,
    date:format(new Date(item.date),'MMM d'),
  }));

  return (
    <div className="chart-container">
      <h3>Orders Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDashArray="3 3"/>
          <XAxis dataKey="date"/>
          <YAxis/>
          <Tooltip/>
          <Legend/>
          <Line type="monotone" dataKey="orderCount" name="Orders" stroke="#8884d8"/>
          <Line type="monotone" dataKey="dailyRevenue" name="Revenue ($)" stroke="#82ca9d"/>
          
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default OrdersChart;