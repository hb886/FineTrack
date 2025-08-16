import React, { useState } from 'react';
import { Plus, Filter, Download, Search, Calendar, TrendingUp, PieChart, BarChart3, ArrowUpRight, ArrowDownRight, Edit3, Trash2 } from 'lucide-react';
import TransactionTable from './TransactionTable';

const Transactions = () => {

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #faf5ff 100%)',
      padding: '24px 0 0 40px',
      width:"100%",
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#111827',
              margin: '0 0 8px 0'
            }}>Transactions</h1>
            <p style={{
              color: '#6b7280',
              margin: '0',
              fontSize: '16px'
            }}>Manage and analyze all your financial transactions</p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
            borderRadius: '16px',
            padding: '24px',
            color: 'white'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ margin: '0', fontSize: '16px', opacity: '0.9' }}>Total Income</h3>
              <ArrowUpRight size={20} style={{ opacity: '0.8' }} />
            </div>
            <p style={{ margin: '0', fontSize: '28px', fontWeight: 'bold' }}></p>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
            borderRadius: '16px',
            padding: '24px',
            color: 'white'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ margin: '0', fontSize: '16px', opacity: '0.9' }}>Total Expenses</h3>
              <ArrowDownRight size={20} style={{ opacity: '0.8' }} />
            </div>
            <p style={{ margin: '0', fontSize: '28px', fontWeight: 'bold' }}></p>
          </div>

          <div style={{
            // background: netBalance >= 0 
            //   ? 'linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)' 
            //   : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            borderRadius: '16px',
            padding: '24px',
            color: 'white'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ margin: '0', fontSize: '16px', opacity: '0.9' }}>Net Balance</h3>
              <TrendingUp size={20} style={{ opacity: '0.8' }} />
            </div>
            <p style={{ margin: '0', fontSize: '28px', fontWeight: 'bold' }}>
              
            </p>
          </div>
        </div>

        <div style={{width:"66%"}}>
          
          <div style={{
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: '1px solid #e5e7eb',
            width:"100%"
          }}>

            <TransactionTable />
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;