"use client";

import AdminHeader from "@/components/admin/Header";
import Card from "@/components/ui/Card";
import { TrendingUp, Users, DollarSign, FileText } from "lucide-react";

export default function AnalyticsPage() {
  const metrics = [
    {
      label: "Average Credit Score",
      value: "685",
      change: "+5.2%",
      icon: TrendingUp,
    },
    {
      label: "Approval Rate",
      value: "72.5%",
      change: "+3.1%",
      icon: FileText,
    },
    {
      label: "Total Active Users",
      value: "8,234",
      change: "+12.8%",
      icon: Users,
    },
    {
      label: "Average Loan Amount",
      value: "ETB 45,230",
      change: "+8.5%",
      icon: DollarSign,
    },
  ];

  const scoreDistribution = [
    { range: "750-850", count: 1234, percentage: 15 },
    { range: "700-749", count: 2345, percentage: 28 },
    { range: "650-699", count: 2100, percentage: 25 },
    { range: "600-649", count: 1456, percentage: 18 },
    { range: "550-599", count: 890, percentage: 11 },
    { range: "300-549", count: 209, percentage: 3 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Insights and performance metrics</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <Card key={metric.label}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {metric.value}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp size={14} className="text-green-600" />
                      <span className="text-sm text-green-600 font-medium">
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Icon size={24} className="text-primary" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Score Distribution */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Credit Score Distribution
          </h2>
          <div className="space-y-4">
            {scoreDistribution.map((item) => (
              <div key={item.range}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {item.range}
                  </span>
                  <span className="text-sm text-gray-600">
                    {item.count} users ({item.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-primary h-3 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

