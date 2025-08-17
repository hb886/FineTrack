import React, { useContext, useState } from "react";
import { Edit3, Trash2, Plus, Download, Filter } from "lucide-react";
import { MyContext } from "./context";

const TransactionTable = () => {
  const { entry, setEntry } = useContext(MyContext);
  const [addTransaction, setAddTransaction] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    type: "",
    category: "",
    dateFrom: "",
    dateTo: "",
    search: ""
  });
  
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    category: "",
    amount: "",
    type: "expense",
  });

  // Styles
  const containerStyle = {
    width: "100%",
    background: "white",
    borderRadius: "16px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e5e7eb",
    overflow: "hidden",
  };

  const headerStyle = {
    background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
    padding: "24px",
    borderBottom: "2px solid #e2e8f0",
  };

  const buttonStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 18px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.3s ease",
    textDecoration: "none"
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
    color: "white",
    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.4)"
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    background: "white",
    color: "#6b7280",
    border: "2px solid #e5e7eb",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
  };

  const dangerButtonStyle = {
    ...buttonStyle,
    background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
    color: "white",
    padding: "8px 12px",
    fontSize: "12px"
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    border: "2px solid #e5e7eb",
    borderRadius: "10px",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.3s ease",
    backgroundColor: "#fafafa"
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px"
  };

  const thStyle = {
    padding: "20px",
    borderBottom: "2px solid #e2e8f0",
    background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
    fontWeight: "700",
    color: "#374151",
    textAlign: "left",
    fontSize: "13px",
    textTransform: "uppercase",
    letterSpacing: "0.05em"
  };

  const tdStyle = {
    padding: "16px 20px",
    borderBottom: "1px solid #f3f4f6",
    color: "#374151",
    fontSize: "14px"
  };

  // Functions
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      setEntry(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveTransaction = () => {
    if (!formData.date || !formData.description || !formData.category || !formData.amount) {
      alert("Please fill in all fields");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      date: formData.date,
      description: formData.description,
      category: formData.category,
      amount: parseFloat(formData.amount) * (formData.type === "expense" ? -1 : 1),
      type: formData.type,
    };

    setEntry(prev => [...prev, newTransaction]);
    setFormData({ date: "", description: "", category: "", amount: "", type: "expense" });
    setAddTransaction(false);
  };

  const exportToCSV = () => {
    const headers = ["Date", "Description", "Category", "Amount", "Type"];
    const csvContent = [
      headers.join(","),
      ...filteredTransactions.map(t => 
        `${t.date},"${t.description}","${t.category}",${t.amount},${t.type}`
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Filter transactions
  const filteredTransactions = entry.filter(transaction => {
    const matchesType = !filters.type || transaction.type === filters.type;
    const matchesCategory = !filters.category || transaction.category.toLowerCase().includes(filters.category.toLowerCase());
    const matchesSearch = !filters.search || 
      transaction.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      transaction.category.toLowerCase().includes(filters.search.toLowerCase());
    const matchesDateFrom = !filters.dateFrom || transaction.date >= filters.dateFrom;
    const matchesDateTo = !filters.dateTo || transaction.date <= filters.dateTo;
    
    return matchesType && matchesCategory && matchesSearch && matchesDateFrom && matchesDateTo;
  });

  const getTotalBalance = () => {
    return filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <div>
            <h2 style={{ margin: "0 0 8px 0", fontSize: "24px", fontWeight: "800", color: "#111827" }}>
              Transaction History
            </h2>
            <p style={{ margin: "0", color: "#6b7280", fontSize: "16px" }}>
              Manage your financial transactions
            </p>
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button 
              style={secondaryButtonStyle} 
              onClick={() => setShowFilter(!showFilter)}
            >
              <Filter size={16} />
              Filter
            </button>
            <button style={secondaryButtonStyle} onClick={exportToCSV}>
              <Download size={16} />
              Export
            </button>
            <button style={primaryButtonStyle} onClick={() => setAddTransaction(!addTransaction)}>
              <Plus size={16} />
              Add Transaction
            </button>
          </div>
        </div>

        {/* Filter Section */}
        {showFilter && (
          <div style={{
            background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
            border: "2px solid #bfdbfe",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "24px"
          }}>
            <h3 style={{ margin: "0 0 16px 0", color: "#1e40af", fontSize: "16px", fontWeight: "600" }}>
              Filter Transactions
            </h3>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px"
            }}>
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search description or category"
                style={inputStyle}
              />
              <select name="type" value={filters.type} onChange={handleFilterChange} style={inputStyle}>
                <option value="">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
              <input
                type="text"
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                placeholder="Filter by category"
                style={inputStyle}
              />
              <input
                type="date"
                name="dateFrom"
                value={filters.dateFrom}
                onChange={handleFilterChange}
                style={inputStyle}
              />
              <input
                type="date"
                name="dateTo"
                value={filters.dateTo}
                onChange={handleFilterChange}
                style={inputStyle}
              />
            </div>
            <button
              style={{
                ...secondaryButtonStyle,
                marginTop: "16px",
                padding: "8px 16px",
                fontSize: "13px"
              }}
              onClick={() => setFilters({ type: "", category: "", dateFrom: "", dateTo: "", search: "" })}
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Add Transaction Form */}
        {addTransaction && (
          <div style={{
            background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
            border: "2px solid #bae6fd",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "24px"
          }}>
            <h3 style={{ margin: "0 0 16px 0", color: "#0369a1", fontSize: "16px", fontWeight: "600" }}>
              Add New Transaction
            </h3>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px",
              marginBottom: "20px"
            }}>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                style={inputStyle}
              />
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description"
                style={inputStyle}
              />
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="Category"
                style={inputStyle}
              />
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="Amount"
                style={inputStyle}
              />
              <select name="type" value={formData.type} onChange={handleInputChange} style={inputStyle}>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button style={primaryButtonStyle} onClick={handleSaveTransaction}>
                Save Transaction
              </button>
              <button
                style={secondaryButtonStyle}
                onClick={() => setAddTransaction(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Balance Display */}
        <div style={{
          background: getTotalBalance() >= 0
            ? "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)"
            : "linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)",
          padding: "20px 24px",
          borderRadius: "12px",
          marginBottom: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: getTotalBalance() >= 0 ? "2px solid #86efac" : "2px solid #fca5a5"
        }}>
          <span style={{
            fontWeight: "600",
            color: "#374151",
            fontSize: "16px"
          }}>
            Total Balance:
          </span>
          <span style={{
            fontSize: "24px",
            fontWeight: "800",
            color: getTotalBalance() >= 0 ? "#059669" : "#dc2626"
          }}>
            ${getTotalBalance().toFixed(2)}
          </span>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto", borderRadius: "12px", border: "2px solid #f3f4f6" }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Description</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Amount</th>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{
                    ...tdStyle,
                    textAlign: "center",
                    color: "#6b7280",
                    fontStyle: "italic",
                    padding: "40px"
                  }}>
                    No transactions found matching your criteria
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} style={{
                    transition: "background-color 0.2s ease",
                    cursor: "pointer"
                  }}>
                    <td style={tdStyle}>{transaction.date}</td>
                    <td style={tdStyle}>{transaction.description}</td>
                    <td style={tdStyle}>
                      <span style={{
                        background: "#f3f4f6",
                        padding: "4px 12px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "500"
                      }}>
                        {transaction.category}
                      </span>
                    </td>
                    <td style={{
                      ...tdStyle,
                      fontWeight: "600",
                      color: transaction.amount >= 0 ? "#059669" : "#dc2626"
                    }}>
                      ${Math.abs(transaction.amount).toFixed(2)}
                    </td>
                    <td style={tdStyle}>
                      <span style={{
                        background: transaction.type === "income" ? "#dcfce7" : "#fef2f2",
                        color: transaction.type === "income" ? "#059669" : "#dc2626",
                        padding: "4px 12px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "500",
                        textTransform: "capitalize"
                      }}>
                        {transaction.type}
                      </span>
                    </td>
                    <td style={tdStyle}>
                      <button
                        style={dangerButtonStyle}
                        onClick={() => handleDelete(transaction.id)}
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


export default TransactionTable;
