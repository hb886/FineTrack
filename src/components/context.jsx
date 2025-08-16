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


  const entry = [
    { id: 1, date: "18/7/2025", description: "home", category: "food", amount: -100, type: "expense" },
    { id: 2, date: "20/7/2025", description: "rent", category: "Living", amount: -80, type: "expense" },
    { id: 3, date: "23/7/2025", description: "gym", category: "Protein", amount: -50, type: "expense" },
    { id: 4, date: "25/7/2025", description: "Salary", category: "Income", amount: 3500, type: "income" },
    { id: 5, date: "26/7/2025", description: "Freelance", category: "Income", amount: 500, type: "income" },
  ]

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
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
