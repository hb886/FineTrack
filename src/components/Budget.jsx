import React, { useContext, useState } from 'react';
import { 
  Target, 
  Plus, 
  Edit3, 
  Trash2, 
  TrendingUp, 
  TrendingDown,
  AlertCircle,
  CheckCircle,
  DollarSign,
  Calendar,
  PieChart,
  BarChart3,
  Save,
  X
} from 'lucide-react';
import { MyContext } from './context';

const Budget = () => {
  const { entry, totalIncome, totalExpenses, netBalance } = useContext(MyContext);
  
  // Budget state
  const [budgets, setBudgets] = useState([
    { id: 1, category: 'Food', budgetAmount: 300, spent: 250, period: 'monthly' },
    { id: 2, category: 'Transport', budgetAmount: 150, spent: 60, period: 'monthly' },
    { id: 3, category: 'Entertainment', budgetAmount: 200, spent: 180, period: 'monthly' },
    { id: 4, category: 'Shopping', budgetAmount: 250, spent: 200, period: 'monthly' },
  ]);

  // Goals state
  const [goals, setGoals] = useState([
    { id: 1, title: 'Emergency Fund', targetAmount: 5000, currentAmount: 2500, deadline: '2024-12-31', type: 'savings' },
    { id: 2, title: 'Vacation Fund', targetAmount: 2000, currentAmount: 800, deadline: '2024-08-15', type: 'savings' },
    { id: 3, title: 'Reduce Food Spending', targetAmount: 250, currentAmount: 250, deadline: '2024-03-31', type: 'expense' },
  ]);

  // Form states
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
  const [editingGoal, setEditingGoal] = useState(null);

  const [budgetForm, setBudgetForm] = useState({
    category: '',
    budgetAmount: '',
    period: 'monthly'
  });

  const [goalForm, setGoalForm] = useState({
    title: '',
    targetAmount: '',
    currentAmount: '',
    deadline: '',
    type: 'savings'
  });

  // Calculate actual spending by category from transactions
  const getActualSpending = (category) => {
    return entry
      .filter(t => t.type === 'expense' && t.category.toLowerCase() === category.toLowerCase())
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  };

  // Update budgets with actual spending
  const budgetsWithActual = budgets.map(budget => ({
    ...budget,
    spent: getActualSpending(budget.category)
  }));

  // Styles
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

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 18px',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.3s ease'
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    color: 'white',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)'
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    background: 'white',
    color: '#6b7280',
    border: '2px solid #e5e7eb'
  };

  const dangerButtonStyle = {
    ...buttonStyle,
    background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
    color: 'white',
    padding: '8px 12px',
    fontSize: '12px'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    border: '2px solid #e5e7eb',
    borderRadius: '10px',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.3s ease'
  };

  // Handle budget operations
  const handleBudgetSubmit = (e) => {
    e.preventDefault();
    if (editingBudget) {
      setBudgets(prev => prev.map(b => 
        b.id === editingBudget.id 
          ? { ...b, ...budgetForm, budgetAmount: parseFloat(budgetForm.budgetAmount) }
          : b
      ));
      setEditingBudget(null);
    } else {
      const newBudget = {
        id: Date.now(),
        ...budgetForm,
        budgetAmount: parseFloat(budgetForm.budgetAmount),
        spent: getActualSpending(budgetForm.category)
      };
      setBudgets(prev => [...prev, newBudget]);
    }
    setBudgetForm({ category: '', budgetAmount: '', period: 'monthly' });
    setShowBudgetForm(false);
  };

  const handleGoalSubmit = (e) => {
    e.preventDefault();
    if (editingGoal) {
      setGoals(prev => prev.map(g => 
        g.id === editingGoal.id 
          ? { 
              ...g, 
              ...goalForm, 
              targetAmount: parseFloat(goalForm.targetAmount),
              currentAmount: parseFloat(goalForm.currentAmount)
            }
          : g
      ));
      setEditingGoal(null);
    } else {
      const newGoal = {
        id: Date.now(),
        ...goalForm,
        targetAmount: parseFloat(goalForm.targetAmount),
        currentAmount: parseFloat(goalForm.currentAmount)
      };
      setGoals(prev => [...prev, newGoal]);
    }
    setGoalForm({ title: '', targetAmount: '', currentAmount: '', deadline: '', type: 'savings' });
    setShowGoalForm(false);
  };

  const deleteBudget = (id) => {
    setBudgets(prev => prev.filter(b => b.id !== id));
  };

  const deleteGoal = (id) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  };

  const editBudget = (budget) => {
    setBudgetForm({
      category: budget.category,
      budgetAmount: budget.budgetAmount.toString(),
      period: budget.period
    });
    setEditingBudget(budget);
    setShowBudgetForm(true);
  };

  const editGoal = (goal) => {
    setGoalForm({
      title: goal.title,
      targetAmount: goal.targetAmount.toString(),
      currentAmount: goal.currentAmount.toString(),
      deadline: goal.deadline,
      type: goal.type
    });
    setEditingGoal(goal);
    setShowGoalForm(true);
  };

  // Progress calculations
  const getBudgetProgress = (budget) => {
    const progress = (budget.spent / budget.budgetAmount) * 100;
    return Math.min(progress, 100);
  };

  const getGoalProgress = (goal) => {
    return (goal.currentAmount / goal.targetAmount) * 100;
  };

  const getBudgetStatus = (budget) => {
    const progress = getBudgetProgress(budget);
    if (progress >= 100) return { status: 'over', color: '#dc2626', icon: AlertCircle };
    if (progress >= 80) return { status: 'warning', color: '#f59e0b', icon: AlertCircle };
    return { status: 'good', color: '#10b981', icon: CheckCircle };
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
              Budget Planning & Goals
            </h1>
            <p style={{
              color: '#6b7280',
              margin: '0',
              fontSize: '18px'
            }}>
              Set budgets, track spending, and achieve your financial goals
            </p>
          </div>
        </div>

        {/* Overview Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
          marginBottom: '40px'
        }}>
          <div style={{
            ...cardStyle,
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            color: 'white'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ margin: '0', fontSize: '16px', opacity: '0.9' }}>Total Budget</h3>
              <Target size={24} />
            </div>
            <p style={{ margin: '0', fontSize: '32px', fontWeight: '900' }}>
              ${budgets.reduce((sum, b) => sum + b.budgetAmount, 0).toLocaleString()}
            </p>
          </div>

          <div style={{
            ...cardStyle,
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            color: 'white'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ margin: '0', fontSize: '16px', opacity: '0.9' }}>Total Spent</h3>
              <TrendingDown size={24} />
            </div>
            <p style={{ margin: '0', fontSize: '32px', fontWeight: '900' }}>
              ${budgetsWithActual.reduce((sum, b) => sum + b.spent, 0).toLocaleString()}
            </p>
          </div>

          <div style={{
            ...cardStyle,
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: 'white'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ margin: '0', fontSize: '16px', opacity: '0.9' }}>Budget Remaining</h3>
              <DollarSign size={24} />
            </div>
            <p style={{ margin: '0', fontSize: '32px', fontWeight: '900' }}>
              ${(budgets.reduce((sum, b) => sum + b.budgetAmount, 0) - 
                 budgetsWithActual.reduce((sum, b) => sum + b.spent, 0)).toLocaleString()}
            </p>
          </div>

          <div style={{
            ...cardStyle,
            background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
            color: 'white'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ margin: '0', fontSize: '16px', opacity: '0.9' }}>Active Goals</h3>
              <Target size={24} />
            </div>
            <p style={{ margin: '0', fontSize: '32px', fontWeight: '900' }}>
              {goals.length}
            </p>
          </div>
        </div>

        {/* Budget Section */}
        <div style={{ ...cardStyle, marginBottom: '40px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '800',
              color: '#111827',
              margin: '0',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <BarChart3 size={28} style={{ color: '#3b82f6' }} />
              Budget Tracking
            </h2>
            <button 
              style={primaryButtonStyle}
              onClick={() => setShowBudgetForm(true)}
            >
              <Plus size={16} />
              Add Budget
            </button>
          </div>

          {/* Budget Form */}
          {showBudgetForm && (
            <div style={{
              background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
              border: '2px solid #bae6fd',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '24px'
            }}>
              <h3 style={{ margin: '0 0 16px 0', color: '#0369a1' }}>
                {editingBudget ? 'Edit Budget' : 'Add New Budget'}
              </h3>
              <form onSubmit={handleBudgetSubmit}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '16px',
                  marginBottom: '20px'
                }}>
                  <input
                    type="text"
                    placeholder="Category"
                    value={budgetForm.category}
                    onChange={(e) => setBudgetForm(prev => ({ ...prev, category: e.target.value }))}
                    style={inputStyle}
                    required
                  />
                  <input
                    type="number"
                    placeholder="Budget Amount"
                    value={budgetForm.budgetAmount}
                    onChange={(e) => setBudgetForm(prev => ({ ...prev, budgetAmount: e.target.value }))}
                    style={inputStyle}
                    required
                  />
                  <select
                    value={budgetForm.period}
                    onChange={(e) => setBudgetForm(prev => ({ ...prev, period: e.target.value }))}
                    style={inputStyle}
                  >
                    <option value="monthly">Monthly</option>
                    <option value="weekly">Weekly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="submit" style={primaryButtonStyle}>
                    <Save size={16} />
                    {editingBudget ? 'Update' : 'Save'} Budget
                  </button>
                  <button
                    type="button"
                    style={secondaryButtonStyle}
                    onClick={() => {
                      setShowBudgetForm(false);
                      setEditingBudget(null);
                      setBudgetForm({ category: '', budgetAmount: '', period: 'monthly' });
                    }}
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Budget List */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {budgetsWithActual.map((budget) => {
              const progress = getBudgetProgress(budget);
              const status = getBudgetStatus(budget);
              const StatusIcon = status.icon;

              return (
                <div key={budget.id} style={{
                  background: '#f8fafc',
                  border: `2px solid ${status.color}`,
                  borderRadius: '16px',
                  padding: '20px'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px'
                  }}>
                    <h4 style={{
                      margin: '0',
                      fontSize: '18px',
                      fontWeight: '700',
                      color: '#111827'
                    }}>
                      {budget.category}
                    </h4>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        style={{
                          ...buttonStyle,
                          padding: '6px',
                          background: '#e5e7eb',
                          color: '#6b7280'
                        }}
                        onClick={() => editBudget(budget)}
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        style={{
                          ...dangerButtonStyle,
                          padding: '6px'
                        }}
                        onClick={() => deleteBudget(budget.id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px'
                  }}>
                    <StatusIcon size={20} style={{ color: status.color }} />
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#6b7280',
                      textTransform: 'capitalize'
                    }}>
                      {budget.period}
                    </span>
                  </div>

                  <div style={{
                    background: '#e5e7eb',
                    borderRadius: '10px',
                    height: '12px',
                    marginBottom: '12px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      background: status.color,
                      height: '100%',
                      width: `${progress}%`,
                      borderRadius: '10px',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <p style={{
                        margin: '0 0 4px 0',
                        fontSize: '12px',
                        color: '#6b7280',
                        fontWeight: '500'
                      }}>
                        Spent: ${budget.spent.toLocaleString()}
                      </p>
                      <p style={{
                        margin: '0',
                        fontSize: '12px',
                        color: '#6b7280',
                        fontWeight: '500'
                      }}>
                        Budget: ${budget.budgetAmount.toLocaleString()}
                      </p>
                    </div>
                    <div style={{
                      fontSize: '20px',
                      fontWeight: '800',
                      color: status.color
                    }}>
                      {progress.toFixed(0)}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Goals Section */}
        <div style={cardStyle}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '800',
              color: '#111827',
              margin: '0',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <Target size={28} style={{ color: '#8b5cf6' }} />
              Financial Goals
            </h2>
            <button 
              style={primaryButtonStyle}
              onClick={() => setShowGoalForm(true)}
            >
              <Plus size={16} />
              Add Goal
            </button>
          </div>

          {/* Goal Form */}
          {showGoalForm && (
            <div style={{
              background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
              border: '2px solid #c084fc',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '24px'
            }}>
              <h3 style={{ margin: '0 0 16px 0', color: '#7c3aed' }}>
                {editingGoal ? 'Edit Goal' : 'Add New Goal'}
              </h3>
              <form onSubmit={handleGoalSubmit}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '16px',
                  marginBottom: '20px'
                }}>
                  <input
                    type="text"
                    placeholder="Goal Title"
                    value={goalForm.title}
                    onChange={(e) => setGoalForm(prev => ({ ...prev, title: e.target.value }))}
                    style={inputStyle}
                    required
                  />
                  <input
                    type="number"
                    placeholder="Target Amount"
                    value={goalForm.targetAmount}
                    onChange={(e) => setGoalForm(prev => ({ ...prev, targetAmount: e.target.value }))}
                    style={inputStyle}
                    required
                  />
                  <input
                    type="number"
                    placeholder="Current Amount"
                    value={goalForm.currentAmount}
                    onChange={(e) => setGoalForm(prev => ({ ...prev, currentAmount: e.target.value }))}
                    style={inputStyle}
                    required
                  />
                  <input
                    type="date"
                    value={goalForm.deadline}
                    onChange={(e) => setGoalForm(prev => ({ ...prev, deadline: e.target.value }))}
                    style={inputStyle}
                    required
                  />
                  <select
                    value={goalForm.type}
                    onChange={(e) => setGoalForm(prev => ({ ...prev, type: e.target.value }))}
                    style={inputStyle}
                  >
                    <option value="savings">Savings Goal</option>
                    <option value="expense">Expense Limit</option>
                  </select>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="submit" style={primaryButtonStyle}>
                    <Save size={16} />
                    {editingGoal ? 'Update' : 'Save'} Goal
                  </button>
                  <button
                    type="button"
                    style={secondaryButtonStyle}
                    onClick={() => {
                      setShowGoalForm(false);
                      setEditingGoal(null);
                      setGoalForm({ title: '', targetAmount: '', currentAmount: '', deadline: '', type: 'savings' });
                    }}
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Goals List */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '24px'
          }}>
            {goals.map((goal) => {
              const progress = getGoalProgress(goal);
              const isCompleted = progress >= 100;
              const daysLeft = Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24));

              return (
                <div key={goal.id} style={{
                  background: isCompleted ? '#f0fdf4' : '#f8fafc',
                  border: `2px solid ${isCompleted ? '#10b981' : '#e5e7eb'}`,
                  borderRadius: '16px',
                  padding: '24px'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px'
                  }}>
                    <h4 style={{
                      margin: '0',
                      fontSize: '18px',
                      fontWeight: '700',
                      color: '#111827'
                    }}>
                      {goal.title}
                    </h4>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        style={{
                          ...buttonStyle,
                          padding: '6px',
                          background: '#e5e7eb',
                          color: '#6b7280'
                        }}
                        onClick={() => editGoal(goal)}
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        style={{
                          ...dangerButtonStyle,
                          padding: '6px'
                        }}
                        onClick={() => deleteGoal(goal.id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px'
                  }}>
                    <span style={{
                      background: goal.type === 'savings' ? '#dbeafe' : '#fef3c7',
                      color: goal.type === 'savings' ? '#1e40af' : '#92400e',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '500',
                      textTransform: 'capitalize'
                    }}>
                      {goal.type} Goal
                    </span>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: daysLeft < 0 ? '#dc2626' : '#6b7280',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      <Calendar size={14} />
                      {daysLeft < 0 ? 'Overdue' : `${daysLeft} days left`}
                    </div>
                  </div>

                  <div style={{
                    background: '#e5e7eb',
                    borderRadius: '10px',
                    height: '12px',
                    marginBottom: '16px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      background: isCompleted ? '#10b981' : '#3b82f6',
                      height: '100%',
                      width: `${Math.min(progress, 100)}%`,
                      borderRadius: '10px',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <p style={{
                        margin: '0 0 4px 0',
                        fontSize: '14px',
                        color: '#6b7280',
                        fontWeight: '500'
                      }}>
                        ${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
                      </p>
                      <p style={{
                        margin: '0',
                        fontSize: '12px',
                        color: '#6b7280'
                      }}>
                        ${(goal.targetAmount - goal.currentAmount).toLocaleString()} remaining
                      </p>
                    </div>
                    <div style={{
                      fontSize: '24px',
                      fontWeight: '800',
                      color: isCompleted ? '#10b981' : '#3b82f6'
                    }}>
                      {progress.toFixed(0)}%
                    </div>
                  </div>

                  {isCompleted && (
                    <div style={{
                      marginTop: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#10b981',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}>
                      <CheckCircle size={16} />
                      Goal Achieved!
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budget;