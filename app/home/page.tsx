"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/Header";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import BottomNav from "@/components/ui/BottomNav";
import VirtualCard from "@/components/VirtualCard";
import TrustScore from "@/components/TrustScore";
import { CreditCard, ArrowRight, Bell } from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const [verificationStatus, setVerificationStatus] = useState<
    "unverified" | "pending" | "verified"
  >("unverified");
  const [trustScore, setTrustScore] = useState(650);
  const [creditLimit, setCreditLimit] = useState(50000);
  const [availableBalance, setAvailableBalance] = useState(35000);
  const [cardholderName, setCardholderName] = useState("User");

  useEffect(() => {
    // In real app, fetch from API
    if (typeof window !== "undefined") {
      const status = localStorage.getItem("verificationStatus") || "unverified";
      setVerificationStatus(status as any);
      setCardholderName(localStorage.getItem("fullName") || "User");
    }
  }, []);

  const recentTransactions = [
    {
      id: "1",
      type: "payment" as const,
      amount: 1500,
      merchant: "Coffee Shop",
      date: new Date(),
      status: "completed" as const,
      transactionId: "TXN001",
    },
    {
      id: "2",
      type: "repayment" as const,
      amount: 5000,
      merchant: "Repayment",
      date: new Date(Date.now() - 86400000),
      status: "completed" as const,
      transactionId: "TXN002",
    },
  ];

  if (verificationStatus === "unverified") {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <Header title="Home" showBack={false} />
        <div className="px-6 py-8">
          <div className="max-w-md mx-auto">
            <Card className="mb-6">
              <div className="text-center py-8">
                <div className="w-24 h-16 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <CreditCard size={32} className="text-gray-400" />
                </div>
                <h2 className="text-xl font-semibold mb-2">
                  Verify Your Identity
                </h2>
                <p className="text-gray-600 text-sm mb-6">
                  Complete identity verification to unlock your virtual card and
                  access credit.
                </p>
                <Button
                  fullWidth
                  onClick={() => router.push("/kyc/intro")}
                >
                  Start Verification
                </Button>
              </div>
            </Card>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  if (verificationStatus === "pending") {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <Header title="Home" showBack={false} />
        <div className="px-6 py-8">
          <div className="max-w-md mx-auto">
            <Card className="mb-6">
              <div className="text-center py-8">
                <div className="w-24 h-16 bg-yellow-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <CreditCard size={32} className="text-yellow-600" />
                </div>
                <h2 className="text-xl font-semibold mb-2">
                  Verification in Progress
                </h2>
                <p className="text-gray-600 text-sm mb-6">
                  Your identity verification is being reviewed. You'll be
                  notified once it's complete.
                </p>
              </div>
            </Card>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Home" showBack={false} />
      <div className="px-6 py-8">
        <div className="max-w-md mx-auto space-y-6">
          {/* Balance Card */}
          <Card>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Available Balance</p>
              <p className="text-3xl font-bold text-gray-900">
                ETB {availableBalance.toLocaleString()}
              </p>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Credit Limit:{" "}
                <span className="font-semibold text-gray-900">
                  ETB {creditLimit.toLocaleString()}
                </span>
              </p>
            </div>
          </Card>

          {/* Trust Score */}
          <Card>
            <h3 className="text-lg font-semibold mb-4 text-center">
              Your Trust Score
            </h3>
            <TrustScore score={trustScore} />
          </Card>

          {/* Virtual Card Preview */}
          <div
            onClick={() => router.push("/card")}
            className="cursor-pointer"
          >
            <VirtualCard
              cardNumber="4532123456789012"
              expiryDate="12/25"
              cvv="123"
              cardholderName={cardholderName}
            />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => router.push("/payment")}
              className="h-20 flex flex-col items-center justify-center"
            >
              <CreditCard size={24} className="mb-2" />
              Make Payment
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/repayment")}
              className="h-20 flex flex-col items-center justify-center"
            >
              <ArrowRight size={24} className="mb-2" />
              Repay Bill
            </Button>
          </div>

          {/* Floating Action Button */}
          <button
            onClick={() => router.push("/payment")}
            className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-dark transition-colors z-40"
            aria-label="Make Payment"
          >
            <CreditCard size={24} />
          </button>

          {/* Recent Transactions */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Recent Transactions</h3>
              <button
                onClick={() => router.push("/history")}
                className="text-primary text-sm font-medium flex items-center gap-1"
              >
                View All
                <ArrowRight size={16} />
              </button>
            </div>
            <div className="space-y-3">
              {recentTransactions.map((txn) => (
                <div
                  key={txn.id}
                  onClick={() => router.push(`/history/${txn.id}`)}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 cursor-pointer hover:bg-gray-50 -mx-2 px-2 rounded transition-colors"
                >
                  <div>
                    <p className="font-medium text-gray-900">{txn.merchant}</p>
                    <p className="text-xs text-gray-500">
                      {txn.date.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold ${
                        txn.type === "payment" ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {txn.type === "payment" ? "-" : "+"}ETB{" "}
                      {txn.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">{txn.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

