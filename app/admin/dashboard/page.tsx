"use client";

import AdminHeader from "@/components/admin/Header";
import Card from "@/components/ui/Card";
import {
  Users,
  FileSearch,
  CreditCard,
  TrendingUp,
  DollarSign,
  AlertCircle,
} from "lucide-react";

export default function AdminDashboardPage() {
  const stats = [
    {
      label: "Total Users",
      value: "12,458",
      change: "+12.5%",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      label: "Active Applications",
      value: "342",
      change: "+8.2%",
      icon: FileSearch,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      label: "Approved Loans",
      value: "2,891",
      change: "+15.3%",
      icon: CreditCard,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      label: "Total Loan Value",
      value: "ETB 45.2M",
      change: "+22.1%",
      icon: DollarSign,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
  ];

  const recentApplications = [
    {
      id: "APP001",
      name: "Alemayehu Bekele",
      phone: "+251 911 234 567",
      amount: 50000,
      score: 725,
      status: "pending",
      date: new Date(),
    },
    {
      id: "APP002",
      name: "Meron Tadesse",
      phone: "+251 922 345 678",
      amount: 25000,
      score: 680,
      status: "approved",
      date: new Date(Date.now() - 3600000),
    },
    {
      id: "APP003",
      name: "Yonas Haile",
      phone: "+251 933 456 789",
      amount: 100000,
      score: 590,
      status: "rejected",
      date: new Date(Date.now() - 7200000),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Overview of your institution's operations</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp size={14} className="text-green-600" />
                      <span className="text-sm text-green-600 font-medium">
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500">vs last month</span>
                    </div>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <Icon size={24} className={stat.color} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Applications */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Applications
              </h2>
              <a
                href="/admin/applications"
                className="text-sm text-primary font-medium hover:underline"
              >
                View All
              </a>
            </div>
            <div className="space-y-4">
              {recentApplications.map((app) => (
                <div
                  key={app.id}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">{app.name}</p>
                      <p className="text-sm text-gray-500">{app.phone}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        app.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : app.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <p className="text-xs text-gray-500">Requested Amount</p>
                      <p className="font-semibold text-gray-900">
                        ETB {app.amount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Credit Score</p>
                      <p className="font-semibold text-gray-900">{app.score}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <a
                href="/admin/credit-scores"
                className="block p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileSearch size={24} className="text-primary" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      Check Credit Score
                    </p>
                    <p className="text-sm text-gray-600">
                      Look up a user's credit score
                    </p>
                  </div>
                </div>
              </a>
              <a
                href="/admin/applications"
                className="block p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <CreditCard size={24} className="text-primary" />
                  <div>
                    <p className="font-semibold text-gray-900">
                      Review Applications
                    </p>
                    <p className="text-sm text-gray-600">
                      Process pending loan applications
                    </p>
                  </div>
                </div>
              </a>
              <a
                href="/admin/users"
                className="block p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Users size={24} className="text-primary" />
                  <div>
                    <p className="font-semibold text-gray-900">Manage Users</p>
                    <p className="text-sm text-gray-600">
                      View and manage user accounts
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

