"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/Header";
import Card from "@/components/ui/Card";
import BottomNav from "@/components/ui/BottomNav";
import { Filter } from "lucide-react";

export default function HistoryPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | "payment" | "repayment">("all");

  const transactions = [
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
    {
      id: "3",
      type: "payment" as const,
      amount: 2500,
      merchant: "Restaurant",
      date: new Date(Date.now() - 2 * 86400000),
      status: "completed" as const,
      transactionId: "TXN003",
    },
  ];

  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter((txn) => txn.type === filter);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Transaction History" />
      <div className="px-6 py-8">
        <div className="max-w-md mx-auto">
          {/* Filters */}
          <div className="flex gap-2 mb-6">
            {(["all", "payment", "repayment"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  filter === f
                    ? "bg-primary text-white"
                    : "bg-white text-gray-700 border border-gray-300"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Transactions List */}
          <div className="space-y-3">
            {filteredTransactions.map((txn) => (
              <Card
                key={txn.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => router.push(`/history/${txn.id}`)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      {txn.merchant}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {txn.date.toLocaleDateString()} • {txn.transactionId}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-bold text-lg ${
                        txn.type === "payment" ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {txn.type === "payment" ? "-" : "+"}ETB{" "}
                      {txn.amount.toLocaleString()}
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        txn.status === "completed"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {txn.status}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredTransactions.length === 0 && (
            <Card>
              <div className="text-center py-8">
                <p className="text-gray-500">No transactions found</p>
              </div>
            </Card>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

