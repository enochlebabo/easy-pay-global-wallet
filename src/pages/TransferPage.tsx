
import { PageLayout } from "@/components/PageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, User, Building, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export default function TransferPage() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [recipientAccount, setRecipientAccount] = useState("");
  const [description, setDescription] = useState("");
  
  const handleTransfer = (type: string) => {
    // Validate inputs (simplified for demo)
    if (!recipient || !amount) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Simulate transfer processing
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: "Processing transfer...",
        success: () => {
          // In a real app, we would handle the transfer through an API
          navigate("/");
          return `Successfully sent $${amount} to ${recipient}`;
        },
        error: "Transfer failed. Please try again.",
      }
    );
  };

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
        <h1 className="text-xl font-bold">Transfer Money</h1>
      </div>
      
      <Card className="wallet-card mb-6">
        <Tabs defaultValue="person" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="person" className="flex items-center gap-2">
              <User className="h-4 w-4" /> To Person
            </TabsTrigger>
            <TabsTrigger value="bank" className="flex items-center gap-2">
              <Building className="h-4 w-4" /> To Bank
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="person" className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-wallet-text-secondary">Recipient Name</label>
              <Input
                type="text"
                placeholder="Enter name or email"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-wallet-text-secondary">Amount (USD)</label>
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-wallet-text-secondary">Description (Optional)</label>
              <Input
                type="text"
                placeholder="What's it for?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
            <Button 
              className="w-full mt-4 bg-wallet-primary hover:bg-wallet-primary/90"
              onClick={() => handleTransfer("person")}
            >
              <Send className="h-4 w-4 mr-2" /> Send Money
            </Button>
          </TabsContent>
          
          <TabsContent value="bank" className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-wallet-text-secondary">Bank Account Name</label>
              <Input
                type="text"
                placeholder="Account holder name"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-wallet-text-secondary">Account Number</label>
              <Input
                type="text"
                placeholder="Enter account number"
                value={recipientAccount}
                onChange={(e) => setRecipientAccount(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-wallet-text-secondary">Amount (USD)</label>
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-wallet-text-secondary">Description (Optional)</label>
              <Input
                type="text"
                placeholder="What's it for?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
            <Button 
              className="w-full mt-4 bg-wallet-primary hover:bg-wallet-primary/90"
              onClick={() => handleTransfer("bank")}
            >
              <Send className="h-4 w-4 mr-2" /> Transfer to Bank
            </Button>
          </TabsContent>
        </Tabs>
      </Card>
      
      <div className="text-center text-wallet-text-secondary text-sm">
        <p>Transfer limits: Up to $5,000 per day</p>
        <p className="mt-1">No fees for transfers between users</p>
      </div>
    </PageLayout>
  );
}
