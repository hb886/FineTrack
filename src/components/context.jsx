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
    { date: "18/7/2025", description: "home", category: "food", amount: -100, type: "expense" },
    { date: "20/7/2025", description: "rent", category: "Living", amount: -80, type: "expense" },
    { date: "23/7/2025", description: "gym", category: "Protein", amount: -50, type: "expense" },
    { date: "25/7/2025", description: "Salary", category: "Income", amount: 3500, type: "income" },
    { date: "26/7/2025", description: "Freelance", category: "Income", amount: 500, type: "income" },
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
