"use client";

import { useRouter, useParams } from "next/navigation";
import Header from "@/components/ui/Header";
import Card from "@/components/ui/Card";
import { CheckCircle, XCircle, Clock } from "lucide-react";

export default function TransactionDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  // In real app, fetch transaction by ID
  const transaction = {
    id: id,
    type: "payment" as const,
    amount: 1500,
    merchant: "Coffee Shop",
    date: new Date(),
    status: "completed" as const,
    transactionId: "TXN001",
    description: "Payment for coffee and snacks",
    location: "Addis Ababa, Ethiopia",
  };

  const getStatusIcon = () => {
    switch (transaction.status) {
      case "completed":
        return <CheckCircle size={24} className="text-green-600" />;
      case "failed":
        return <XCircle size={24} className="text-red-600" />;
      default:
        return <Clock size={24} className="text-yellow-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Transaction Details" />
      <div className="px-6 py-8">
        <div className="max-w-md mx-auto space-y-4">
          <Card>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                {getStatusIcon()}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {transaction.status === "completed" ? "Payment Successful" : transaction.status === "failed" ? "Payment Failed" : "Pending"}
              </h2>
              <p
                className={`text-3xl font-bold ${
                  transaction.type === "payment" ? "text-red-600" : "text-green-600"
                }`}
              >
                {transaction.type === "payment" ? "-" : "+"}ETB{" "}
                {transaction.amount.toLocaleString()}
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-600">Merchant:</span>
                <span className="font-semibold text-gray-900">
                  {transaction.merchant}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-mono text-sm font-semibold text-gray-900">
                  {transaction.transactionId}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-semibold text-gray-900">
                  {transaction.date.toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-semibold text-gray-900">
                  {transaction.date.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              {transaction.description && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Description:</span>
                  <span className="font-semibold text-gray-900 text-right max-w-[60%]">
                    {transaction.description}
                  </span>
                </div>
              )}
              {transaction.location && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-semibold text-gray-900 text-right max-w-[60%]">
                    {transaction.location}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span
                  className={`font-semibold ${
                    transaction.status === "completed"
                      ? "text-green-600"
                      : transaction.status === "failed"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {transaction.status.charAt(0).toUpperCase() +
                    transaction.status.slice(1)}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

