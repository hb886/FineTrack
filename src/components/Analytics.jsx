import React, { useContext, useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  ResponsiveContainer,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar, 
  PieChart as PieChartIcon,
  BarChart3,
  Activity,
  Target
} from 'lucide-react';
import { MyContext } from './context';

const Analytics = () => {
  const { entry, totalIncome, totalExpenses, netBalance, savingsRate } = useContext(MyContext);
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  // Colors for charts
  const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#f97316'];

  // Process data for category pie chart
  const categoryData = entry.reduce((acc, transaction) => {
    if (transaction.type === 'expense') {
      const category = transaction.category;
      const amount = Math.abs(transaction.amount);
      acc[category] = (acc[category] || 0) + amount;
    }
    return acc;
  }, {});

  const pieData = Object.entries(categoryData).map(([category, amount]) => ({
    name: category,
    value: amount
  }));

  // Process data for monthly trend
  const monthlyData = entry.reduce((acc, transaction) => {
    const date = new Date(transaction.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!acc[monthKey]) {
      acc[monthKey] = { month: monthKey, income: 0, expense: 0 };
    }
    
    if (transaction.type === 'income') {
      acc[monthKey].income += transaction.amount;
    } else {
      acc[monthKey].expense += Math.abs(transaction.amount);
    }
    
    return acc;
  }, {});

  const trendData = Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month));

  // Process data for income vs expense comparison
  const comparisonData = [
    { name: 'Income', value: totalIncome, fill: '#10b981' },
    { name: 'Expenses', value: totalExpenses, fill: '#ef4444' }
  ];

  // Daily spending pattern
  const dailySpending = entry
    .filter(t => t.type === 'expense')
    .map(t => ({
      date: t.date,
      amount: Math.abs(t.amount),
      category: t.category
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Calculate savings rate

  // Top spending categories
  const topCategories = Object.entries(categoryData)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([category, amount]) => ({ category, amount }));

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #faf5ff 100%)',
    padding: '32px',
  };

  const cardStyle = {
    background: 'white',
    borderRadius: '20px',
    padding: '24px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb'
  };

  const statCardStyle = {
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    borderRadius: '16px',
    padding: '24px',
    color: 'white',
    boxShadow: '0 8px 32px rgba(59, 130, 246, 0.3)'
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'white',
          padding: '12px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}>
          <p style={{ margin: '0 0 8px 0', fontWeight: '600' }}>{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ margin: '0', color: entry.color }}>
              {entry.name}: ${entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={containerStyle}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px'
        }}>
          <div>
            <h1 style={{
              fontSize: '36px',
              fontWeight: '900',
              color: '#111827',
              margin: '0 0 8px 0'
            }}>
              Analytics Dashboard
            </h1>
            <p style={{
              color: '#6b7280',
              margin: '0',
              fontSize: '18px'
            }}>
              Deep insights into your financial patterns
            </p>
          </div>
          
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            style={{
              padding: '12px 16px',
              borderRadius: '12px',
              border: '2px solid #e5e7eb',
              fontSize: '14px',
              fontWeight: '500',
              background: 'white'
            }}
          >
            <option value="all">All Time</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
        </div>

        {/* Key Metrics Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
          marginBottom: '40px'
        }}>
          <div style={{
            ...statCardStyle,
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            boxShadow: '0 8px 32px rgba(16, 185, 129, 0.3)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ margin: '0', fontSize: '16px', opacity: '0.9' }}>Total Income</h3>
              <TrendingUp size={24} />
            </div>
            <p style={{ margin: '0', fontSize: '32px', fontWeight: '900' }}>${totalIncome.toLocaleString()}</p>
          </div>

          <div style={{
            ...statCardStyle,
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            boxShadow: '0 8px 32px rgba(239, 68, 68, 0.3)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ margin: '0', fontSize: '16px', opacity: '0.9' }}>Total Expenses</h3>
              <TrendingDown size={24} />
            </div>
            <p style={{ margin: '0', fontSize: '32px', fontWeight: '900' }}>${totalExpenses.toLocaleString()}</p>
          </div>

          <div style={{
            ...statCardStyle,
            background: netBalance >= 0 
              ? 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' 
              : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            boxShadow: `0 8px 32px ${netBalance >= 0 ? 'rgba(139, 92, 246, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ margin: '0', fontSize: '16px', opacity: '0.9' }}>Net Balance</h3>
              <DollarSign size={24} />
            </div>
            <p style={{ margin: '0', fontSize: '32px', fontWeight: '900' }}>${netBalance.toLocaleString()}</p>
          </div>

          <div style={statCardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ margin: '0', fontSize: '16px', opacity: '0.9' }}>Savings Rate</h3>
              <Target size={24} />
            </div>
            <p style={{ margin: '0', fontSize: '32px', fontWeight: '900' }}>{savingsRate}%</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
          gap: '32px',
          marginBottom: '40px'
        }}>

          {/* Monthly Income vs Expenses Trend */}
          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <BarChart3 size={24} style={{ color: '#3b82f6' }} />
              <h3 style={{ margin: '0', fontSize: '20px', fontWeight: '700', color: '#111827' }}>
                Monthly Income vs Expenses
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} name="Income" />
                <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Expense Categories Pie Chart */}
          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <PieChartIcon size={24} style={{ color: '#8b5cf6' }} />
              <h3 style={{ margin: '0', fontSize: '20px', fontWeight: '700', color: '#111827' }}>
                Expense Categories
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Daily Spending Pattern */}
          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <Activity size={24} style={{ color: '#f59e0b' }} />
              <h3 style={{ margin: '0', fontSize: '20px', fontWeight: '700', color: '#111827' }}>
                Daily Spending Pattern
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dailySpending}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#f59e0b"
                  fill="#fef3c7"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Income vs Expenses Comparison */}
          <div style={cardStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <Calendar size={24} style={{ color: '#06b6d4' }} />
              <h3 style={{ margin: '0', fontSize: '20px', fontWeight: '700', color: '#111827' }}>
                Income vs Expenses
              </h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={comparisonData}>
                <RadialBar
                  minAngle={15}
                  label={{ position: 'insideStart', fill: 'white' }}
                  background
                  clockWise
                  dataKey="value"
                />
                <Legend iconSize={18} wrapperStyle={{ fontSize: '14px', paddingTop: '20px' }} />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Categories Table */}
        <div style={cardStyle}>
          <h3 style={{ 
            margin: '0 0 24px 0', 
            fontSize: '24px', 
            fontWeight: '800', 
            color: '#111827',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <TrendingDown size={28} style={{ color: '#ef4444' }} />
            Top Spending Categories
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={{
                    padding: '16px',
                    textAlign: 'left',
                    fontWeight: '600',
                    color: '#374151',
                    borderBottom: '2px solid #e5e7eb'
                  }}>
                    Rank
                  </th>
                  <th style={{
                    padding: '16px',
                    textAlign: 'left',
                    fontWeight: '600',
                    color: '#374151',
                    borderBottom: '2px solid #e5e7eb'
                  }}>
                    Category
                  </th>
                  <th style={{
                    padding: '16px',
                    textAlign: 'left',
                    fontWeight: '600',
                    color: '#374151',
                    borderBottom: '2px solid #e5e7eb'
                  }}>
                    Amount
                  </th>
                  <th style={{
                    padding: '16px',
                    textAlign: 'left',
                    fontWeight: '600',
                    color: '#374151',
                    borderBottom: '2px solid #e5e7eb'
                  }}>
                    Percentage
                  </th>
                </tr>
              </thead>
              <tbody>
                {topCategories.map((category, index) => (
                  <tr key={category.category}>
                    <td style={{
                      padding: '16px',
                      borderBottom: '1px solid #f3f4f6',
                      fontWeight: '600',
                      color: '#111827'
                    }}>
                      #{index + 1}
                    </td>
                    <td style={{
                      padding: '16px',
                      borderBottom: '1px solid #f3f4f6',
                      fontWeight: '500',
                      color: '#374151'
                    }}>
                      <span style={{
                        background: COLORS[index],
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px'
                      }}>
                        {category.category}
                      </span>
                    </td>
                    <td style={{
                      padding: '16px',
                      borderBottom: '1px solid #f3f4f6',
                      fontWeight: '600',
                      color: '#dc2626'
                    }}>
                      ${category.amount.toLocaleString()}
                    </td>
                    <td style={{
                      padding: '16px',
                      borderBottom: '1px solid #f3f4f6',
                      fontWeight: '500',
                      color: '#6b7280'
                    }}>
                      {((category.amount / totalExpenses) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;