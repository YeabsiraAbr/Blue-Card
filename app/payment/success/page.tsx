"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import { CheckCircle } from "lucide-react";
import { Suspense } from "react";

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");
  const merchant = searchParams.get("merchant");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <div className="mb-6">
            <p className="text-gray-600 mb-1">Paid to {merchant}</p>
            <p className="text-3xl font-bold text-gray-900">
              ETB {amount?.toLocaleString()}
            </p>
          </div>
          <div className="space-y-3">
            <Button
              fullWidth
              onClick={() => router.push("/home")}
            >
              Back to Home
            </Button>
            <Button
              variant="outline"
              fullWidth
              onClick={() => router.push("/history")}
            >
              View Transaction
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}

