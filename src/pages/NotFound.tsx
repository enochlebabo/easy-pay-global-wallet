
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-wallet-background">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-wallet-primary">404</h1>
        <p className="text-xl text-wallet-text mt-2">Page Not Found</p>
        <p className="text-wallet-text-secondary mt-2">
          The page you are looking for doesn't exist or has been moved.
        </p>
      </div>
      
      <Button
        className="flex items-center"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Return to Home
      </Button>
    </div>
  );
}
