// import React from 'react'
// import TransactionTable from './TransactionTable'


// const Dashboard = () => {
//   return (
//     <div style={{width:"100%", padding:"10px 0 0 0"}}>
//       <h1 style={{padding:"0", margin:"0"}}>Dashboard</h1>

//       <p style={{color:"black", fontSize:"18px", fontWeight:"700", padding:"0", margin:"25px 0 15px 0"}}>Overview</p>

//       <div style={{background:"#d3e2d3", borderRadius:"4px", padding:"2px 15px 2px 15px"}}>
//         <p style={{fontSize:"14px"}}>Current Balance</p>

//         <p style={{fontSize:"18px"}}>$12,345.67</p>
//       </div>

//       <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", margin:"20px 0 10px 0", width:"80%"}}>
//         <p style={{color:"black", fontSize:"18px", fontWeight:"500", margin:"0"}}>Recent Transaction</p>

//         <div style={{display:"flex", gap:"10px"}}>
//           <p style={{color:"black", fontSize:"16px", fontWeight:"500", margin:"0"}}>
//             Add Transaction
//           </p>

//           <button style={{cursor:"pointer", background:"#88e288", border:"none", outline:"none", fontSize:"14px"}}>+</button>
//         </div>
        
//       </div>

//       <TransactionTable />

//       <div>
//         <p style={{fontSize:"18px", fontWeight:"bold"}}>Income vs Expenses</p>

//         <div style={{}}>
//           <p style={{margin:"0", padding:"0", fontSize:"14px", color:"black", fontWeight:"500"}}>Income vs Expenses</p>
//           <p style={{margin:"0", padding:"10px 0 10px 0", fontSize:"18px", color:"black", fontWeight:"bold",}}>$12,345.67</p>
//           <p style={{margin:"0", padding:"0", fontSize:"14px", color:"green", fontWeight:"500",}}>This Month +10%</p>
//         </div>
//       </div>

//     </div>
//   )
// }

// export default Dashboard

import React, { useState } from 'react'
import { Plus, TrendingUp, DollarSign, Calendar, Filter, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import TransactionTable from './Transactions';

const Dashboard = () => {
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: '18/7/2025',
      description: 'Home',
      category: 'Food',
      amount: -100
    },
    {
      id: 2,
      date: '20/7/2025',
      description: 'Rent',
      category: 'Living',
      amount: -80
    },
    {
      id: 3,
      date: '23/7/2025',
      description: 'Gym',
      category: 'Health',
      amount: -50
    }
  ]);

  const [newTransaction, setNewTransaction] = useState({
    description: '',
    amount: '',
    category: ''
  });

  const handleAddTransaction = () => {
    if (newTransaction.description && newTransaction.amount && newTransaction.category) {
      const transaction = {
        id: transactions.length + 1,
        date: new Date().toLocaleDateString('en-GB'),
        description: newTransaction.description,
        category: newTransaction.category,
        amount: parseFloat(newTransaction.amount)
      };
      
      setTransactions([...transactions, transaction]);
      setNewTransaction({ description: '', amount: '', category: '' });
      setShowAddTransaction(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #faf5ff 100%)',
      padding: '24px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
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
            }}>Dashboard</h1>
            <p style={{
              color: '#6b7280',
              margin: '0',
              fontSize: '16px'
            }}>Welcome back! Here's your financial overview.</p>
          </div>
        </div>

        {/* Overview Section */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{
            color: 'black',
            fontSize: '18px',
            fontWeight: '700',
            margin: '0 0 16px 0'
          }}>Overview</h2>

          <div style={{
            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            borderRadius: '12px',
            padding: '24px',
            color: 'white',
            marginBottom: '24px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '8px'
            }}>
              <p style={{
                color: '#bfdbfe',
                fontSize: '14px',
                fontWeight: '500',
                margin: '0'
              }}>Current Balance</p>
              <TrendingUp size={20} style={{color: '#bfdbfe'}} />
            </div>
            <p style={{
              fontSize: '28px',
              fontWeight: 'bold',
              margin: '0'
            }}>$12,345.67</p>
          </div>
        </div>

        {/* Recent Transactions Section */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #f3f4f6',
          padding: '24px',
          marginBottom: '32px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <h3 style={{
              color: 'black',
              fontSize: '18px',
              fontWeight: '500',
              margin: '0'
            }}>Recent Transactions</h3>

            <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
              <span style={{
                color: 'black',
                fontSize: '16px',
                fontWeight: '500'
              }}>
                Add Transaction
              </span>
              
              <button 
                onClick={() => setShowAddTransaction(!showAddTransaction)}
                style={{
                  cursor: 'pointer',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  border: 'none',
                  borderRadius: '6px',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  padding: '8px 12px',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                +
              </button>
            </div>
          </div>

          {showAddTransaction && (
            <div style={{
              marginBottom: '24px',
              padding: '16px',
              background: '#eff6ff',
              borderRadius: '8px',
              border: '1px solid #bfdbfe'
            }}>
              <p style={{
                color: '#1e40af',
                fontWeight: '500',
                margin: '0 0 8px 0'
              }}>Add New Transaction</p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <input 
                  placeholder="Description" 
                  value={newTransaction.description}
                  onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
                <input 
                  placeholder="Amount" 
                  type="number"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
                <input 
                  placeholder="Category" 
                  value={newTransaction.category}
                  onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                />
                <button 
                  onClick={handleAddTransaction}
                  style={{
                    padding: '8px 16px',
                    background: '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}>
                  Add
                </button>
              </div>
            </div>
          )}
          
          <TransactionTable />
        </div>

        {/* Income vs Expenses Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            border: '1px solid #f3f4f6',
            padding: '24px'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#111827',
              margin: '0 0 20px 0'
            }}>Income vs Expenses</h3>
            
            <div style={{marginBottom: '20px'}}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                background: '#dcfce7',
                borderRadius: '8px',
                marginBottom: '12px'
              }}>
                <span style={{fontWeight: '500', color: '#111827'}}>Monthly Income</span>
                <span style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#059669'
                }}>$4,250.00</span>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                background: '#fef2f2',
                borderRadius: '8px'
              }}>
                <span style={{fontWeight: '500', color: '#111827'}}>Monthly Expenses</span>
                <span style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#dc2626'
                }}>$2,180.50</span>
              </div>
            </div>

            <div style={{
              paddingTop: '20px',
              borderTop: '1px solid #f3f4f6'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '8px'
              }}>
                <span style={{fontWeight: '600', color: '#111827'}}>Net Difference</span>
                <span style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#059669'
                }}>+$2,069.50</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <ArrowUpRight size={16} style={{color: '#10b981'}} />
                <span style={{
                  color: '#059669',
                  fontWeight: '500',
                  fontSize: '14px'
                }}>+10% This Month</span>
              </div>
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)',
            borderRadius: '12px',
            padding: '24px',
            color: 'white'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              margin: '0 0 20px 0'
            }}>Savings Goal</h3>
            
            <div style={{marginBottom: '16px'}}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <span style={{color: '#c4b5fd'}}>Progress</span>
                <span style={{fontWeight: 'bold'}}>65%</span>
              </div>
              <div style={{
                width: '100%',
                background: 'rgba(124, 58, 237, 0.5)',
                borderRadius: '9999px',
                height: '10px'
              }}>
                <div style={{
                  background: 'white',
                  height: '10px',
                  borderRadius: '9999px',
                  width: '65%'
                }}></div>
              </div>
            </div>
            
            <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span style={{color: '#c4b5fd'}}>Current Savings</span>
                <span style={{fontWeight: 'bold'}}>$6,500</span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <span style={{color: '#c4b5fd'}}>Goal</span>
                <span style={{fontWeight: 'bold'}}>$10,000</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '16px',
                paddingTop: '8px',
                borderTop: '1px solid rgba(196, 181, 253, 0.3)'
              }}>
                <span>Remaining</span>
                <span style={{fontWeight: 'bold'}}>$3,500</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;