
import { Card } from "@/components/ui/card";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface BalanceProps {
  balance: number;
  currency?: string;
}

export function Balance({ balance, currency = "USD" }: BalanceProps) {
  const [showBalance, setShowBalance] = useState(false);
  const [isProtected, setIsProtected] = useState(true);
  const [password, setPassword] = useState("");
  
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  });
  
  const toggleBalance = () => {
    if (!isProtected) {
      setShowBalance(!showBalance);
    }
  };

  const handlePasswordSubmit = () => {
    if (password === "123") {
      setIsProtected(false);
      setShowBalance(true);
      toast.success("Balance unlocked successfully!");
      setPassword("");
    } else {
      toast.error("Incorrect password");
    }
  };

  const handleLock = () => {
    setIsProtected(true);
    setShowBalance(false);
  };
  
  return (
    <Card className="wallet-card bg-gradient-to-r from-wallet-primary to-wallet-secondary text-white relative">
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-white/80">Your Balance</span>
          {isProtected ? (
            <Lock className="h-5 w-5 text-white/80" />
          ) : (
            <button onClick={toggleBalance} className="text-white/80 hover:text-white">
              {showBalance ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          )}
        </div>
        
        {isProtected ? (
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 mt-2">
              <Input 
                type="password" 
                placeholder="Enter password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/20 border-white/10 text-white placeholder:text-white/50 h-8"
              />
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handlePasswordSubmit}
                className="text-white bg-white/20 hover:bg-white/30 h-8"
              >
                Unlock
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-baseline justify-between">
            <div>
              {showBalance ? (
                <span className="text-3xl font-bold animate-fade-in">
                  {formatter.format(balance)}
                </span>
              ) : (
                <span className="text-3xl font-bold animate-fade-in">••••••</span>
              )}
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLock} 
              className="text-xs bg-white/10 hover:bg-white/20 text-white/80"
            >
              Lock
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
