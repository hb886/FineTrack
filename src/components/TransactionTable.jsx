
import React, { useState } from 'react';
import { Filter, Calendar, TrendingUp, ArrowUpRight } from 'lucide-react';

const TransactionTable = () => {
  const headerStyle = {
    padding: '16px',
    borderBottom: '1px solid #e5e7eb',
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151'
  };

  const cellStyle = {
    padding: '16px',
    borderBottom: '1px solid #f3f4f6',
    fontSize: '14px',
    color: '#374151'
  };

  // Sample transaction data - you can replace this with your actual data
  const transactions = [
    {
      id: 1,
      date: '18/7/2025',
      description: 'Home',
      category: 'Food',
      amount: -100,
      categoryColor: '#fef2f2',
      categoryTextColor: '#991b1b'
    },
    {
      id: 2,
      date: '20/7/2025',
      description: 'Rent',
      category: 'Living',
      amount: -80,
      categoryColor: '#fef2f2',
      categoryTextColor: '#991b1b'
    },
    {
      id: 3,
      date: '23/7/2025',
      description: 'Gym',
      category: 'Health',
      amount: -50,
      categoryColor: '#fef2f2',
      categoryTextColor: '#991b1b'
    },
    {
      id: 4,
      date: '25/7/2025',
      description: 'Salary',
      category: 'Income',
      amount: 3500,
      categoryColor: '#dcfce7',
      categoryTextColor: '#059669'
    },
    {
      id: 5,
      date: '27/7/2025',
      description: 'Groceries',
      category: 'Food',
      amount: -75,
      categoryColor: '#fef2f2',
      categoryTextColor: '#991b1b'
    }
  ];

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{
        width: "100%",
        textAlign: "left",
        border: "1px solid #e5e7eb",
        borderCollapse: "collapse",
        borderRadius: "8px",
        overflow: "hidden"
      }}>
        <thead>
          <tr style={{ backgroundColor: "#f9fafb" }}>
            <th style={headerStyle}>Date</th>
            <th style={headerStyle}>Description</th>
            <th style={headerStyle}>Category</th>
            <th style={headerStyle}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr 
              key={transaction.id} 
              style={{ 
                backgroundColor: index % 2 === 0 ? "white" : "#fafafa",
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f9ff'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? "white" : "#fafafa"}
            >
              <td style={cellStyle}>{transaction.date}</td>
              <td style={cellStyle}>{transaction.description}</td>
              <td style={cellStyle}>
                <span style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  backgroundColor: transaction.categoryColor,
                  color: transaction.categoryTextColor,
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  {transaction.category}
                </span>
              </td>
              <td style={{
                ...cellStyle, 
                color: transaction.amount < 0 ? '#dc2626' : '#059669', 
                fontWeight: '600'
              }}>
                {transaction.amount < 0 ? `-$${Math.abs(transaction.amount)}` : `+$${transaction.amount}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default TransactionTable