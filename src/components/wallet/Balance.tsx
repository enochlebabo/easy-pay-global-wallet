
import { Card } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface BalanceProps {
  balance: number;
  currency?: string;
}

export function Balance({ balance, currency = "USD" }: BalanceProps) {
  const [showBalance, setShowBalance] = useState(true);
  
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  });
  
  const toggleBalance = () => setShowBalance(!showBalance);
  
  return (
    <Card className="wallet-card bg-gradient-to-r from-wallet-primary to-wallet-secondary text-white">
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-white/80">Your Balance</span>
          <button onClick={toggleBalance} className="text-white/80 hover:text-white">
            {showBalance ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
        <div className="flex items-baseline">
          {showBalance ? (
            <span className="text-3xl font-bold">
              {formatter.format(balance)}
            </span>
          ) : (
            <span className="text-3xl font-bold">••••••</span>
          )}
        </div>
      </div>
    </Card>
  );
}
