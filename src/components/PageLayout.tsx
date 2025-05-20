
import { Navigation } from "./Navigation";
import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  hideNavigation?: boolean;
}

export function PageLayout({ children, hideNavigation = false }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-wallet-background pb-16">
      <main className="flex-1 container max-w-md mx-auto p-4">
        {children}
      </main>
      {!hideNavigation && <Navigation />}
    </div>
  );
}
