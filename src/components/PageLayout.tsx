
import { Navigation } from "./Navigation";
import { ReactNode, useState } from "react";
import { Bell, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface PageLayoutProps {
  children: ReactNode;
  hideNavigation?: boolean;
}

export function PageLayout({ children, hideNavigation = false }: PageLayoutProps) {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Welcome to E-Wallet!", read: false },
    { id: 2, message: "Your account has been secured", read: false },
  ]);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-wallet-background pb-16">
      <header className="p-4 flex justify-end">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-wallet-danger animate-pulse">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="flex justify-between items-center p-3 border-b">
              <h3 className="font-medium">Notifications</h3>
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
                  Mark all as read
                </Button>
              )}
            </div>
            <div className="max-h-80 overflow-auto">
              {notifications.length > 0 ? (
                <div className="divide-y">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className={`p-3 cursor-pointer hover:bg-gray-50 ${notification.read ? 'opacity-60' : ''}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <p className={`text-sm ${notification.read ? "" : "font-medium"}`}>{notification.message}</p>
                      <p className="text-xs text-wallet-text-secondary mt-1">Just now</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-wallet-text-secondary">
                  No notifications
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </header>
      
      <main className="flex-1 container max-w-md mx-auto p-4">
        {children}
      </main>
      
      {!hideNavigation && <Navigation />}
      
      {/* Quick Actions Floating Button */}
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            className="fixed bottom-20 right-4 h-12 w-12 rounded-full shadow-lg bg-gradient-to-r from-wallet-primary to-wallet-secondary"
            size="icon"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="rounded-t-xl h-72">
          <div className="pt-6">
            <h3 className="text-lg font-medium text-center mb-6">Quick Actions</h3>
            <div className="grid grid-cols-3 gap-4">
              <QuickActionButton label="Scan QR" icon="qr" />
              <QuickActionButton label="Send Money" icon="send" />
              <QuickActionButton label="Request" icon="request" />
              <QuickActionButton label="Pay Bill" icon="bill" />
              <QuickActionButton label="Top Up" icon="topup" />
              <QuickActionButton label="Rewards" icon="rewards" />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function QuickActionButton({ label, icon }: { label: string; icon: string }) {
  const getIconClass = () => {
    switch(icon) {
      case 'qr': return 'bg-wallet-primary';
      case 'send': return 'bg-wallet-secondary';
      case 'request': return 'bg-wallet-accent';
      case 'bill': return 'bg-wallet-danger';
      case 'topup': return 'bg-wallet-success';
      case 'rewards': return 'bg-purple-500';
      default: return 'bg-wallet-primary';
    }
  };

  return (
    <button className="flex flex-col items-center">
      <div className={`h-12 w-12 rounded-full ${getIconClass()} flex items-center justify-center mb-1`}>
        <span className="text-white text-lg">{icon.charAt(0).toUpperCase()}</span>
      </div>
      <span className="text-xs">{label}</span>
    </button>
  );
}
