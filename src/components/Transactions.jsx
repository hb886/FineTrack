import React, { useContext, useState } from 'react';
import { Plus, Filter, Download, Search, Calendar, TrendingUp, PieChart, BarChart3, ArrowUpRight, ArrowDownRight, Edit3, Trash2 } from 'lucide-react';
import TransactionTable from './TransactionTable';
import { MyContext } from './context';

const Transactions = () => {
  const { totalIncome, totalExpenses, netBalance } = useContext(MyContext);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #faf5ff 100%)',
      padding: '32px',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <h1 style={{
              fontSize: '36px',
              fontWeight: '900',
              color: '#111827',
              margin: '0 0 8px 0'
            }}>Transactions</h1>
            <p style={{
              color: '#6b7280',
              margin: '0',
              fontSize: '18px'
            }}>Manage and analyze all your financial transactions</p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '40px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
            borderRadius: '20px',
            padding: '28px',
            color: 'white',
            boxShadow: '0 8px 32px rgba(5, 150, 105, 0.3)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: '0', fontSize: '18px', opacity: '0.9', fontWeight: '600' }}>Total Income</h3>
              <ArrowUpRight size={24} style={{ opacity: '0.8' }} />
            </div>
            <p style={{ margin: '0', fontSize: '32px', fontWeight: '900' }}>${totalIncome.toFixed(2)}</p>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
            borderRadius: '20px',
            padding: '28px',
            color: 'white',
            boxShadow: '0 8px 32px rgba(220, 38, 38, 0.3)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: '0', fontSize: '18px', opacity: '0.9', fontWeight: '600' }}>Total Expenses</h3>
              <ArrowDownRight size={24} style={{ opacity: '0.8' }} />
            </div>
            <p style={{ margin: '0', fontSize: '32px', fontWeight: '900' }}>${totalExpenses.toFixed(2)}</p>
          </div>

          <div style={{
            background: netBalance >= 0 
              ? 'linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)' 
              : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            borderRadius: '20px',
            padding: '28px',
            color: 'white',
            boxShadow: `0 8px 32px ${netBalance >= 0 ? 'rgba(124, 58, 237, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: '0', fontSize: '18px', opacity: '0.9', fontWeight: '600' }}>Net Balance</h3>
              <TrendingUp size={24} style={{ opacity: '0.8' }} />
            </div>
            <p style={{ margin: '0', fontSize: '32px', fontWeight: '900' }}>
              ${netBalance.toFixed(2)}
            </p>
          </div>
        </div>

        <div style={{ width: "100%" }}>
          <TransactionTable />
        </div>
      </div>
    </div>
  );
};

export default Transactions;