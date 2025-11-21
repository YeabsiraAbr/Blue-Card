"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/Header";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import BottomNav from "@/components/ui/BottomNav";
import { QrCode, Scan } from "lucide-react";

export default function PaymentPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Make Payment" />
      <div className="px-6 py-8">
        <div className="max-w-md mx-auto space-y-4">
          <Card>
            <h2 className="text-xl font-semibold mb-4">Choose Payment Method</h2>
            <div className="space-y-4">
              <button
                onClick={() => router.push("/payment/qr-display")}
                className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-colors text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <QrCode size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Show My QR Code
                    </h3>
                    <p className="text-sm text-gray-600">
                      Let merchant scan your QR code
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => router.push("/payment/scan")}
                className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-colors text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Scan size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Scan Merchant QR
                    </h3>
                    <p className="text-sm text-gray-600">
                      Scan QR code from merchant
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </Card>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

