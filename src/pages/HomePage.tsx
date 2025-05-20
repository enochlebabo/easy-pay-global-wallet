
import { PageLayout } from "@/components/PageLayout";
import { Balance } from "@/components/wallet/Balance";
import { Transaction, TransactionType } from "@/components/wallet/Transaction";
import { ActionButton } from "@/components/wallet/ActionButton";
import { Send, QrCode, CreditCard, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data - in a real app, this would come from an API
const MOCK_TRANSACTIONS = [
  {
    id: "tx1",
    type: "incoming" as TransactionType,
    title: "John Smith",
    description: "Payment received",
    amount: 250.0,
    date: new Date(2025, 4, 19),
  },
  {
    id: "tx2",
    type: "outgoing" as TransactionType,
    title: "Amazon",
    description: "Online purchase",
    amount: 34.99,
    date: new Date(2025, 4, 18),
  },
  {
    id: "tx3",
    type: "payment" as TransactionType,
    title: "Starbucks",
    description: "Coffee",
    amount: 5.75,
    date: new Date(2025, 4, 18),
  },
  {
    id: "tx4",
    type: "mobile" as TransactionType,
    title: "Phone Bill",
    description: "Monthly payment",
    amount: 45.0,
    date: new Date(2025, 4, 17),
  },
];

export default function HomePage() {
  return (
    <PageLayout>
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-1">Hello, User</h1>
        <p className="text-wallet-text-secondary">Welcome back to your wallet</p>
      </div>
      
      <Balance balance={2458.35} currency="USD" />
      
      <div className="flex justify-between my-6">
        <Link to="/transfer">
          <ActionButton 
            icon={<Send className="h-5 w-5" />} 
            label="Send" 
            color="primary"
          />
        </Link>
        <Link to="/scan">
          <ActionButton 
            icon={<QrCode className="h-5 w-5" />} 
            label="Scan" 
            color="accent"
          />
        </Link>
        <Link to="/cards">
          <ActionButton 
            icon={<CreditCard className="h-5 w-5" />} 
            label="Cards" 
            color="secondary"
          />
        </Link>
        <Link to="/profile">
          <ActionButton 
            icon={<Wallet className="h-5 w-5" />} 
            label="Account" 
          />
        </Link>
      </div>
      
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Transactions</h2>
          <Link to="/transactions" className="text-wallet-primary text-sm font-medium">
            See All
          </Link>
        </div>
        
        <div className="space-y-3">
          {MOCK_TRANSACTIONS.map((transaction) => (
            <Transaction 
              key={transaction.id} 
              {...transaction} 
            />
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
