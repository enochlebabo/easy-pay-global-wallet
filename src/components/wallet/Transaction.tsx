
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDownLeft, ArrowUpRight, CreditCard, Smartphone } from "lucide-react";

export type TransactionType = "incoming" | "outgoing" | "payment" | "mobile";

export interface TransactionProps {
  id: string;
  type: TransactionType;
  title: string;
  description?: string;
  amount: number;
  currency?: string;
  date: Date;
}

const getTransactionIcon = (type: TransactionType) => {
  switch (type) {
    case "incoming":
      return <ArrowDownLeft className="h-5 w-5 text-wallet-success" />;
    case "outgoing":
      return <ArrowUpRight className="h-5 w-5 text-wallet-danger" />;
    case "payment":
      return <CreditCard className="h-5 w-5 text-wallet-primary" />;
    case "mobile":
      return <Smartphone className="h-5 w-5 text-wallet-secondary" />;
    default:
      return <CreditCard className="h-5 w-5 text-wallet-primary" />;
  }
};

const getAmountColor = (type: TransactionType) => {
  switch (type) {
    case "incoming":
      return "text-wallet-success";
    case "outgoing":
      return "text-wallet-danger";
    default:
      return "text-wallet-text";
  }
};

export function Transaction({
  type,
  title,
  description,
  amount,
  currency = "USD",
  date,
}: TransactionProps) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  });
  
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
  
  const formattedAmount = formatter.format(amount);
  const isNegative = type === "outgoing" || type === "payment";
  
  return (
    <Card className="wallet-card flex items-start p-3 mb-3">
      <div className="bg-gray-100 rounded-full p-2 mr-3">
        {getTransactionIcon(type)}
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <span className="font-medium">{title}</span>
          <span className={cn("font-semibold", getAmountColor(type))}>
            {isNegative ? "-" : "+"} {formattedAmount}
          </span>
        </div>
        <div className="flex justify-between text-sm text-wallet-text-secondary mt-1">
          <span>{description || formattedDate}</span>
          <span>{formattedDate}</span>
        </div>
      </div>
    </Card>
  );
}
