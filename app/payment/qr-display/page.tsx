"use client";

import { QRCodeSVG } from "qrcode.react";
import Header from "@/components/ui/Header";
import Card from "@/components/ui/Card";

export default function QRDisplayPage() {
  // In real app, generate QR code with user's payment info
  const qrData = JSON.stringify({
    userId: "user123",
    timestamp: Date.now(),
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="My QR Code" />
      <div className="px-6 py-8">
        <div className="max-w-md mx-auto">
          <Card>
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">
                Show this QR code to merchant
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                The merchant will scan this code to process your payment
              </p>
              <div className="bg-white p-6 rounded-xl inline-block mb-4">
                <QRCodeSVG value={qrData} size={256} />
              </div>
              <p className="text-xs text-gray-500">
                Keep this screen open until payment is complete
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

