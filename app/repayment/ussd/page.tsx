"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/Header";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Phone, ArrowRight } from "lucide-react";

export default function USSDRepaymentPage() {
  const router = useRouter();
  const totalDue = 15000;
  const ussdCode = "*999#";

  const handleComplete = () => {
    router.push("/repayment/confirmation");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Repay via USSD" />
      <div className="px-6 py-8">
        <div className="max-w-md mx-auto">
          <Card className="mb-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone size={32} className="text-primary" />
              </div>
              <p className="text-sm text-gray-600 mb-2">Amount Due</p>
              <p className="text-3xl font-bold text-gray-900">
                ETB {totalDue.toLocaleString()}
              </p>
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold mb-4">Follow These Steps</h2>
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 font-semibold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Dial USSD Code
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Open your phone dialer and dial:
                    </p>
                    <div className="bg-white p-3 rounded border-2 border-primary">
                      <code className="text-lg font-mono font-bold text-primary">
                        {ussdCode}
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 font-semibold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Select Payment Option
                    </h3>
                    <p className="text-sm text-gray-600">
                      Choose "Pay Bill" or "Send Money" from the menu.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 font-semibold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Enter Amount
                    </h3>
                    <p className="text-sm text-gray-600">
                      Enter ETB {totalDue.toLocaleString()} when prompted.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 font-semibold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Enter Recipient
                    </h3>
                    <p className="text-sm text-gray-600">
                      Enter Blue-Card account: 9999999999
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 font-semibold">
                    5
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Confirm Transaction
                    </h3>
                    <p className="text-sm text-gray-600">
                      Review details and confirm the payment.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Button fullWidth onClick={handleComplete}>
              I've Completed the Payment
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

