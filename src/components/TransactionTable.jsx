import React, { useContext, useState } from "react";
import { Edit3, Trash2, Plus, Download, Filter } from "lucide-react";
import { MyContext } from "./context";

const TransactionTable = () => {
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
    gap: "16px",
  };


  
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
    letterSpacing: "0.05em",
    width:"100vw"
  };


  const {entry} = useContext(MyContext)

  console.log("entry", entry);
  

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div>
          <h2
            style={{
              margin: "0 0 4px 0",
              fontSize: "20px",
              fontWeight: "700",
              color: "#111827",
            }}
          >
            Transaction History
          </h2>
          <p
            style={{
              margin: "0",
              color: "#6b7280",
              fontSize: "14px",
            }}
          >
            Manage your financial transactions
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button
            style={secondaryButtonStyle}
          >
            <Filter size={16} />
            Filter
          </button>
          <button
            style={secondaryButtonStyle}
          >
            <Download size={16} />
            Export
          </button>
          <button
            style={primaryButtonStyle}
          >
            <Plus size={16} />
            Add Transaction
          </button>
        </div>

             <div style={{
        // background: getTotalBalance() >= 0 
        //   ? "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)" 
        //   : "linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)",
        background:"#dcfce7",
        padding: "16px 24px",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width:"100%"
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
          // color: getTotalBalance() >= 0 ? "#059669" : "#dc2626"
          color:"059669"
        }}>
          "dsdsdsdsd"
        </span>
      </div>

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
        </table>
        </div>


      </div>
    </div>
  );
};

export default TransactionTable;
