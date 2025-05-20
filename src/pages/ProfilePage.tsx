
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
  LogOut,
  BellRing,
  ChevronRight,
  LogIn
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";

function ProfileMenuItem({ 
  icon, 
  label, 
  onClick,
  endContent,
  danger
}: { 
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  endContent?: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <div 
      className={`flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer ${danger ? 'text-wallet-danger' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className={`w-8 h-8 rounded-full ${danger ? 'bg-red-100' : 'bg-gray-100'} flex items-center justify-center mr-3`}>
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
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
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
        <h1 className="text-xl font-bold">My Profile</h1>
      </div>
      
      <Card className="wallet-card mb-6 flex items-center">
        {isAuthenticated && user ? (
          <>
            <Avatar className="h-16 w-16 mr-4">
              <AvatarImage src={user.avatar || ""} />
              <AvatarFallback className="bg-wallet-primary text-white">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="font-semibold text-lg">{user.name}</h2>
              <p className="text-wallet-text-secondary">{user.email}</p>
            </div>
          </>
        ) : (
          <>
            <div className="h-16 w-16 mr-4 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-gray-400" />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-lg">Guest User</h2>
              <p className="text-wallet-text-secondary">Not logged in</p>
            </div>
          </>
        )}
        <Button variant="outline" size="sm" onClick={() => navigate("/edit-profile")}>
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
              <Badge variant="destructive" className="bg-wallet-accent text-xs rounded-full px-2 py-0.5 text-wallet-text">
                2 New
              </Badge>
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
          {isAuthenticated ? (
            <ProfileMenuItem
              icon={<LogOut className="h-5 w-5 text-wallet-danger" />}
              label="Log Out"
              onClick={handleLogout}
              danger={true}
              endContent={null}
            />
          ) : (
            <ProfileMenuItem
              icon={<LogIn className="h-5 w-5 text-wallet-primary" />}
              label="Log In"
              onClick={() => navigate("/login")}
              endContent={null}
            />
          )}
        </Card>
      </div>
      
      <div className="mt-8 text-center text-wallet-text-secondary text-sm">
        <p>MrChapterVerse v1.0.0</p>
        <p className="mt-1">© 2025 MrChapterVerse. All rights reserved.</p>
      </div>
    </PageLayout>
  );
}
