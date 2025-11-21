"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { CheckCircle } from "lucide-react";

export default function SubmittedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Verification Submitted
          </h1>
          <p className="text-gray-600 mb-6">
            Your identity verification application has been submitted
            successfully. Our team will review your information and you'll
            receive a notification once the review is complete.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            This usually takes 1-2 business days.
          </p>
          <Button
            fullWidth
            onClick={() => router.push("/home")}
          >
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  );
}

