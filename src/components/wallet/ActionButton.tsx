
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ActionButtonProps {
  icon: ReactNode;
  label: string;
  color?: "primary" | "secondary" | "accent" | "default";
  onClick?: () => void;
  className?: string;
}

export function ActionButton({
  icon,
  label,
  color = "default",
  onClick,
  className,
}: ActionButtonProps) {
  const colorClasses = {
    primary: "bg-wallet-primary text-white hover:bg-wallet-primary/90",
    secondary: "bg-wallet-secondary text-white hover:bg-wallet-secondary/90",
    accent: "bg-wallet-accent text-wallet-text hover:bg-wallet-accent/90",
    default: "bg-white text-wallet-text border border-gray-200 hover:bg-gray-50",
  };
  
  return (
    <div className="flex flex-col items-center">
      <Button
        variant="ghost"
        size="icon"
        onClick={onClick}
        className={cn(
          "h-12 w-12 rounded-full mb-1",
          colorClasses[color],
          className
        )}
      >
        {icon}
      </Button>
      <span className="text-xs font-medium text-wallet-text-secondary">{label}</span>
    </div>
  );
}
