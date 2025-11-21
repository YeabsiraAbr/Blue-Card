"use client";

import Header from "@/components/ui/Header";
import Card from "@/components/ui/Card";
import BottomNav from "@/components/ui/BottomNav";
import { Bell, CheckCircle, AlertCircle, Info } from "lucide-react";

export default function NotificationsInboxPage() {
  const notifications = [
    {
      id: "1",
      type: "success",
      title: "Payment Successful",
      message: "Your payment of ETB 1,500 to Coffee Shop was completed successfully.",
      date: new Date(),
      read: false,
    },
    {
      id: "2",
      type: "info",
      title: "Trust Score Updated",
      message: "Your Trust Score has been updated to 675 (Band C).",
      date: new Date(Date.now() - 86400000),
      read: false,
    },
    {
      id: "3",
      type: "warning",
      title: "Repayment Due Soon",
      message: "Your repayment of ETB 15,000 is due in 3 days.",
      date: new Date(Date.now() - 2 * 86400000),
      read: true,
    },
    {
      id: "4",
      type: "success",
      title: "Verification Approved",
      message: "Your identity verification has been approved. Your virtual card is now active.",
      date: new Date(Date.now() - 3 * 86400000),
      read: true,
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle size={24} className="text-green-600" />;
      case "warning":
        return <AlertCircle size={24} className="text-yellow-600" />;
      default:
        return <Info size={24} className="text-primary" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header title="Notifications" />
      <div className="px-6 py-8">
        <div className="max-w-md mx-auto space-y-3">
          {notifications.map((notif) => (
            <Card
              key={notif.id}
              className={`cursor-pointer transition-colors ${
                !notif.read ? "bg-blue-50 border-l-4 border-l-primary" : ""
              }`}
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold text-gray-900">
                      {notif.title}
                    </h3>
                    {!notif.read && (
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{notif.message}</p>
                  <p className="text-xs text-gray-500">
                    {notif.date.toLocaleDateString()} at{" "}
                    {notif.date.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </Card>
          ))}
          {notifications.length === 0 && (
            <Card>
              <div className="text-center py-8">
                <Bell size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">No notifications</p>
              </div>
            </Card>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

