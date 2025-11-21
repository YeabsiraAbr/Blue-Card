"use client";

import Header from "@/components/ui/Header";
import VirtualCard from "@/components/VirtualCard";
import BottomNav from "@/components/ui/BottomNav";
import { useState, useEffect } from "react";

export default function CardDetailsPage() {
  const [fullName, setFullName] = useState("User");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFullName(localStorage.getItem("fullName") || "User");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Virtual Card" />
      <div className="px-6 py-8">
        <div className="max-w-md mx-auto">
          <VirtualCard
            cardNumber="4532123456789012"
            expiryDate="12/25"
            cvv="123"
            cardholderName={fullName}
          />
          <div className="mt-6 bg-white rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Card Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Card Number:</span>
                <span className="font-mono font-semibold">4532 1234 5678 9012</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Expiry Date:</span>
                <span className="font-semibold">12/25</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cardholder:</span>
                <span className="font-semibold">{fullName}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

