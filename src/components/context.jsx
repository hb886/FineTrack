import { createContext, useState } from "react";

export const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [currentBalance, setCurrentBalance] = useState("12,345");
  const [monthlyIncome, setMonthlyIncome] = useState("4,250.00");
  const [monthlyExpenses, setMonthlyExpenses] = useState("2,180.50");
  const [isEditingBalance, setIsEditingBalance] = useState(false);
  const [isEditingIncome, setIsEditingIncome] = useState(false);
  const [tempBalance, setTempBalance] = useState(currentBalance);
  const [tempIncome, setTempIncome] = useState(monthlyIncome);
const [entry, setEntry] = useState([
    { id: 1, date: "01/08/2025", description: "Monthly Salary", category: "Income", amount: 4500, type: "income" },
    { id: 2, date: "15/08/2025", description: "Freelance Project", category: "Income", amount: 800, type: "income" },
    { id: 3, date: "28/08/2025", description: "Side Business", category: "Income", amount: 350, type: "income" },
    { id: 4, date: "01/08/2025", description: "Rent Payment", category: "Living", amount: -1200, type: "expense" },
    { id: 5, date: "05/08/2025", description: "Electricity Bill", category: "Living", amount: -120, type: "expense" },
    { id: 6, date: "12/08/2025", description: "Internet & Phone", category: "Living", amount: -80, type: "expense" },
    { id: 7, date: "03/08/2025", description: "Grocery Shopping", category: "Food", amount: -180, type: "expense" },
    { id: 8, date: "10/08/2025", description: "Restaurant Dinner", category: "Food", amount: -65, type: "expense" },
    { id: 9, date: "18/08/2025", description: "Coffee & Snacks", category: "Food", amount: -25, type: "expense" },
    { id: 10, date: "08/08/2025", description: "Gas Station", category: "Transport", amount: -70, type: "expense" },
    { id: 11, date: "22/08/2025", description: "Gym Membership", category: "Health", amount: -45, type: "expense" },
    { id: 12, date: "25/08/2025", description: "Online Shopping", category: "Shopping", amount: -150, type: "expense" },
]);

  const totalIncome = entry
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = entry
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const netBalance = totalIncome - totalExpenses;

    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1) : 0;

    console.log(savingsRate);
    


  console.log("currentBalance", currentBalance);
  

  return (
    <MyContext.Provider
      value={{
        currentBalance,
        setCurrentBalance,
        monthlyIncome,
        setMonthlyIncome,
        monthlyExpenses,
        isEditingBalance,
        setIsEditingBalance,
        isEditingIncome,
        setIsEditingIncome,
        tempBalance,
        setTempBalance,
        tempIncome,
        setTempIncome,
        entry,
        setEntry,
        totalIncome,
        totalExpenses,
        netBalance,
        savingsRate
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
