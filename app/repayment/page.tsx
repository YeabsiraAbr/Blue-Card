"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/Header";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import BottomNav from "@/components/ui/BottomNav";
import { CreditCard, Phone } from "lucide-react";

export default function RepaymentPage() {
  const router = useRouter();
  const totalDue = 15000;
  const dueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const repaymentMethods = [
    {
      name: "Telebirr",
      icon: Phone,
      description: "Pay via Telebirr mobile wallet",
    },
    {
      name: "USSD Code",
      icon: CreditCard,
      description: "Dial *999# and follow instructions",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Repay Bill" />
      <div className="px-6 py-8">
        <div className="max-w-md mx-auto space-y-6">
          <Card>
            <div className="text-center mb-6">
              <p className="text-sm text-gray-600 mb-2">Total Amount Due</p>
              <p className="text-4xl font-bold text-gray-900">
                ETB {totalDue.toLocaleString()}
              </p>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Due Date:</span>
                <span className="font-semibold">
                  {dueDate.toLocaleDateString()}
                </span>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold mb-4">
              Choose Repayment Method
            </h2>
            <div className="space-y-3">
              {repaymentMethods.map((method) => {
                const Icon = method.icon;
                const route =
                  method.name === "Telebirr"
                    ? "/repayment/telebirr"
                    : "/repayment/ussd";
                return (
                  <button
                    key={method.name}
                    onClick={() => router.push(route)}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-colors text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon size={24} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {method.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {method.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

