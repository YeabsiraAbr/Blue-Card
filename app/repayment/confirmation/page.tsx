"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { CheckCircle } from "lucide-react";

export default function RepaymentConfirmationPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Repayment Initiated
          </h1>
          <p className="text-gray-600 mb-6">
            Your repayment has been successfully initiated. It may take a few
            minutes to reflect in your account.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> If you haven&apos;t completed the payment yet,
              please follow the steps provided to complete your repayment.
            </p>
          </div>
          <div className="space-y-3">
            <Button fullWidth onClick={() => router.push("/home")}>
              Back to Home
            </Button>
            <Button
              variant="outline"
              fullWidth
              onClick={() => router.push("/history")}
            >
              View Transaction History
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

