
import { Home, CreditCard, QrCode, Send, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export function Navigation() {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: CreditCard, label: "Cards", path: "/cards" },
    { icon: QrCode, label: "Scan", path: "/scan" },
    { icon: Send, label: "Transfer", path: "/transfer" },
    { icon: User, label: "Profile", path: "/profile" },
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-wallet-card shadow-lg rounded-t-xl border-t border-gray-100 z-10">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center w-full py-1",
                isActive ? "text-wallet-primary" : "text-wallet-text-secondary"
              )}
            >
              <item.icon className={cn("h-5 w-5 mb-1", isActive ? "text-wallet-primary" : "text-wallet-text-secondary")} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
