
import { PageLayout } from "@/components/PageLayout";
import { QRScanner } from "@/components/wallet/QRScanner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ScanPage() {
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
        <h1 className="text-xl font-bold">Scan QR Code</h1>
      </div>
      
      <div className="flex flex-col items-center">
        <p className="text-wallet-text-secondary mb-6 text-center">
          Scan a QR code to make a payment or receive information
        </p>
        
        <QRScanner />
        
        <div className="mt-6 text-center text-wallet-text-secondary text-sm">
          <p>You can also generate your own QR code to receive payments</p>
          <Button
            variant="outline"
            className="mt-2"
            onClick={() => navigate("/my-qr")}
          >
            Generate My QR Code
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}
