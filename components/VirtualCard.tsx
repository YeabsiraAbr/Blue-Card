"use client";

import { useState } from "react";
import { Eye, EyeOff, Copy } from "lucide-react";

interface VirtualCardProps {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

export default function VirtualCard({
  cardNumber,
  expiryDate,
  cvv,
  cardholderName,
}: VirtualCardProps) {
  const [showCvv, setShowCvv] = useState(false);
  const [showCardNumber, setShowCardNumber] = useState(false);

  const formatCardNumber = (num: string) => {
    if (showCardNumber) {
      return num.replace(/(.{4})/g, "$1 ").trim();
    }
    return "**** **** **** " + num.slice(-4);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-white shadow-xl">
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="text-sm opacity-80 mb-1">Blue-Card</div>
            <div className="text-lg font-semibold">Virtual Card</div>
          </div>
          <button
            onClick={() => setShowCardNumber(!showCardNumber)}
            className="p-2 hover:bg-white/10 rounded-lg"
          >
            {showCardNumber ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="mb-6">
          <div className="text-2xl font-mono tracking-wider mb-2">
            {formatCardNumber(cardNumber)}
          </div>
          <div className="text-sm opacity-80">{cardholderName}</div>
        </div>

        <div className="flex justify-between items-end">
          <div>
            <div className="text-xs opacity-80 mb-1">Expires</div>
            <div className="text-sm font-semibold">{expiryDate}</div>
          </div>
          <div className="flex items-center gap-2">
            <div>
              <div className="text-xs opacity-80 mb-1">CVV</div>
              <div className="text-sm font-mono">
                {showCvv ? cvv : "***"}
              </div>
            </div>
            <button
              onClick={() => setShowCvv(!showCvv)}
              className="p-2 hover:bg-white/10 rounded-lg"
            >
              {showCvv ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => copyToClipboard(cardNumber)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <Copy size={16} />
          <span className="text-sm">Copy Card Info</span>
        </button>
      </div>
    </div>
  );
}

