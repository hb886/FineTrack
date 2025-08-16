import React, { useContext, useState } from "react";
import styled from "styled-components";
import {
  Plus,
  TrendingUp,
  DollarSign,
  Calendar,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import TransactionTable from "./Transactions";
import { AddButton, AddTransactionContainer, AddTransactionText, Amount, BalanceAmount, BalanceCard, BalanceHeader, BalanceLabel, CardTitle, ChangeContainer, ChangeText, DashboardContainer, ExpenseContainer, FormContainer, FormTitle, GridContainer, Header, HeaderSubtitle, HeaderTitle, IncomeContainer, IncomeExpensesCard, Label, MainContent, NetDifferenceAmount, NetDifferenceContainer, NetDifferenceHeader, NetDifferenceLabel, OverviewSection, ProgressBar, ProgressContainer, ProgressFill, ProgressHeader, ProgressLabel, ProgressValue, RemainingContainer, SavingsCard, SavingsDetails, SavingsLabel, SavingsRow, SavingsValue, SectionTitle, SubmitButton, TransactionForm, TransactionsCard, TransactionsHeader, TransactionsTitle } from "./Dashboard.styled";
import { Input } from "postcss";
import { MyContext } from "./context";

const Dashboard = () => {

  const {
    currentBalance,
    setCurrentBalance,
    monthlyIncome,
    monthlyExpenses,
    isEditingBalance,
    setIsEditingBalance,
    isEditingIncome,
    setIsEditingIncome,
    tempBalance,
    setTempBalance,
    tempIncome,
    setTempIncome,
  } = useContext(MyContext);


  const [newTransaction, setNewTransaction] = useState({
    description: "",
    amount: "",
    category: "",
  });

  


  return (
    <DashboardContainer>
      <MainContent>
        <Header>
          <div>
            <HeaderTitle>Dashboard</HeaderTitle>
            <HeaderSubtitle>Welcome back! Here's your financial overview.</HeaderSubtitle>
          </div>
        </Header>

        <OverviewSection>
          <SectionTitle>Overview</SectionTitle>
          <BalanceCard>
            <BalanceHeader>
              <BalanceLabel>Current Balance</BalanceLabel>
              <TrendingUp size={20} style={{ color: "#bfdbfe" }} />
            </BalanceHeader>

            {isEditingBalance ? (
              <input
                type="text"
                value={tempBalance}
                onChange={(e) => setTempBalance(e.target.value)}
                onBlur={() => {
                  setCurrentBalance(tempBalance);
                  setIsEditingBalance(false);
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    setCurrentBalance(tempBalance);
                    setIsEditingBalance(false);
                  }
                }}
                autoFocus
              />
            ) : (
              <BalanceAmount onClick={() => setIsEditingBalance(true)}>
                $ {currentBalance}
              </BalanceAmount>
            )}
          </BalanceCard>
          

        </OverviewSection>

        <TransactionsCard>
          <TransactionsHeader>
            <TransactionsTitle>Recent Transactions</TransactionsTitle>
          </TransactionsHeader>

      

          <TransactionTable />

        </TransactionsCard>

        <GridContainer>
          <IncomeExpensesCard>
            <CardTitle>Income vs Expenses</CardTitle>
            <div>
              <IncomeContainer>
                <Label>Monthly Income</Label>
                <Amount type="income">${monthlyIncome}</Amount>
              </IncomeContainer>
              <ExpenseContainer>
                <Label>Monthly Expenses</Label>
                <Amount type="expense">${monthlyExpenses}</Amount>
              </ExpenseContainer>
            </div>
            <NetDifferenceContainer>
              <NetDifferenceHeader>
                <NetDifferenceLabel>Net Difference</NetDifferenceLabel>
                <NetDifferenceAmount>+$2,069.50</NetDifferenceAmount>
              </NetDifferenceHeader>
              <ChangeContainer>
                <ArrowUpRight size={16} style={{ color: "#10b981" }} />
                <ChangeText>+10% This Month</ChangeText>
              </ChangeContainer>
            </NetDifferenceContainer>
          </IncomeExpensesCard>

          <SavingsCard>
            <CardTitle>Savings Goal</CardTitle>
            <ProgressContainer>
              <ProgressHeader>
                <ProgressLabel>Progress</ProgressLabel>
                <ProgressValue>65%</ProgressValue>
              </ProgressHeader>
              <ProgressBar>
                <ProgressFill />
              </ProgressBar>
            </ProgressContainer>
            <SavingsDetails>
              <SavingsRow>
                <SavingsLabel>Current Savings</SavingsLabel>
                <SavingsValue>$6,500</SavingsValue>
              </SavingsRow>
              <SavingsRow>
                <SavingsLabel>Goal</SavingsLabel>
                <SavingsValue>$10,000</SavingsValue>
              </SavingsRow>
              <RemainingContainer>
                <span>Remaining</span>
                <SavingsValue>$3,500</SavingsValue>
              </RemainingContainer>
            </SavingsDetails>
          </SavingsCard>
        </GridContainer>
      </MainContent>
    </DashboardContainer>
  );
};

export default Dashboard;