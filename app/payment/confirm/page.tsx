"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/ui/Header";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { CheckCircle } from "lucide-react";
import { useState, Suspense } from "react";

function PaymentConfirmContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");
  const merchant = searchParams.get("merchant");
  const [pin, setPin] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleConfirm = () => {
    if (pin.length === 4) {
      // In real app, verify PIN and process payment
      setShowSuccess(true);
      setTimeout(() => {
        router.push("/payment/success");
      }, 2000);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-green-600" />
          </div>
          <p className="text-xl font-semibold">Processing...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Confirm Payment" />
      <div className="px-6 py-8">
        <div className="max-w-md mx-auto">
          <Card>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Merchant:</span>
                  <span className="font-semibold">{merchant}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold text-lg">
                    ETB {amount?.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter PIN
              </label>
              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                className="w-full px-4 py-3 text-2xl text-center font-mono border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="••••"
                autoFocus
              />
            </div>

            <Button
              fullWidth
              onClick={handleConfirm}
              disabled={pin.length !== 4}
            >
              Confirm Payment
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function PaymentConfirmPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    }>
      <PaymentConfirmContent />
    </Suspense>
  );
}

