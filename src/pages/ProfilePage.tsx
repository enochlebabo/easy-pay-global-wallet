
import { PageLayout } from "@/components/PageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  Shield, 
  CreditCard, 
  User, 
  Settings, 
  HelpCircle,
  Lock,
  BellRing,
  ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function ProfileMenuItem({ 
  icon, 
  label, 
  onClick,
  endContent
}: { 
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  endContent?: React.ReactNode;
}) {
  return (
    <div 
      className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
          {icon}
        </div>
        <span>{label}</span>
      </div>
      {endContent || <ChevronRight className="h-4 w-4 text-wallet-text-secondary" />}
    </div>
  );
}

export default function ProfilePage() {
  const navigate = useNavigate();

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
        <h1 className="text-xl font-bold">My Profile</h1>
      </div>
      
      <Card className="wallet-card mb-6 flex items-center">
        <Avatar className="h-16 w-16 mr-4">
          <AvatarImage src="" />
          <AvatarFallback className="bg-wallet-primary text-white">JS</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h2 className="font-semibold text-lg">John Smith</h2>
          <p className="text-wallet-text-secondary">john.smith@example.com</p>
        </div>
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </Card>
      
      <div className="space-y-6">
        <Card className="wallet-card divide-y">
          <ProfileMenuItem
            icon={<User className="h-5 w-5 text-wallet-primary" />}
            label="Personal Information"
            onClick={() => {}}
          />
          <ProfileMenuItem
            icon={<CreditCard className="h-5 w-5 text-wallet-primary" />}
            label="Payment Methods"
            onClick={() => navigate("/cards")}
          />
          <ProfileMenuItem
            icon={<Shield className="h-5 w-5 text-wallet-primary" />}
            label="Security"
            onClick={() => {}}
          />
          <ProfileMenuItem
            icon={<BellRing className="h-5 w-5 text-wallet-primary" />}
            label="Notifications"
            onClick={() => {}}
            endContent={
              <div className="bg-wallet-accent text-xs rounded-full px-2 py-0.5">
                2 New
              </div>
            }
          />
        </Card>
        
        <Card className="wallet-card divide-y">
          <ProfileMenuItem
            icon={<Settings className="h-5 w-5 text-wallet-text-secondary" />}
            label="App Settings"
            onClick={() => {}}
          />
          <ProfileMenuItem
            icon={<HelpCircle className="h-5 w-5 text-wallet-text-secondary" />}
            label="Help & Support"
            onClick={() => {}}
          />
          <div 
            className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer"
            onClick={() => {}}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                <Lock className="h-5 w-5 text-wallet-danger" />
              </div>
              <span className="text-wallet-danger">Log Out</span>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="mt-8 text-center text-wallet-text-secondary text-sm">
        <p>App Version 1.0.0</p>
        <p className="mt-1">© 2025 E-Wallet. All rights reserved.</p>
      </div>
    </PageLayout>
  );
}
