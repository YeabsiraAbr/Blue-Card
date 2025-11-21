"use client";

import { useState } from "react";
import AdminHeader from "@/components/admin/Header";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { CheckCircle, XCircle, Clock, Eye } from "lucide-react";

export default function ApplicationsPage() {
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");

  const applications = [
    {
      id: "APP001",
      name: "Alemayehu Bekele",
      phone: "+251 911 234 567",
      amount: 50000,
      term: 12,
      score: 725,
      status: "pending",
      date: new Date(),
      loanType: "Salary-Linked Advance",
    },
    {
      id: "APP002",
      name: "Meron Tadesse",
      phone: "+251 922 345 678",
      amount: 25000,
      term: 6,
      score: 680,
      status: "approved",
      date: new Date(Date.now() - 3600000),
      loanType: "Nano/Micro Cash Loan",
    },
    {
      id: "APP003",
      name: "Yonas Haile",
      phone: "+251 933 456 789",
      amount: 100000,
      term: 24,
      score: 590,
      status: "rejected",
      date: new Date(Date.now() - 7200000),
      loanType: "BNPL Consumer Installment",
    },
    {
      id: "APP004",
      name: "Sara Mohammed",
      phone: "+251 944 567 890",
      amount: 75000,
      term: 18,
      score: 750,
      status: "pending",
      date: new Date(Date.now() - 10800000),
      loanType: "Asset Finance",
    },
  ];

  const filteredApplications =
    filter === "all"
      ? applications
      : applications.filter((app) => app.status === filter);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle size={20} className="text-green-600" />;
      case "rejected":
        return <XCircle size={20} className="text-red-600" />;
      default:
        return <Clock size={20} className="text-yellow-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Loan Applications</h1>
          <p className="text-gray-600">
            Review and process loan applications
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {(["all", "pending", "approved", "rejected"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.map((app) => (
            <Card key={app.id}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {app.name}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                        app.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : app.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {getStatusIcon(app.status)}
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Phone</p>
                      <p className="font-medium text-gray-900">{app.phone}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Amount</p>
                      <p className="font-medium text-gray-900">
                        ETB {app.amount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Credit Score</p>
                      <p className="font-medium text-gray-900">{app.score}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Loan Type</p>
                      <p className="font-medium text-gray-900">{app.loanType}</p>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-gray-500">
                    Applied: {app.date.toLocaleString()}
                  </div>
                </div>
                <div className="ml-4 flex flex-col gap-2">
                  <Button variant="outline" size="sm">
                    <Eye size={16} className="mr-2" />
                    View Details
                  </Button>
                  {app.status === "pending" && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-green-600 border-green-300 hover:bg-green-50"
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-300 hover:bg-red-50"
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredApplications.length === 0 && (
          <Card>
            <div className="text-center py-12">
              <p className="text-gray-500">No applications found</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

