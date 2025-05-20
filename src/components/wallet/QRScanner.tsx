
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

export function QRScanner() {
  const [isScanning, setIsScanning] = useState(false);
  
  // In a real app, this would use a QR scanning library
  // For now, we'll simulate the scanning process
  const startScanning = () => {
    setIsScanning(true);
    // Simulating a scan completion after 3 seconds
    setTimeout(() => {
      setIsScanning(false);
      // This would handle the scanned QR code result
      console.log("QR code scanned successfully!");
    }, 3000);
  };
  
  useEffect(() => {
    return () => setIsScanning(false);
  }, []);
  
  return (
    <Card className="wallet-card flex flex-col items-center justify-center p-6">
      <div 
        className={`relative w-64 h-64 border-2 ${
          isScanning ? "border-wallet-accent animate-pulse" : "border-gray-300"
        } rounded-lg overflow-hidden mb-4`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {isScanning ? (
            <div className="text-wallet-primary">Scanning...</div>
          ) : (
            <div className="text-center text-wallet-text-secondary">
              <p>QR Scanner Ready</p>
              <p className="text-xs mt-2">Position a QR code inside the frame</p>
            </div>
          )}
        </div>
        
        {/* Scan lines animation */}
        {isScanning && (
          <div className="absolute left-0 right-0 h-0.5 bg-wallet-accent animate-scan" 
               style={{
                 animation: "scan 2s linear infinite",
                 top: "50%",
                 transform: "translateY(-50%)"
               }}
          />
        )}
        
        {/* Corner markers for the QR frame */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-wallet-primary" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-wallet-primary" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-wallet-primary" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-wallet-primary" />
      </div>
      
      <button
        className="px-6 py-2 bg-wallet-primary text-white rounded-full"
        onClick={startScanning}
        disabled={isScanning}
      >
        {isScanning ? "Scanning..." : "Scan QR Code"}
      </button>
    </Card>
  );
}
