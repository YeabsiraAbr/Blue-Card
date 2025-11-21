"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/Header";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Scan } from "lucide-react";

export default function ScanPage() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [merchantName, setMerchantName] = useState("");

  // In real app, use camera to scan QR code
  const handleScan = () => {
    // Simulate QR scan result
    setMerchantName("Coffee Shop");
  };

  const handleContinue = () => {
    if (amount && merchantName) {
      router.push(`/payment/confirm?amount=${amount}&merchant=${merchantName}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Scan QR Code" />
      <div className="px-6 py-8">
        <div className="max-w-md mx-auto">
          <Card>
            <div className="text-center mb-6">
              <div className="w-64 h-64 bg-gray-100 rounded-xl mx-auto mb-4 flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <Scan size={48} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-500 text-sm">Camera View</p>
                  <p className="text-gray-400 text-xs mt-1">
                    (QR scanner would be here)
                  </p>
                </div>
              </div>
              <Button variant="outline" onClick={handleScan}>
                Scan QR Code
              </Button>
            </div>

            {merchantName && (
              <div className="space-y-4">
                <Input
                  label="Merchant"
                  value={merchantName}
                  readOnly
                  className="bg-gray-50"
                />
                <Input
                  label="Amount (ETB)"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                />
                <Button fullWidth onClick={handleContinue}>
                  Continue
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

