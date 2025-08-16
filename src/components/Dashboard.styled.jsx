import styled from "styled-components";


export const DashboardContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #faf5ff 100%);
  padding: 24px;
`;

export const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
`;

export const HeaderTitle = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #111827;
  margin: 0 0 8px 0;
`;

export const HeaderSubtitle = styled.p`
  color: #6b7280;
  margin: 0;
  font-size: 16px;
`;

export const OverviewSection = styled.div`
  margin-bottom: 32px;
`;

export const SectionTitle = styled.h2`
  color: black;
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 16px 0;
`;

export const BalanceCard = styled.div`
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  border-radius: 12px;
  padding: 24px;
  color: white;
  margin-bottom: 24px;
`;

export const BalanceHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const BalanceLabel = styled.p`
  color: #bfdbfe;
  font-size: 14px;
  font-weight: 500;
  margin: 0;
`;

export const BalanceAmount = styled.p`
  font-size: 28px;
  font-weight: bold;
  margin: 0;
`;

export const TransactionsCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #f3f4f6;
  padding: 24px;
  margin-bottom: 32px;
  
`;

export const TransactionsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 16px;
`;

export const TransactionsTitle = styled.h3`
  color: black;
  font-size: 18px;
  font-weight: 500;
  margin: 0;
`;

export const AddTransactionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const AddTransactionText = styled.span`
  color: black;
  font-size: 16px;
  font-weight: 500;
`;

export const AddButton = styled.button`
  cursor: pointer;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  padding: 8px 12px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

export const TransactionForm = styled.div`
  margin-bottom: 24px;
  padding: 16px;
  background: #eff6ff;
  border-radius: 8px;
  border: 1px solid #bfdbfe;
`;

export const FormTitle = styled.p`
  color: #1e40af;
  font-weight: 500;
  margin: 0 0 8px 0;
`;

export const FormContainer = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

export const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
`;

export const SubmitButton = styled.button`
  padding: 8px 16px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
`;

export const IncomeExpensesCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #f3f4f6;
  padding: 24px;
`;

export const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #111827;
  margin: 0 0 20px 0;
`;

export const IncomeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: #dcfce7;
  border-radius: 8px;
  margin-bottom: 12px;
`;

export const ExpenseContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: #fef2f2;
  border-radius: 8px;
`;

export const Label = styled.span`
  font-weight: 500;
  color: #111827;
`;

export const Amount = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => (props.type === "income" ? "#059669" : "#dc2626")};
`;

export const NetDifferenceContainer = styled.div`
  padding-top: 20px;
  border-top: 1px solid #f3f4f6;
`;

export const NetDifferenceHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const NetDifferenceLabel = styled.span`
  font-weight: 600;
  color: #111827;
`;

export const NetDifferenceAmount = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #059669;
`;

export const ChangeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ChangeText = styled.span`
  color: #059669;
  font-weight: 500;
  font-size: 14px;
`;

export const SavingsCard = styled.div`
  background: linear-gradient(135deg, #7c3aed 0%, #6366f1 100%);
  border-radius: 12px;
  padding: 24px;
  color: white;
`;

export const ProgressContainer = styled.div`
  margin-bottom: 16px;
`;

export const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const ProgressLabel = styled.span`
  color: #c4b5fd;
`;

export const ProgressValue = styled.span`
  font-weight: bold;
`;

export const ProgressBar = styled.div`
  width: 100%;
  background: rgba(124, 58, 237, 0.5);
  border-radius: 9999px;
  height: 10px;
`;

export const ProgressFill = styled.div`
  background: white;
  height: 10px;
  border-radius: 9999px;
  width: 65%;
`;

export const SavingsDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SavingsRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SavingsLabel = styled.span`
  color: #c4b5fd;
`;

export const SavingsValue = styled.span`
  font-weight: bold;
`;

export const RemainingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  padding-top: 8px;
  border-top: 1px solid rgba(196, 181, 253, 0.3);
`;