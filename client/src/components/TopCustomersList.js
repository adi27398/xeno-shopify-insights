import React from 'react';
function TopCustomersList({data}){
  return(
    <div className="list-container">
      <h3>Top 5 Customers by Spend</h3>
      <ul className="customer-list">
          {data.map((customer)=>(
            <li key={customer.shopifyCustomerId}>
              <span>{customer.firstName} {customer.lastName} ({customer.email})</span>
              <span className="customer-spend">${parseFloat(customer.totalSpent).toFixed(2)}</span>


            </li>
          ))}
      </ul>
    </div>
  );

}
export default TopCustomersList;