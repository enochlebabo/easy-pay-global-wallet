
import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Camera, Upload } from "lucide-react";

export function QRScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      setCameraStream(stream);
      setHasCameraPermission(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      
      setIsScanning(true);
      toast.success("Camera access granted");
      
      // Simulate a scan completion after 5 seconds
      setTimeout(() => {
        setIsScanning(false);
        toast.success("QR code scanned successfully!");
      }, 5000);
      
    } catch (error) {
      console.error("Error accessing camera:", error);
      setHasCameraPermission(false);
      toast.error("Camera access denied or not available");
    }
  };
  
  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setIsScanning(false);
  };
  
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);
  
  const uploadQRCode = () => {
    // Create a hidden file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        toast.success("QR code uploaded, processing...");
        // Here you would send this to your QR code processing service
        setTimeout(() => {
          toast.success("QR code processed successfully!");
        }, 2000);
      }
    };
    input.click();
  };
  
  return (
    <Card className="wallet-card flex flex-col items-center justify-center p-6">
      <div 
        className={`relative w-64 h-64 border-2 ${
          isScanning ? "border-wallet-accent animate-pulse" : "border-gray-300"
        } rounded-lg overflow-hidden mb-4`}
      >
        {hasCameraPermission && (
          <video 
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            playsInline
          />
        )}
        
        <div className={`absolute inset-0 flex items-center justify-center ${hasCameraPermission ? 'bg-transparent' : 'bg-white'}`}>
          {isScanning ? (
            <div className="text-wallet-primary font-medium">Scanning...</div>
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
      
      <div className="flex gap-3">
        <Button
          className="px-6 py-2 bg-wallet-primary text-white rounded-full"
          onClick={isScanning ? stopCamera : requestCameraPermission}
          disabled={hasCameraPermission === false}
        >
          <Camera className="mr-2 h-4 w-4" />
          {isScanning ? "Stop Scanning" : "Scan QR Code"}
        </Button>
        
        <Button
          variant="outline"
          className="px-6 py-2 rounded-full"
          onClick={uploadQRCode}
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload QR
        </Button>
      </div>
      
      {hasCameraPermission === false && (
        <p className="text-wallet-danger text-sm mt-4">
          Camera access was denied. Please check your browser settings.
        </p>
      )}
    </Card>
  );
}
