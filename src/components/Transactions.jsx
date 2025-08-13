// import React from 'react'
// import TransactionTable from './TransactionTable'
// import Search from "../assets/search.png"

// const Transactions = () => {
//   return (
//     <div style={{width:"100%", padding:"10px 0 0 0"}}>
//       <h1 style={{padding:"0", margin:"0"}}>Transactions</h1>

//       <div style={{background:"#d3e2d3", padding:"10px", display:"flex", alignItems:"center", gap:"10px", borderRadius:"8px", marginTop:"20px"}}>
//         <img src={Search} style={{width:"15px"}}/>
//         <input type='search' placeholder='Search Transaction' style={{border:"none", outline:"none", background:"#d3e2d3", color:"greemn", width:"100%"}}/>
//       </div>

//       <div style={{display:"flex", flexDirection:"row", gap:"10px"}}>
//         <p style={{background:"#d3e2d3", padding:"5px", borderRadius:"5px", cursor:"pointer"}}>Date Range</p>
//         <p style={{background:"#d3e2d3", padding:"5px", borderRadius:"5px", cursor:"pointer"}}>Category</p>
//         <p style={{background:"#d3e2d3", padding:"5px", borderRadius:"5px", cursor:"pointer"}}>Amount range</p>
//       </div>

//       <TransactionTable />

//     </div>
//   )
// }

// export default Transactions




import React, { useState } from "react";
import { Edit3, Trash2, Plus, Download, Filter } from "lucide-react";

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: "18/7/2025", description: "home", category: "food", amount: -100, type: "expense" },
    { id: 2, date: "20/7/2025", description: "rent", category: "Living", amount: -80, type: "expense" },
    { id: 3, date: "23/7/2025", description: "gym", category: "Protein", amount: -50, type: "expense" },
    { id: 4, date: "25/7/2025", description: "Salary", category: "Income", amount: 3500, type: "income" },
    { id: 5, date: "26/7/2025", description: "Freelance", category: "Income", amount: 500, type: "income" },
  ]);

  const [hoveredRow, setHoveredRow] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const containerStyle = {
    width: "100%",
    background: "white",
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    border: "1px solid #e5e7eb",
    overflow: "hidden",
  };

  const headerStyle = {
    background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
    padding: "20px 24px",
    borderBottom: "2px solid #e2e8f0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "16px"
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px"
  };

  const thStyle = {
    padding: "16px 20px",
    borderBottom: "2px solid #e2e8f0",
    background: "#f8fafc",
    fontWeight: "600",
    color: "#374151",
    textAlign: "left",
    fontSize: "13px",
    textTransform: "uppercase",
    letterSpacing: "0.05em"
  };

  const getCellStyle = (isHovered, isAmount = false, amount = 0) => ({
    padding: "16px 20px",
    borderBottom: "1px solid #f1f5f9",
    color: isAmount 
      ? (amount >= 0 ? "#059669" : "#dc2626")
      : "#374151",
    fontWeight: isAmount ? "600" : "400",
    backgroundColor: isHovered ? "#f8fafc" : "transparent",
    transition: "all 0.2s ease",
    fontSize: "14px"
  });

  const getCategoryStyle = (type) => ({
    display: "inline-flex",
    alignItems: "center",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "500",
    backgroundColor: type === "income" ? "#dcfce7" : "#fef2f2",
    color: type === "income" ? "#166534" : "#991b1b",
    border: `1px solid ${type === "income" ? "#bbf7d0" : "#fecaca"}`
  });

  const buttonStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 16px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.2s ease"
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
    color: "white",
    boxShadow: "0 2px 8px rgba(59, 130, 246, 0.3)"
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    background: "white",
    color: "#6b7280",
    border: "1px solid #d1d5db"
  };

  const actionButtonStyle = {
    padding: "8px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };

  const editButtonStyle = {
    ...actionButtonStyle,
    background: "#eff6ff",
    color: "#2563eb"
  };

  const deleteButtonStyle = {
    ...actionButtonStyle,
    background: "#fef2f2",
    color: "#dc2626"
  };

  const addFormStyle = {
    background: "#f0f9ff",
    border: "2px solid #bae6fd",
    borderRadius: "12px",
    padding: "20px",
    margin: "16px 24px",
    display: showAddForm ? "block" : "none"
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s ease"
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const getTotalBalance = () => {
    return transactions.reduce((sum, t) => sum + t.amount, 0);
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div>
          <h2 style={{ 
            margin: "0 0 4px 0", 
            fontSize: "20px", 
            fontWeight: "700", 
            color: "#111827" 
          }}>
            Transaction History
          </h2>
          <p style={{ 
            margin: "0", 
            color: "#6b7280", 
            fontSize: "14px" 
          }}>
            Manage your financial transactions
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button 
            style={secondaryButtonStyle}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#f9fafb"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "white"}
          >
            <Filter size={16} />
            Filter
          </button>
          <button 
            style={secondaryButtonStyle}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#f9fafb"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "white"}
          >
            <Download size={16} />
            Export
          </button>
          <button 
            style={primaryButtonStyle}
            onClick={() => setShowAddForm(!showAddForm)}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-1px)";
              e.target.style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 2px 8px rgba(59, 130, 246, 0.3)";
            }}
          >
            <Plus size={16} />
            Add Transaction
          </button>
        </div>
      </div>

      {/* Add Transaction Form */}
      <div style={addFormStyle}>
        <h3 style={{ margin: "0 0 16px 0", color: "#0c4a6e", fontSize: "16px", fontWeight: "600" }}>
          Add New Transaction
        </h3>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
          gap: "12px",
          marginBottom: "16px"
        }}>
          <input 
            type="date" 
            placeholder="Date" 
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
            onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
          />
          <input 
            type="text" 
            placeholder="Description" 
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
            onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
          />
          <input 
            type="text" 
            placeholder="Category" 
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
            onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
          />
          <input 
            type="number" 
            placeholder="Amount" 
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
            onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
          />
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button style={{
            ...primaryButtonStyle,
            padding: "8px 16px",
            fontSize: "13px"
          }}>
            Save Transaction
          </button>
          <button 
            style={{
              ...secondaryButtonStyle,
              padding: "8px 16px",
              fontSize: "13px"
            }}
            onClick={() => setShowAddForm(false)}
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Summary Bar */}
      <div style={{
        background: getTotalBalance() >= 0 
          ? "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)" 
          : "linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)",
        padding: "16px 24px",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <span style={{ 
          fontWeight: "600", 
          color: "#374151",
          fontSize: "14px"
        }}>
          Total Balance:
        </span>
        <span style={{ 
          fontSize: "18px", 
          fontWeight: "700", 
          color: getTotalBalance() >= 0 ? "#059669" : "#dc2626"
        }}>
          ${Math.abs(getTotalBalance()).toFixed(2)} {getTotalBalance() < 0 ? "(deficit)" : ""}
        </span>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Amount</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                onMouseEnter={() => setHoveredRow(transaction.id)}
                onMouseLeave={() => setHoveredRow(null)}
                style={{
                  backgroundColor: hoveredRow === transaction.id ? "#f8fafc" : "transparent",
                  transition: "background-color 0.2s ease"
                }}
              >
                <td style={getCellStyle(hoveredRow === transaction.id)}>
                  {transaction.date}
                </td>
                <td style={{
                  ...getCellStyle(hoveredRow === transaction.id),
                  fontWeight: "500",
                  textTransform: "capitalize"
                }}>
                  {transaction.description}
                </td>
                <td style={getCellStyle(hoveredRow === transaction.id)}>
                  <span style={getCategoryStyle(transaction.type)}>
                    {transaction.category}
                  </span>
                </td>
                <td style={getCellStyle(hoveredRow === transaction.id, true, transaction.amount)}>
                  {transaction.amount >= 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                </td>
                <td style={getCellStyle(hoveredRow === transaction.id)}>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button 
                      style={editButtonStyle}
                      onMouseEnter={(e) => e.target.style.backgroundColor = "#dbeafe"}
                      onMouseLeave={(e) => e.target.style.backgroundColor = "#eff6ff"}
                      title="Edit transaction"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button 
                      style={deleteButtonStyle}
                      onMouseEnter={(e) => e.target.style.backgroundColor = "#fee2e2"}
                      onMouseLeave={(e) => e.target.style.backgroundColor = "#fef2f2"}
                      onClick={() => deleteTransaction(transaction.id)}
                      title="Delete transaction"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {transactions.length === 0 && (
        <div style={{
          padding: "60px 24px",
          textAlign: "center",
          color: "#9ca3af"
        }}>
          <p style={{ margin: "0", fontSize: "16px" }}>No transactions found</p>
          <p style={{ margin: "8px 0 0 0", fontSize: "14px" }}>Add your first transaction to get started</p>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;