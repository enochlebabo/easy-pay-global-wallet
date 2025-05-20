
import { PageLayout } from "@/components/PageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, EyeOff, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface BankCardProps {
  type: string;
  number: string;
  name: string;
  expiry: string;
  color?: "primary" | "secondary" | "accent";
}

function BankCard({ type, number, name, expiry, color = "primary" }: BankCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  
  const bgColors = {
    primary: "bg-gradient-to-r from-wallet-primary to-wallet-secondary",
    secondary: "bg-gradient-to-r from-wallet-secondary to-[#34C0EB]",
    accent: "bg-gradient-to-r from-wallet-accent to-[#FD9B28]",
  };
  
  const formatCardNumber = (num: string, hidden: boolean) => {
    if (hidden) return "•••• •••• •••• " + num.slice(-4);
    return num.match(/.{1,4}/g)?.join(" ") || num;
  };

  return (
    <Card className={cn("p-4 text-white rounded-xl mb-4", bgColors[color])}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-white/80 mb-4">{type}</p>
        </div>
        <button 
          onClick={() => setShowDetails(!showDetails)}
          className="text-white/80 hover:text-white"
        >
          {showDetails ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      
      <div className="mb-4">
        <p className="text-lg font-medium">
          {formatCardNumber(number, !showDetails)}
        </p>
      </div>
      
      <div className="flex justify-between">
        <div>
          <p className="text-xs text-white/80">CARD HOLDER</p>
          <p className="text-sm font-medium">{name}</p>
        </div>
        <div>
          <p className="text-xs text-white/80">EXPIRES</p>
          <p className="text-sm font-medium">{expiry}</p>
        </div>
      </div>
    </Card>
  );
}

export default function CardsPage() {
  const navigate = useNavigate();
  
  // Mock card data - in a real app, this would come from an API
  const cards = [
    {
      id: "card1",
      type: "VISA DEBIT",
      number: "4111111111111111",
      name: "JOHN SMITH",
      expiry: "05/28",
      color: "primary" as const,
    },
    {
      id: "card2",
      type: "MASTERCARD",
      number: "5555555555554444",
      name: "JOHN SMITH",
      expiry: "09/27",
      color: "secondary" as const,
    },
    {
      id: "card3",
      type: "VISA CREDIT",
      number: "4111222233334444",
      name: "JOHN SMITH",
      expiry: "12/26",
      color: "accent" as const,
    },
  ];

  return (
    <PageLayout>
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="mr-4"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">My Cards</h1>
      </div>
      
      <div className="space-y-6">
        {cards.map((card) => (
          <BankCard
            key={card.id}
            type={card.type}
            number={card.number}
            name={card.name}
            expiry={card.expiry}
            color={card.color}
          />
        ))}
        
        <Button 
          className="flex items-center justify-center w-full py-6 border-dashed border-2 bg-transparent hover:bg-gray-50 text-wallet-text-secondary"
          variant="outline"
          onClick={() => navigate("/add-card")}
        >
          <Plus className="h-5 w-5 mr-2" /> Add New Card
        </Button>
      </div>
      
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Card Settings</h2>
        <Card className="wallet-card divide-y">
          <div className="py-3 px-1">
            <button className="w-full text-left text-wallet-text">Freeze Card</button>
          </div>
          <div className="py-3 px-1">
            <button className="w-full text-left text-wallet-text">Change PIN</button>
          </div>
          <div className="py-3 px-1">
            <button className="w-full text-left text-wallet-text">Card Limits</button>
          </div>
          <div className="py-3 px-1">
            <button className="w-full text-left text-wallet-danger">Report Lost or Stolen</button>
          </div>
        </Card>
      </div>
    </PageLayout>
  );
}
